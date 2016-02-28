from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import Question
from .serializers import QuestionSerializer
from .serializers import QuestionWithAnswersSerializer
from .serializers import AnswerSerializer

# class AuthView(APIView) :
#
#     def post(self, rq, format=None):
#         print(rq.data)
#         tok = Token.objects.get_or_create(user=rq.data['user'])
#         return Response({'token', token[0].key})


class QuestionListView(generics.ListCreateAPIView):

    model = Question
    queryset = Question.objects.all().order_by('-time')
    serializer_class = QuestionSerializer

    # only auth users can post
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer) :
        serializer.save(author = self.request.user)


class QuestionDetailView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionWithAnswersSerializer
    # by default, the "RetrieveView" uses pk field to get one element
    # let's use slug instead
    lookup_field = 'slug'


class AnswerCreateView(generics.CreateAPIView):
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        # print(self.kwargs)
        q = Question.objects.get(slug = self.kwargs['slug'])
        serializer.save(question=q, author=self.request.user)
