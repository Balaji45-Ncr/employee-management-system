from rest_framework import serializers
from employees.models import EmployeeForm,EmployeeField,Employee
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User




class EmployeeFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeField
        fields = '__all__'

class EmployeeFormSerializer(serializers.ModelSerializer):
    fields = EmployeeFieldSerializer(many=True)

    class Meta:
        model = EmployeeForm
        fields = ['id', 'name', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = EmployeeForm.objects.create(**validated_data)
        for field_data in fields_data:
            EmployeeField.objects.create(form=form, **field_data)
        return form

    def update(self, instance, validated_data):
        fields_data = validated_data.pop('fields')
        instance.name = validated_data.get('name', instance.name)
        instance.save()


        instance.fields.all().delete()

        for field_data in fields_data:
            EmployeeField.objects.create(form=instance, **field_data)

        return instance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']