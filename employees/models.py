from django.db import models

class EmployeeForm(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class EmployeeField(models.Model):
    FIELD_TYPES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('password', 'Password'),
    ]

    form = models.ForeignKey(EmployeeForm, related_name='fields', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.label} ({self.field_type})"

class Employee(models.Model):
    form = models.ForeignKey(EmployeeForm, on_delete=models.SET_NULL, null=True)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Employee Entry {self.id}"
