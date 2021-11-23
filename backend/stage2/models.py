from django.db import models

class Potion(models.Model):

    # name = models.CharField(max_length=100)
    scent = models.CharField(max_length=100)
    size = models.IntegerField()
    is_left = models.BooleanField()

class Pocket(models.Model):

    product = models.CharField(max_length=100)
    amount = models.IntegerField()