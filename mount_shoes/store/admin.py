from django.contrib import admin
from store.models import (
    DeliveryArea,
    Order,
    OrderItem,
    Product,
    ProductColor,
    ProductColorImage,
    ProductColorSize,
    Rating,
    Size,
)
from .models import User


class UserAdmin(admin.ModelAdmin):
    fieldsets = (
        [
            "User Information",
            {
                "fields": [
                    "Name",
                    "email",
                    "password",
                    "address",
                    "phone_number",
                    "is_active",
                ]
            },
        ],
    )

    list_display = ("email", "Name")
    search_fields = ["Name", "phone_number"]


class ProductColorInline(admin.StackedInline):
    model = ProductColor


class ProductColorImageInline(admin.StackedInline):
    model = ProductColorImage


class ProductColorSizeInline(admin.StackedInline):
    model = ProductColorSize


class ProductAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "description", "price")
    search_fields = ("code", "name", "description")
    inlines = (ProductColorInline,)


class ProductColorAdmin(admin.ModelAdmin):
    list_display = ("color", "product")
    search_fields = ("color", "product")
    inlines = (ProductColorImageInline, ProductColorSizeInline)


class ProductColorSizeAdmin(admin.ModelAdmin):
    list_display = ("color", "size", "quantity")
    search_fields = ("color", "size")


class SizeAdmin(admin.ModelAdmin):
    list_display = ("number",)
    search_fields = ("number",)


class RatingAdmin(admin.ModelAdmin):
    date_hierarchy = "created_at"
    list_display = ("created_at", "user", "product", "rate")
    search_fields = ("user", "product", "rate", "comment")


class DeliveryAreaAdmin(admin.ModelAdmin):
    list_display = ("area", "delivery_fees")
    search_fields = ("area",)


class OrderItemInline(admin.StackedInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = "created_at"
    list_display = ("created_at", "user", "delivery_area", "status", "total")
    search_fields = ("user", "delivery_area", "status")
    list_filter = ("status", "delivery_area")
    inlines = (OrderItemInline,)


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "item", "quantity")
    search_fields = ("item",)


class ProductColorImageAdmin(admin.ModelAdmin):
    list_display = ("product_color", "image")
    search_fields = ("product_color",)


admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductColor, ProductColorAdmin)
admin.site.register(ProductColorImage, ProductColorImageAdmin)
admin.site.register(ProductColorSize, ProductColorSizeAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(DeliveryArea, DeliveryAreaAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
