from django.db import models
from django.core.exceptions import ValidationError
from clients.models import Client
from deposits.models import Currency, Bank


class CreditType(models.Model):
    credit_type = models.CharField(name="creditType", max_length=30, unique=True, null=False, blank=False)

    def __str__(self):
        return self.creditType


class Credit(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=False, null=False)
    credit_type = models.ForeignKey(CreditType, on_delete=models.CASCADE, blank=False, null=False, name="creditType")
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE, blank=False, null=False)
    contract_number = models.CharField(max_length=8, unique=True, name="contractNumber")
    start_date = models.DateField(name="startDate", null=False, blank=False)
    end_date = models.DateField(name="endDate", null=False, blank=False)
    period = models.IntegerField(name="period", null=False, blank=False)
    cash = models.IntegerField(name="cash", null=False, blank=False)
    percent = models.IntegerField(name="percent", null=False, blank=False)

    def __str__(self):
        return f"Кредит № {self.id}"

    def save(self, **kwargs):
        bank = Bank.objects.first()
        if bank.money > self.cash:
            bank.money -= self.cash
            bank.save()
            super().save(**kwargs)
        else:
            raise ValidationError("У банка недостаточно средств.")

    def delete(self, **kwargs):
        bank = Bank.objects.first()
        bank.money += self.cash
        bank.save()
        super().delete(**kwargs)