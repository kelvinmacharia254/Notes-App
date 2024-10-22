from .models import Note

from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at"]
        extra_kwargs = {"author": {"read_only": True}}
