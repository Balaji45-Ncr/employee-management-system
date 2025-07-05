from django.shortcuts import render
from .models import (EmployeeForm,EmployeeField,Employee)
from api.serializer import (
    EmployeeFieldSerializer,
    EmployeeFormSerializer,
    EmployeeSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class FormListCreateView(APIView):
    def get(self, request):
        forms = EmployeeForm.objects.all()
        serializer = EmployeeFormSerializer(forms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
