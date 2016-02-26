from django.db import models
from django.utils.text import slugify

# Create your models here.

class Question(models.Model) :

    slug = models.SlugField(unique=True, blank=True, editable=False)

    author = models.ForeignKey('auth.User', related_name='+')
    text = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if( not self.slug) :
            self.slug = slugify(self.text)
        super(Question, self).save(*args, **kwargs)


class Answer(models.Model) :

    author = models.ForeignKey('auth.User', related_name='+')
    question = models.ForeignKey(Question, related_name='answers')
    text = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
