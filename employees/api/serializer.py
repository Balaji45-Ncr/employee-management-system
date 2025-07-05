from rest_framework import serializers
from employees.models import EmployeeForm,EmployeeField,Employee

class EmployeeFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeField
        fields = '__all__'
