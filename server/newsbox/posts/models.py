from datetime import datetime
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from accounts.models import User


class Category(models.Model):
    title = models.CharField(
        verbose_name=_('Category Title'),
        help_text=_('Required and unique'),
        max_length=30,
        unique=True,
    )
    slug = models.SlugField(
        verbose_name=_('Category safe URL'),
        unique=True)
    description = models.CharField(
        verbose_name=_('Category Description'),
        help_text=_('Required and unique'),
        max_length=255,
    )
    added_by = models.ForeignKey(User, related_name='categories', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Category visibility'),
        help_text=_('Change category visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(_('Deleted at'), null=True, blank=True)

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ('created_at', )

    def get_absolute_url(self):
        return reverse('posts:view_category', args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, allow_unicode=False)
        # self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class SubCategory(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='sub_categories', 
        on_delete=models.CASCADE,
        verbose_name=_('Choose a Category'
                       ))
    title = models.CharField(
        verbose_name=_('Sub-Category Title'),
        help_text=_('Required and unique'),
        max_length=30,
        unique=True,
    )
    slug = models.SlugField(
        verbose_name=_('Sub-Category safe URL'),
        unique=True)
    description = models.CharField(
        verbose_name=_('Sub-Category Description'),
        help_text=_('Required and unique'),
        max_length=255,
    )
    added_by = models.ForeignKey(User, related_name='sub_categories', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Sub-Category visibility'),
        help_text=_('Change sub-category visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(_('Deleted at'), null=True, blank=True)

    class Meta:
        verbose_name = _('Sub-Category')
        verbose_name_plural = _('Sub-Categories')
        ordering = ('created_at', )

    def get_absolute_url(self):
        return reverse('posts:view_sub-category', args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(
                str(self.title) + str(self.category.title) +
                str(datetime.now()),
                allow_unicode=False
            )
        # self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Article(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='articles', 
        on_delete=models.CASCADE,
        verbose_name=_('Choose a Category'
                       ))
    sub_category = models.ForeignKey(
        SubCategory, 
        related_name='articles', 
        on_delete=models.CASCADE,
        verbose_name=_('Choose a Sub-category'
                       ))
    is_featured = models.BooleanField(
        verbose_name=_('Make Article Featured'),
        help_text=_('Change make article featured on index(home) page'),
        default=False,
    )
    is_gallery = models.BooleanField(
        verbose_name=_('Make Article Part of Gallery'),
        help_text=_('Change make article part of gallery on index(home) page'),
        default=False,
    )
    is_gallery_centered = models.BooleanField(
        verbose_name=_('Make Article Center in Gallery'),
        help_text=_('Change make article center of gallery on index(home) page'),
        default=False,
    )
    title = models.CharField(
        verbose_name=_('Article Title'),
        help_text=_('Required and unique'),
        max_length=150,
        unique=True,
    )
    slug = models.SlugField(
        verbose_name=_(
            'Article safe URL'),
        max_length=255,
        unique=True)
    body = RichTextField(
        verbose_name=_('Write your Article'),
        unique=True,
    )
    image = models.ImageField(
        verbose_name=_('Article Preview Image'),
        help_text=_('Upload Article Image'),
        upload_to='images/articles/',
        default='images/default.png',
    )
    image_description = models.CharField(
        verbose_name=_('Image Description'),
        help_text=_('Description of image (optional)'),
        max_length=150, 
        null=True, 
        blank=True
    )
    added_by = models.ForeignKey(User, related_name='articles', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Category visibility'),
        help_text=_('Change category visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')
        ordering = ('created_at', )

    def get_absolute_url(self):
        return reverse('posts:view_article', args=[self.slug])
    
    def save(self, *args, **kwargs):
        self.slug = slugify(
                str(self.title) + str(self.category.title) +
                str(datetime.now()),
                allow_unicode=False
            )
        # self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    

class Comment(models.Model):
    article = models.ForeignKey(Article, related_name='comments', on_delete=models.CASCADE)
    # slug = models.SlugField(
    #     verbose_name=_(
    #         'Comment safe URL'),
    #     max_length=255,
    #     unique=True)
    body = models.TextField(
        verbose_name=_('Comment Body'),
        help_text=_('Message must not exceed 255 characters'),
        max_length=255
    )
    added_by = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Comment visibility'),
        help_text=_('Change comment visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)
    

class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, related_name='comments', on_delete=models.CASCADE)
    # slug = models.SlugField(
    #     verbose_name=_(
    #         'Comment Reply safe URL'),
    #     max_length=255,
    #     unique=True)
    body = models.TextField(
        verbose_name=_('Comment Reply Body'),
        help_text=_('Message must not exceed 255 characters'),
        max_length=255
    )
    added_by = models.ForeignKey(User, related_name='comment_replies', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Comment reply visibility'),
        help_text=_('Change comment reply visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)


class Like(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='likes', 
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    sub_category = models.ForeignKey(
        SubCategory, 
        related_name='likes', 
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    article = models.ForeignKey(
        Article, 
        related_name='likes', 
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    comment = models.ForeignKey(
        Comment, 
        related_name='likes', 
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    comment_reply = models.ForeignKey(
        CommentReply, 
        related_name='likes', 
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    like_dislike = models.BooleanField(
        verbose_name=_('Like/Dislike'),
        help_text=_('Like/Dislike'),
        default=True,
    )
    # slug = models.SlugField(
    #     verbose_name=_(
    #         'Like safe URL'),
    #     max_length=255,
    #     unique=True
    # )
    added_by = models.ForeignKey(User, related_name='likes', on_delete=models.CASCADE)
    is_active = models.BooleanField(
        verbose_name=_('Like visibility'),
        help_text=_('Change like visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.is_active = True
        super().save(*args, **kwargs)
