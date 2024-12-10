from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=255)
    options = models.JSONField()  # Store options as a JSON list
    correct_option = models.CharField(max_length=255)  # Store the correct option
    mark = models.IntegerField()
    negative_mark = models.IntegerField()

    def __str__(self):
        return self.question_text


