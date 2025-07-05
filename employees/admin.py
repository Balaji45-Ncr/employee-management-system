from django.contrib import admin
from .models import EmployeeForm, EmployeeField, Employee

admin.site.register(EmployeeForm)
admin.site.register(EmployeeField)
admin.site.register(Employee)
