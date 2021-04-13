from rest_framework import viewsets

from clients.models import City, Client, Citizenship, FamilyStatus,  Disability

from clients.serializers import (
    CitySerializer, ClientListSerializer,
    CitizenshipSerializer, DisabilitySerializer,
    FamilyStatusSerializer, ClientModifySerializer)


class CityViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = City.objects.all()
    serializer_class = CitySerializer


class CitizenshipViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Citizenship.objects.all()
    serializer_class = CitizenshipSerializer


class FamilyStatusViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = FamilyStatus.objects.all()
    serializer_class = FamilyStatusSerializer


class DisabilityViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Disability.objects.all()
    serializer_class = DisabilitySerializer


class ClientViewSet(viewsets.ModelViewSet):

    queryset = Client.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ClientListSerializer
        else:
            return ClientModifySerializer

