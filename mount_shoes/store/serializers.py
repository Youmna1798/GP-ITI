from cProfile import label
import email
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from store.models import (
    Order,
    OrderItem,
    Product,
    ProductColor,
    ProductColorImage,
    ProductColorSize,
    Rating,
)
from .models import DeliveryArea, User
from django.contrib.auth import authenticate


class ProductColorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColorImage
        fields = ("image",)


class ProductColorSizeSerializer(serializers.ModelSerializer):
    available_in_stock = serializers.BooleanField(read_only=True, source="is_available")

    class Meta:
        model = ProductColorSize
        fields = (
            "id",
            "size",
            "available_in_stock",
        )


class ProductColorSerializer(serializers.ModelSerializer):
    sizes = ProductColorSizeSerializer(many=True)
    images = ProductColorImageSerializer(many=True)

    class Meta:
        model = ProductColor
        fields = ("id", "color", "sizes", "images")


class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        exclude = ("id",)


class ProductSerializer(serializers.ModelSerializer):
    colors = ProductColorSerializer(many=True)
    ratings = ProductRatingSerializer(many=True)

    class Meta:
        model = Product
        fields = (
            "code",
            "name",
            "description",
            "price",
            "colors",
            "ratings",
            "best_selling",
        )
        read_only_fields = fields


class ProductOrderSerializer(serializers.ModelSerializer):
    code = serializers.PrimaryKeyRelatedField(
        source="color.product.code", read_only=True
    )
    name = serializers.CharField(source="color.product.name", read_only=True)
    price = serializers.IntegerField(source="color.product.price", read_only=True)
    color = serializers.CharField(source="color.color", read_only=True)
    size = serializers.IntegerField(source="size.number", read_only=True)

    class Meta:
        model = ProductColorSize
        fields = ("code", "name", "price", "color", "size")


class OrderItemSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(
        source="id",
        queryset=ProductColorSize.objects.all(),
        write_only=True,
    )
    item = ProductOrderSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ("item_id", "quantity", "item")

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if attrs["quantity"] > attrs["id"].quantity:
            raise ValidationError(
                f'The requested quantity: <{attrs["quantity"]}> is more than in stock, '
                f'The available quantity is: <{attrs["id"].quantity}>'
            )
        if attrs["id"].quantity == 0:
            raise ValidationError("The requested item is out of stock")
        return attrs


class OrderSerializer(serializers.ModelSerializer):
    total = serializers.IntegerField(min_value=0, read_only=True)
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ("id", "delivery_area", "items", "total", "created_at", "status")
        read_only_fields = ("created_at", "status")

    def create(self, validated_data):
        items = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        order_items = []
        product_color_size_updates = []
        for item in items:
            order_items.append(
                OrderItem(order=order, item=item["id"], quantity=item["quantity"])
            )
            item["id"].quantity = item["id"].quantity - item["quantity"]
            product_color_size_updates.append(item["id"])
        OrderItem.objects.bulk_create(order_items)
        ProductColorSize.objects.bulk_update(product_color_size_updates, ("quantity",))
        return order


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ("rate", "comment")


class DeliveryAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryArea
        fields = ("id", "area", "delivery_fees")


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "Name", "email")


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, min_length=8)
    password2 = serializers.CharField(
        style={"input_type": "password"}, min_length=8, label="Confirm Password"
    )

    class Meta:
        model = User
        fields = (
            "id",
            "Name",
            "email",
            "password",
            "password2",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = self.Meta.model(**validated_data)

        password_2 = validated_data["password2"]
        if password != password_2:
            raise serializers.ValidationError({"password": "password does not match"})
        user.set_password(password)
        user.save()
        return user


# login serializer
class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = ("id", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        user = authenticate(**data)
        if user:
            if user.is_active:
                return user
            raise serializers.ValidationError(
                "Your account is locked, Please contact an admin"
            )
        raise serializers.ValidationError("incorrect in email or password")


# change password serializer
class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    old_password = serializers.CharField(
        required=True, style={"input_type": "password"}, min_length=8
    )
    new_password = serializers.CharField(
        required=True, style={"input_type": "password"}, min_length=8
    )

    class Meta:
        model = User


# profile serializer
class Profile(serializers.ModelSerializer):
    address = serializers.CharField(required=False, max_length=100)
    phone_number = serializers.CharField(max_length=13)

    class Meta:
        model = User
        fields = ("id", "Name", "email", "address", "phone_number")
