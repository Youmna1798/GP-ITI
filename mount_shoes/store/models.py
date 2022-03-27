from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import UserManager as BaseUserManager
from django.db import models
from django.utils import timezone
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.dispatch import receiver


class ProductManager(models.Manager):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .prefetch_related(
                "colors__images",
                "colors__sizes",
                "ratings",
            )
        )


class Product(models.Model):
    code = models.BigAutoField(
        primary_key=True,
        verbose_name="product code",
        help_text="primary key for product",
    )
    name = models.CharField(
        verbose_name="product name",
        max_length=128,
        null=False,
        blank=False,
        db_index=True,
    )
    description = models.TextField(
        verbose_name="product description", null=False, blank=False
    )
    price = models.PositiveIntegerField(
        null=False, blank=False, verbose_name="product price"
    )
    date = models.DateTimeField(default=timezone.now)
    best_selling = models.BooleanField(
        verbose_name="best selling?", blank=True, null=False, default=False
    )

    objects = ProductManager()

    def __str__(self) -> str:
        return f"Product: {self.code} - {self.name}"

    class Meta:

        constraints = [
            # Name can't be empty
            models.CheckConstraint(
                check=~models.Q(name=""),
                name="%(class)s_name_constraint",
            ),
        ]


class ProductColorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("product")


class ProductColor(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="colors",
        null=False,
        blank=False,
        db_index=True,
    )
    color = models.CharField(
        verbose_name="product color", max_length=64, null=True, blank=True
    )

    objects = ProductColorManager()

    def __str__(self) -> str:
        return f"Color: {self.color} of {self.product}"

    class Meta:

        constraints = [
            # color can't be empty
            models.CheckConstraint(
                check=~models.Q(color=""),
                name="%(class)s_color_constraint",
            ),
            models.UniqueConstraint(
                fields=["product", "color"],
                name="%(class)s_product_color_unique_constraint",
            ),
        ]


class ProductColorImage(models.Model):
    image = models.ImageField("product image color", null=False, blank=False)
    product_color = models.ForeignKey(
        ProductColor,
        on_delete=models.CASCADE,
        related_name="images",
        null=False,
        blank=False,
        db_index=True,
    )

    def __str__(self) -> str:
        return f"Image: {self.id} of {self.product_color}"


class Size(models.Model):
    number = models.PositiveSmallIntegerField(primary_key=True)

    def __str__(self) -> str:
        return f"Size: {self.number}"


class ProductColorSize(models.Model):
    color = models.ForeignKey(
        ProductColor,
        on_delete=models.CASCADE,
        related_name="sizes",
        null=False,
        blank=False,
        db_index=True,
    )
    size = models.ForeignKey(
        Size, on_delete=models.PROTECT, null=False, blank=False, db_index=True
    )
    quantity = models.PositiveIntegerField(
        null=False,
        blank=False,
        default=0,
        help_text="available stock for this color and size of the product",
    )

    def __str__(self) -> str:
        return f"Size: {self.size} of {self.color}"

    def is_available(self):
        return self.quantity > 0

    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=["color", "size"], name="%(class)s_color_size_unique_constraint"
            ),
        ]


class Rates(models.IntegerChoices):
    LOWEST = 1, "lowest"
    LOW = 2, "low"
    MEDIUM = 3, "medium"
    HIGH = 4, "high"
    HIGHEST = 5, "highest"


class Rating(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        related_name="ratings",
        on_delete=models.PROTECT,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="ratings",
        null=False,
        blank=False,
        db_index=True,
    )
    rate = models.PositiveSmallIntegerField(
        verbose_name="product rating", null=False, blank=False, choices=Rates.choices
    )
    comment = models.TextField(
        verbose_name="user comment", null=True, blank=True, max_length=500
    )

    def __str__(self) -> str:
        return f"User: {self.user.Name}'s rating of {self.product}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "user"],
                name="%(class)s_product_user_unique_constraint",
            ),
        ]


class DeliveryArea(models.Model):
    area = models.CharField(
        verbose_name="area name", max_length=256, blank=False, null=False
    )
    delivery_fees = models.PositiveIntegerField(
        verbose_name="delivery fees", null=False, blank=False
    )

    def __str__(self) -> str:
        return f"Area: {self.id} - {self.area}"

    class Meta:

        constraints = [
            # Name can't be empty
            models.CheckConstraint(
                check=~models.Q(area=""),
                name="%(class)s_area_constraint",
            ),
        ]


class OrderManager(models.Manager):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .prefetch_related("items__item__color__product")
            .select_related("user")
        )


class OrderStatusChoices(models.TextChoices):
    PENDING = ("pending", "Pending")
    PROCESSING = ("processing", "Processing")
    OUTFORDELIVERY = ("outfordelivery", "Out For Delivery")
    DELIVERED = ("delivered", "Delivered")
    CANCELLED = ("cancelled", "Cancelled")


class Order(models.Model):
    created_at = models.DateField(auto_now_add=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        related_name="orders",
        on_delete=models.PROTECT,
        db_index=True,
    )
    delivery_area = models.ForeignKey(
        DeliveryArea,
        on_delete=models.PROTECT,
        related_name="orders",
        null=False,
        blank=False,
    )
    status = models.CharField(
        verbose_name="order status",
        max_length=14,
        blank=True,
        null=False,
        default=OrderStatusChoices.PENDING,
        choices=OrderStatusChoices.choices,
    )

    objects = OrderManager()

    def __str__(self) -> str:
        return f"Order: {self.id} of User: {self.user}"

    @property
    def total(self):
        return (
            sum(
                (item.item.color.product.price * item.quantity)
                for item in self.items.all()
            )
            + self.delivery_area.delivery_fees
        )


class OrderItemManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("item__color__product")


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.PROTECT,
        related_name="items",
        null=False,
        blank=False,
        db_index=True,
    )
    item = models.ForeignKey(
        ProductColorSize,
        on_delete=models.PROTECT,
        related_name="+",
        null=False,
        blank=False,
    )
    quantity = models.PositiveIntegerField(
        null=False, blank=True, default=1, validators=[MinValueValidator(1)]
    )

    objects = OrderItemManager()

    def __str__(self) -> str:
        return f"Order Item: {self.id} of {self.order}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["order", "item"],
                name="%(class)s_order_item_unique_constraint",
            ),
        ]


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    Name = models.CharField("Name", max_length=150, blank=True, null=False)
    password = models.CharField(max_length=225, null=False)
    password2 = models.CharField("confirm password", max_length=225, null=False)
    email = models.EmailField("email address", unique=True)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=13)
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text=(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


# email reset password
@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):

    email_plaintext_message = "{} token={}".format(
        "Please, Copy this token to your form", reset_password_token.key
    )

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Mount Shoes"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email],
    )
