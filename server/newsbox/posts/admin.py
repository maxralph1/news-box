from django.contrib import admin
from .models import Category, SubCategory, Article, Comment, Like


admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Like)