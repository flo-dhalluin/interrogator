from django.dispatch import receiver
from django.db.models.signals import post_save
import channels

from .models import Question

@receiver(post_save,
          sender=Question,
          dispatch_uid="question_post_save_channels")
def post_save_handler(sender, instance, created, **kwargs) :
    if(created) :
        print("question created : ", instance.slug)
        channels.Channel('question-list').send({
            'type': 'new',
            'slug': instance.slug,
        })
