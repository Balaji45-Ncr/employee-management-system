from rest_framework import serializers
from employees.models import EmployeeForm,EmployeeField,Employee

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
            EmployeeForm.objects.create(form=form, **field_data)
        return form

    def update(self, instance, validated_data):
        fields_data = validated_data.pop('fields')
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Delete old fields
        instance.fields.all().delete()

        # Create new fields
        for field_data in fields_data:
            EmployeeField.objects.create(form=instance, **field_data)

        return instance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'