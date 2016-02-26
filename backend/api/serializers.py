from rest_framework import serializers
from .models import Question
from .models import Answer

class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Question
        fields = ('slug', 'time', 'text', 'author')


class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Answer
        fields = ('text', 'time', 'author', 'id')


class QuestionWithAnswersSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Question
        fields = ('slug', 'time', 'text', 'answers', 'author')
