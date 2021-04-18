from rest_framework import serializers
from django.core.exceptions import ValidationError

from credits.models import *
from deposits.serializers import CurrencySerializer


class CreditTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditType
        fields = "__all__"


class CreditListSerializer(serializers.ModelSerializer):
    creditType = CreditTypeSerializer()
    currency = CurrencySerializer()

    class Meta:
        model = Credit
        fields = "__all__"


class CreditCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Credit
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.creditType = validated_data.get('creditType', instance.creditType)
        instance.currency = validated_data.get('currency', instance.currency)
        instance.client = validated_data.get('client', instance.client)

        updated = super().update(instance, **validated_data)
        return updated

    def validate_cash(self, value):
        bank = Bank.objects.first()
        if bank.money < value:
            raise ValidationError("У банка недостаточно средств.")
        return value