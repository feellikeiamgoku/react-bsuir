import json

from rest_framework import serializers
from clients.models import Passport, City, Client, Citizenship, FamilyStatus,  Disability


class PassportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passport
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = "__all__"


class CitizenshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Citizenship
        fields = "__all__"


class FamilyStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamilyStatus
        fields = "__all__"


class DisabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Disability
        fields = "__all__"


class ClientListSerializer(serializers.ModelSerializer):
    passport = PassportSerializer()
    city = CitySerializer()
    disability = DisabilitySerializer()
    status = FamilyStatusSerializer()
    citizenship = CitizenshipSerializer()

    class Meta:
        model = Client
        fields = "__all__"

    def create(self, validated_data):
        passport_data = validated_data.pop('passport')
        passport = Passport.objects.create(**passport_data)
        client = Client.objects.create(passport=passport, **validated_data)
        return client

    def update(self, instance, validated_data):
        pass


class ClientModifySerializer(serializers.ModelSerializer):
    passport = PassportSerializer()

    class Meta:
        model = Client
        fields = "__all__"

    def create(self, validated_data):
        passport_data = validated_data.pop('passport')
        passport = Passport.objects.create(**passport_data)
        client = Client.objects.create(passport=passport, **validated_data)
        return client