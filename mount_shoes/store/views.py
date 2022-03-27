from urllib import response
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    CreateAPIView,
    GenericAPIView,
    UpdateAPIView,
)
from django.core.mail import send_mail
from rest_framework.permissions import AllowAny, IsAuthenticated

from store.models import DeliveryArea, Order, Product, Rating, User
from store.serializers import (
    OrderSerializer,
    ProductSerializer,
    RateSerializer,
    RegisterSerializer,
    UserSerializer,
    LoginUserSerializer,
    ChangePasswordSerializer,
    DeliveryAreaSerializer,
    Profile,
)
from store.utils import send_order_confirmation_email
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.decorators import action
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import permissions
import json

from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from paypalrestsdk import notifications


class ProductsListView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "code"


class OrderListCreateView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        send_order_confirmation_email(user=self.request.user, serializer=serializer)


class ProductRateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RateSerializer

    def get_queryset(self):
        return Rating.objects.filter(
            user=self.request.user, product_id=self.kwargs.get("code")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product_id=self.kwargs.get("code"))


class DeliveryAreaListView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = DeliveryArea.objects.order_by("pk").all()
    serializer_class = DeliveryAreaSerializer


# Register API
class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
            }
        )


# login API
class LoginAPI(GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                "status": "success",
                "code": status.HTTP_200_OK,
                "message": "Password updated successfully",
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserOrdersView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OrderSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Order.objects.prefetch_related("items").filter(user=self.request.user)


# Profile
class ProfileView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = Profile
    lookup_field = "id"

    def get_queryset(self):
        return User.objects.filter(id=self.kwargs.get("id"))


# Profile edit
class EditProfileView(UpdateAPIView):
    serializer_class = Profile
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return User.objects.get(id=self.kwargs.get("id"))

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data, instance=self.object)
        if serializer.is_valid():
            serializer.save()
            response = {
                "status": "success",
                "message": "Profile updated successfully",
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# new arrival
class NewArrivalView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Product.objects.all().order_by("-date")
    serializer_class = ProductSerializer


# best selling
class BestSellingView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Product.objects.filter(best_selling=True)
    serializer_class = ProductSerializer


@method_decorator(csrf_exempt, name="dispatch")
class ProcessWebhookView(View):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META["HTTP_PAYPAL_AUTH_ALGO"]
        cert_url = request.META["HTTP_PAYPAL_CERT_URL"]
        transmission_id = request.META["HTTP_PAYPAL_TRANSMISSION_ID"]
        transmission_sig = request.META["HTTP_PAYPAL_TRANSMISSION_SIG"]
        transmission_time = request.META["HTTP_PAYPAL_TRANSMISSION_TIME"]
        webhook_id = settings.PAYPAL_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)

        from pprint import pprint

        pprint(webhook_event)

        event_type = webhook_event["event_type"]

        print(event_type)
        CHECKOUT_ORDER_APPROVED = "CHECKOUT.ORDER.APPROVED"

        if event_type == CHECKOUT_ORDER_APPROVED:
            customer_email = webhook_event["resource"]["payer"]["email_address"]
            send_mail(
                subject="Your access",
                message=f"Thank you for purchasing.",
                recipient_list=[customer_email],
            )

        return HttpResponse()
