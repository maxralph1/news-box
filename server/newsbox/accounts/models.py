from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    SUPERUSER = "SUP"
    CONTRIBUTOR = "CBT"
    READER = "RDR"
    ROLE_CHOICES = {
        SUPERUSER: "Superuser",
        CONTRIBUTOR: "Contributor", 
        READER: "Reader",
    }
    username = models.CharField(_('Username'), max_length=150, unique=True)
    email = models.EmailField(_('Email Address'), unique=True)
    first_name = models.CharField(_('First Name'), max_length=150, blank=True)
    last_name = models.CharField(_('Last Name'), max_length=150, blank=True)
    image = models.ImageField(_('Image'), upload_to="images/users", default="images/users/default.png")
    bio = models.TextField(_('Bio'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(
        _('Created at'), auto_now_add=True, editable=False)
    role = models.CharField(
        max_length=3,
        choices=ROLE_CHOICES,
        default=READER,
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def profile(self):
        Profile.objects.get(user=self)

    def setAsSuperuser(self, *args, **kwargs):
        self.is_superuser = True
        self.is_staff = True
        self.role = 'SUP'
        self.is_active = True
        super().save(*args, **kwargs)

    def setAsContributor(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = True
        self.role = 'CBT'
        self.is_active = True
        super().save(*args, **kwargs)

    def setAsReader(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = False
        self.role = 'RDR'
        self.is_active = True
        super().save(*args, **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # bio = models.TextField(_('Bio'), max_length=500, blank=True)
    # image = models.ImageField(_('Image'), upload_to="images/users", default="images/users/default.png")
    verified = models.BooleanField(_('Verified'), default=False)
    # created_at = models.DateTimeField(
    #     _('Created at'), auto_now_add=True, editable=False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)