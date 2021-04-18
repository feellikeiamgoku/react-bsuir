
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from clients.views import CityViewSet, CitizenshipViewSet, FamilyStatusViewSet, DisabilityViewSet, ClientViewSet
from deposits.views import BankViewSet, CurrencyViewSet, DepositTypeViewSet, DepositViewSet, get_unique_deposit_contract
from credits.views import CreditTypeViewSet, CreditViewSet, get_unique_credit_contract


router = routers.SimpleRouter()
router.register(r'city', CityViewSet)
router.register(r'citizenship', CitizenshipViewSet)
router.register(r'family', FamilyStatusViewSet)
router.register(r'disability', DisabilityViewSet)
router.register(r'client', ClientViewSet, 'Client')
router.register(r'bank', BankViewSet)
router.register(r'currency', CurrencyViewSet)
router.register(r'deposit_type', DepositTypeViewSet)
router.register(r'deposit', DepositViewSet, "Deposit")
router.register(r'credit_type', CreditTypeViewSet)
router.register(r'credit', CreditViewSet, "Credit")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/unique_deposit_contract/', get_unique_deposit_contract, name='unique_deposit'),
    path('api/unique_credit_contract/', get_unique_credit_contract, name='unique_credit')
]