from django.db import models

class Neighbor(models.Model):

    name = models.CharField(max_length=100)
    sort = models.CharField(max_length=100)
    nap = models.TimeField()

class Menu(models.Model):

    name = models.CharField(max_length=100)
    sort = models.CharField(max_length=100)
    table = models.IntegerField()
    ingredient = models.CharField(max_length=100)

class PartyAttendee(models.Model):

    table = models.IntegerField()

class Kitchen(models.Model):

    name = models.CharField(max_length=100)
    table = models.IntegerField()
    sort = models.CharField(max_length=100)
    quantity = models.IntegerField()
    ingredient = models.CharField(max_length=100)