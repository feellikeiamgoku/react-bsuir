from django.contrib import admin
from clients.models import City, Citizenship, Client, Passport, FamilyStatus, Disability
# Register your models here.

admin.site.register(City)
admin.site.register(Citizenship)
admin.site.register(Client)
admin.site.register(Passport)
admin.site.register(FamilyStatus)
admin.site.register(Disability)
