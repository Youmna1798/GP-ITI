from unicodedata import name
from django.urls import path, include
from knox import views as knox_views
from store.views import (
    OrderListCreateView,
    ProductsListView,
    ProductRetrieveView,
    ProductRateView,
    RegisterAPI,
    LoginAPI,
    ChangePasswordView,
    DeliveryAreaListView,
    NewArrivalView,
    BestSellingView,
    ProfileView,
    EditProfileView,
    UserOrdersView,
    ProcessWebhookView,
)


urlpatterns = [
    path("api/register/", RegisterAPI.as_view(), name="register"),
    path("api/login/", LoginAPI.as_view(), name="login"),
    path("api/change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("api/products/", ProductsListView.as_view(), name="list-products"),
    path(
        "api/products/<int:code>/",
        ProductRetrieveView.as_view(),
        name="retrieve-product",
    ),
    path("api/orders/", OrderListCreateView.as_view(), name="list-create-order"),
    path(
        "api/products/<int:code>/rate/", ProductRateView.as_view(), name="rate-product"
    ),
    path("api/areas/", DeliveryAreaListView.as_view(), name="list-delivery-areas"),
    path(
        "api/password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    path(
        "api/password_reset/confirm/",
        include("django_rest_passwordreset.urls", namespace="password_confirm"),
    ),
    path("api/New/", NewArrivalView.as_view(), name="new arrival"),
    path("api/best/", BestSellingView.as_view(), name="best seller"),
    path("api/user/<int:id>/profile", ProfileView.as_view(), name="profile"),
    path("api/users/<int:id>/orders/", UserOrdersView.as_view(), name="user-orders"),
    path("api/user/<int:id>/Editprofile", EditProfileView.as_view(), name="Eprofile"),
    path("webhooks/paypal/", ProcessWebhookView.as_view()),
]
