from deposits.models import *
from rest_framework import serializers
from django.core.exceptions import ValidationError


class BankSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bank
        fields = "__all__"


class DepositTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositType
        fields = "__all__"


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class DepositListSerializer(serializers.ModelSerializer):
    depositType = DepositTypeSerializer()
    currency = CurrencySerializer()

    class Meta:
        model = Deposit
        fields = "__all__"


class DepositCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deposit
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.depositType = validated_data.get('depositType', instance.depositType)
        instance.currency = validated_data.get('currency', instance.currency)
        instance.client = validated_data.get('client', instance.client)

        updated = super().update(instance, validated_data)
        return updated