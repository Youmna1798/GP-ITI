from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_order_confirmation_email(user, serializer):
    context = {
        "user": user,
        "order_id": serializer.data.get("id"),
        "items": [
            (
                item["id"],
                item["quantity"],
                item["id"].color.product.price * item["quantity"],
            )
            for item in serializer.validated_data["items"]
        ],
        "order_total": serializer.data.get("total"),
        "shipping_fees": serializer.validated_data.get("delivery_area").delivery_fees,
        "subtotal": serializer.data.get("total")
        - serializer.validated_data.get("delivery_area").delivery_fees,
    }
    content = render_to_string("store/emails/order_confirmation.html", context=context)
    msg = EmailMultiAlternatives(
        subject="Mount Shoes - Order Confirmation",
        body=f"Order {context['order_id']} Confirmation Email",
        to=[
            user.email,
        ],
    )
    msg.attach_alternative(content, "text/html")
    msg.send(fail_silently=False)
