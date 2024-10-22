from django.shortcuts import render

# Create your views here.
from .models import Note
from .serializers import NoteSerializer

from rest_framework import generics


class NoteListCreate(generics.ListCreateAPIView):
    """
    List all notes via GET, or create a new note POST.
    """

    serializer_class = NoteSerializer

    def get_queryset(self):
        # only return notes that belong to the current user
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        #
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    """
    Delete a note.
    """
    serializer_class = NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
