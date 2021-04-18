from django.db import models
from clients.models import Client


class Bank(models.Model):
    money = models.IntegerField(default=1_000_000_000)

    def save(self, *args, **kwargs):
        if not self.pk and Bank.objects.exists():
            return
        return super(Bank, self).save(*args, **kwargs)

    def __str__(self):
        return "Банк решение"


class DepositType(models.Model):
    deposit_type = models.CharField(name="depositType", max_length=30, unique=True, null=False, blank=False)

    def __str__(self):
        return self.depositType


class Currency(models.Model):
    currency = models.CharField(max_length=3, unique=True, null=False, blank=False)

    def __str__(self):
        return self.currency


class Deposit(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=False, null=False)
    deposit_type = models.ForeignKey(DepositType,on_delete=models.CASCADE, blank=False, null=False, name="depositType")
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE, blank=False, null=False)
    contract_number = models.CharField(max_length=8, unique=True, name="contractNumber")
    start_date = models.DateField(name="startDate")
    end_date = models.DateField(name="endDate")
    period = models.IntegerField(name="period")
    cash = models.IntegerField(name="cash")
    percent = models.IntegerField(name="percent")

    def save(self, **kwargs):
        bank = Bank.objects.first()
        bank.money += self.cash
        bank.save()
        super().save(**kwargs)

    def delete(self, **kwargs):
        bank = Bank.objects.first()
        bank.money -= self.cash
        bank.save()
        super().delete(**kwargs)

    def __str__(self):
        return f"Депозит № {self.id}"
