# Generated by Django 3.2.12 on 2022-03-18 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0017_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='best_selling',
            field=models.BooleanField(blank=True, default=False, verbose_name='best selling?'),
        ),
    ]