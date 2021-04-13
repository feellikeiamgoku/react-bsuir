from rest_framework import serializers
from clients.models import City, Client, Citizenship, FamilyStatus,  Disability


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
    city = CitySerializer()
    disability = DisabilitySerializer()
    status = FamilyStatusSerializer()
    citizenship = CitizenshipSerializer()

    class Meta:
        model = Client
        fields = "__all__"


class ClientModifySerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.city = validated_data.get('city', instance.city)
        instance.citizenship = validated_data.get('citizenship', instance.citizenship)
        instance.status = validated_data.get('status', instance.status)
        instance.disability = validated_data.get('disability', instance.disability)

        updated = super().update(instance, validated_data)
        return updated
