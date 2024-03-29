# Generated by Django 3.2.12 on 2022-03-12 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0008_auto_20220309_2245"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="address",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                max_length=254, unique=True, verbose_name="email address"
            ),
        ),
    ]
