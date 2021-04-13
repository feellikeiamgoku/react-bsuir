# Generated by Django 3.2 on 2021-04-13 09:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Citizenship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('citizenship', models.CharField(max_length=2, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Disability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('disability', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='FamilyStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=30)),
                ('lastName', models.CharField(max_length=30)),
                ('surname', models.CharField(max_length=30)),
                ('birthDate', models.DateField()),
                ('birthPlace', models.CharField(max_length=150)),
                ('address', models.CharField(max_length=150)),
                ('homePhone', models.CharField(blank=True, max_length=12, null=True)),
                ('mobilePhone', models.CharField(blank=True, max_length=12, null=True, unique=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('job', models.CharField(blank=True, max_length=30, null=True)),
                ('position', models.CharField(blank=True, max_length=30, null=True)),
                ('income', models.IntegerField(blank=True, null=True)),
                ('military', models.BooleanField()),
                ('retirement', models.BooleanField()),
                ('passportSeries', models.CharField(max_length=2)),
                ('passportNumber', models.CharField(max_length=7)),
                ('passportNumberId', models.CharField(max_length=14, unique=True)),
                ('given', models.CharField(max_length=100)),
                ('givenDate', models.DateField()),
                ('citizenship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.citizenship')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.city')),
                ('disability', models.ForeignKey(default='', on_delete=django.db.models.deletion.SET_DEFAULT, to='clients.disability')),
                ('status', models.ForeignKey(default='', on_delete=django.db.models.deletion.SET_DEFAULT, to='clients.familystatus')),
            ],
        ),
    ]
