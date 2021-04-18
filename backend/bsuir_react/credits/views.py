from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from credits.serializers import *
from credits.models import *


class CreditTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CreditType.objects.all()
    serializer_class = CreditTypeSerializer


class CreditViewSet(viewsets.ModelViewSet):

    queryset = Credit.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return CreditListSerializer
        else:
            return CreditCreateSerializer


@api_view(['GET'])
def get_unique_credit_contract(request):
    last = Credit.objects.all().last()
    if last:
        result = int(last.id) + 1
    else:
        result = 1
    return Response(data={"unique": str(result).zfill(8)})
