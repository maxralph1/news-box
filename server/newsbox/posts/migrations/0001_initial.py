# Generated by Django 5.0 on 2023-12-09 23:23

import ckeditor.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Required and unique', max_length=30, unique=True, verbose_name='Category Title')),
                ('slug', models.SlugField(unique=True, verbose_name='Category safe URL')),
                ('description', models.CharField(help_text='Required and unique', max_length=255, verbose_name='Category Description')),
                ('is_active', models.BooleanField(default=True, help_text='Change category visibility', verbose_name='Category visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='Deleted at')),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_featured', models.BooleanField(default=False, help_text='Change make article featured on index(home) page', verbose_name='Make Article Featured')),
                ('is_gallery', models.BooleanField(default=False, help_text='Change make article part of gallery on index(home) page', verbose_name='Make Article Part of Gallery')),
                ('is_gallery_centered', models.BooleanField(default=False, help_text='Change make article center of gallery on index(home) page', verbose_name='Make Article Center in Gallery')),
                ('title', models.CharField(help_text='Required and unique', max_length=150, unique=True, verbose_name='Article Title')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='Article safe URL')),
                ('body', ckeditor.fields.RichTextField(unique=True, verbose_name='Write your Article')),
                ('image', models.ImageField(default='images/default.png', help_text='Upload Article Image', upload_to='images/articles/', verbose_name='Article Preview Image')),
                ('is_active', models.BooleanField(default=True, help_text='Change category visibility', verbose_name='Category visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.category', verbose_name='Choose a Category')),
            ],
            options={
                'verbose_name': 'Article',
                'verbose_name_plural': 'Articles',
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Comment Title', max_length=255, verbose_name='Comment Title')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='Comment safe URL')),
                ('body', models.TextField(help_text='Message must not exceed 255 characters', max_length=255, verbose_name='Comment Body')),
                ('is_active', models.BooleanField(default=True, help_text='Change comment visibility', verbose_name='Comment visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.article')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Required and unique', max_length=30, unique=True, verbose_name='Sub-Category Title')),
                ('slug', models.SlugField(unique=True, verbose_name='Sub-Category safe URL')),
                ('description', models.CharField(help_text='Required and unique', max_length=255, verbose_name='Sub-Category Description')),
                ('is_active', models.BooleanField(default=True, help_text='Change sub-category visibility', verbose_name='Sub-Category visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='Deleted at')),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.category', verbose_name='Choose a Category')),
            ],
            options={
                'verbose_name': 'Sub-Category',
                'verbose_name_plural': 'Sub-Categories',
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like_dislike', models.BooleanField(default=True, help_text='Like/Dislike', verbose_name='Like/Dislike')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='Like safe URL')),
                ('is_active', models.BooleanField(default=True, help_text='Change like visibility', verbose_name='Like visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('article', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.article')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.category')),
                ('comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.comment')),
                ('sub_category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.subcategory')),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='sub_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.subcategory', verbose_name='Choose a Sub-category'),
        ),
    ]