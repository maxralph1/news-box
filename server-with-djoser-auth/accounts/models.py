from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CustomAccountManager(BaseUserManager): 
    def validateUsername(self, username):
        try:
            username.isalnum()
        except ValidationError:
            raise ValueError(_('You must provide an alphanumeric username'))

    def validateEmail(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_('You must provide a valid email address'))

    def validatePassword(self, password):
        if len(password) < 8:
            raise ValidationError(
                'This password is too short. It must contain at least 8 characters.',
            )


    def create_user(self, username, email, first_name, last_name, password, **other_fields):

        if not username:
            raise ValueError(_('You must provide a username.'))
        
        if not email:
            raise ValueError(_('You must provide an email address.'))

        if not first_name:
            raise ValueError(_('You must provide a first name.'))

        if not last_name:
            raise ValueError(_('You must provide a last name.'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        return user

    def create_superuser(self, username, email, first_name, last_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned is_superuser=True.')

        return self.create_user(username, email, first_name, last_name, password, **other_fields)

    

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_('Username'), max_length=150, unique=True)
    email = models.EmailField(_('Email Address'), unique=True)
    first_name = models.CharField(_('First Name'), max_length=150, blank=True)
    last_name = models.CharField(_('Last Name'), max_length=150, blank=True)
    about = models.TextField(_('About'), max_length=500, blank=True)
    is_staff = models.BooleanField(_('Staff'), default=False)
    is_superuser = models.BooleanField(_('Superuser'), default=False)
    is_active = models.BooleanField(_('Active'), default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password'] 

    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts' 

    def email_user(self, subject, message):
        send_mail(
            subject,
            message,
            'no-reply@news-box.com',
            [self.email],
            fail_silently=False
        )

    def __str__(self):
        return self.username