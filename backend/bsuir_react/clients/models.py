from django.db import models


class Passport(models.Model):
    passport_series = models.CharField(max_length=2, name="passportSeries", blank=False, null=False)
    passport_number = models.CharField(max_length=7, name="passportNumber", blank=False, null=False)
    passport_number_id = models.CharField(max_length=14, name="passportNumberId", blank=False, null=False, unique=True)
    given = models.CharField(max_length=100, name="given", blank=False, null=False)
    given_date = models.DateField(name="givenDate", blank=False, null=False)

    def __str__(self):
        return f"{self.passportNumberId}"


class City(models.Model):
    city = models.CharField(max_length=20, name="city", unique=True, null=False, blank=False)

    def __str__(self):
        return f"{self.city}"


class Citizenship(models.Model):
    citizenship = models.CharField(max_length=2, name="citizenship", unique=True, null=False, blank=False)

    def __str__(self):
        return f"{self.citizenship}"


class FamilyStatus(models.Model):
    status = models.CharField(max_length=30, name="status", null=False, blank=False, unique=True)

    def __str__(self):
        return f"{self.status}"


class Disability(models.Model):
    disability = models.CharField(max_length=20, name="disability", null=False, blank=False, unique=True)

    def __str__(self):
        return f"{self.disability}"


class Client(models.Model):
    first_name = models.CharField(max_length=30, name="firstName", blank=False, null=False)
    last_name = models.CharField(max_length=30, name="lastName", blank=False, null=False)
    surname = models.CharField(max_length=30, blank=False, null=False)
    birth_date = models.DateField(name="birthDate", blank=False, null=False)
    birth_place = models.CharField(name="birthPlace", max_length=150, blank=False, null=False)
    address = models.CharField(max_length=150, name="address", blank=False, null=False)
    home_phone = models.CharField(max_length=12, name="homePhone", blank=True, null=True)
    mobile_phone = models.CharField(max_length=12, name="mobilePhone", blank=True, null=True, unique=True)
    email = models.CharField(max_length=50, name="email", blank=True, null=True, unique=True)
    job = models.CharField(max_length=30, blank=True, null=True)
    position = models.CharField(max_length=30, blank=True, null=True)
    income = models.IntegerField(blank=True, null=True)
    military = models.BooleanField(name="military", blank=False, null=False)
    retirement = models.BooleanField(name="retirement", blank=False, null=False)

    passport = models.OneToOneField(Passport, models.CASCADE, blank=False, null=False)
    city = models.ForeignKey(City, models.CASCADE, blank=False, null=False)
    citizenship = models.ForeignKey(Citizenship, models.CASCADE, blank=False, null=False)
    status = models.ForeignKey(FamilyStatus, models.SET_DEFAULT, default="")
    disability = models.ForeignKey(Disability, models.SET_DEFAULT, default="")

    def __str__(self):
        return f"Клиент № {self.id}"