# Generated by Django 3.2 on 2021-04-18 05:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clients', '0004_auto_20210418_0558'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('money', models.IntegerField(default=1000000000)),
            ],
        ),
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=3, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='DepositType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('depositType', models.CharField(max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Deposit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ContractNumber', models.IntegerField(unique=True)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('period', models.IntegerField()),
                ('cash', models.IntegerField()),
                ('percent', models.IntegerField()),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.client')),
                ('currency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='deposits.currency')),
                ('deposit_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='deposits.deposittype')),
            ],
        ),
    ]
