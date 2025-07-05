from django.urls import path,re_path
from .views import FormListCreateView, EmployeeListCreateView

urlpatterns = [
    path('forms/', FormListCreateView.as_view(), name='form-list-create'),
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
]