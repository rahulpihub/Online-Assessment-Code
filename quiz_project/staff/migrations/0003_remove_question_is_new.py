# Generated by Django 5.1.4 on 2024-12-11 04:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0002_question_is_new'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='is_new',
        ),
    ]