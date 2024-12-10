from django.urls import path
from .views import StaffHomeView, AddQuestionView, QuestionListView

urlpatterns = [
    path('staffhome/', StaffHomeView.as_view(), name='staffhome'),
    path('addquestion/', AddQuestionView.as_view(), name='add-question'),
    path('editquestion/', QuestionListView.as_view(), name='edit-question'),  # Route without 'pk'
]
