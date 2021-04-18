from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from deposits.models import *
from deposits.serializers import *


class BankViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class CurrencyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer


class DepositTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DepositType.objects.all()
    serializer_class = DepositTypeSerializer


class DepositViewSet(viewsets.ModelViewSet):

    queryset = Deposit.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return DepositListSerializer
        else:
            return DepositCreateSerializer


@api_view(['GET'])
def get_unique_deposit_contract(request):
    last = Deposit.objects.all().last()
    if last:
        result = int(last.id) + 1
    else:
        result = 1
    return Response(data={"unique": str(result).zfill(8)})

