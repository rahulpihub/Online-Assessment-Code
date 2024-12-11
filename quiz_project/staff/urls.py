from django.urls import path
from .views import StaffHomeView, AddQuestionView

urlpatterns = [
    path('staffhome/', StaffHomeView.as_view(), name='staffhome'),
    path('addquestion/', AddQuestionView.as_view(), name='add-question'),
]
