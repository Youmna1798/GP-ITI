# Generated by Django 3.2.12 on 2022-03-16 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0009_auto_20220312_1942"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="address",
            field=models.CharField(default="address", max_length=100),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=models.CharField(max_length=11),
        ),
    ]
