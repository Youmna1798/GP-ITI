# Generated by Django 3.2.12 on 2022-03-07 00:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_product_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='first_name',
            new_name='Name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='city',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
    ]
