# Generated by Django 5.0 on 2023-12-26 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image_description',
            field=models.CharField(blank=True, help_text='Description of image (optional)', max_length=150, null=True, verbose_name='Image Description'),
        ),
    ]
