# Generated by Django 3.2.12 on 2022-03-07 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20220307_0033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Name',
            field=models.CharField(blank=True, max_length=150, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='password2',
            field=models.CharField(max_length=225, verbose_name='confirm password'),
        ),
    ]
