from django.contrib import admin
from deposits.models import *

# Register your models here.

admin.site.register(Bank)
admin.site.register(DepositType)
admin.site.register(Currency)
admin.site.register(Deposit)