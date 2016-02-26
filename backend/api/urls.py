from django.conf.urls import url, include
from .views import QuestionListView
from .views import QuestionDetailView
from .views import AnswerCreateView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^questions$', QuestionListView.as_view(), name='question-list'),
    url(r'^question/(?P<slug>[-_\w]+)$', QuestionDetailView.as_view(), name='question-detail'),
    url(r'^question/(?P<slug>[-_\w]+)/answer$', AnswerCreateView.as_view(), name='question-answer'),
]
