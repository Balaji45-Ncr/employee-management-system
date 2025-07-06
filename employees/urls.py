from django.urls import path
from .views import (
    FormListCreateView,
    FormRetrieveUpdateDestroyView,
    EmployeeListCreateView,
    EmployeeRetrieveUpdateDestroyView,
    RegisterView,
    ChangePasswordView,
    ProfileView,
)

urlpatterns = [
    path('register/', RegisterView.as_view()),

    path('change-password/', ChangePasswordView.as_view()),
    path('profile/', ProfileView.as_view()),


    path('forms/', FormListCreateView.as_view()),
    path('forms/<int:pk>/', FormRetrieveUpdateDestroyView.as_view()),

    path('employees/', EmployeeListCreateView.as_view()),
    path('employees/<int:pk>/', EmployeeRetrieveUpdateDestroyView.as_view()),
]
