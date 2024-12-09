from django.urls import path
from .views import StaffHomeView
from .views import AddQuestionView


urlpatterns = [
    path('staffhome/', StaffHomeView.as_view(), name='staffhome'),  # API endpoint for staff home data
    path('addquestion/', AddQuestionView.as_view(), name='add-question'),

]


