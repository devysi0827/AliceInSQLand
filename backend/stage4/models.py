from django.db import models

class SpadeSoldier(models.Model):

    shape = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    strength = models.IntegerField(null=True)
    letter = models.CharField(max_length=100, null=True)

class HeartSoldier(models.Model):

    shape = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    strength = models.IntegerField(null=True)
    letter = models.CharField(max_length=100, null=True)

class DiamondSoldier(models.Model):

    shape = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    strength = models.IntegerField(null=True)
    letter = models.CharField(max_length=100, null=True)

class CloverSoldier(models.Model):

    shape = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    strength = models.IntegerField(null=True)
    letter = models.CharField(max_length=100, null=True)

class Pocket(models.Model):

    product = models.CharField(max_length=100)
    amount = models.IntegerField()


class ScoreBoard(models.Model):
    name = models.CharField(max_length=100)
    hole = models.IntegerField()
    score = models.IntegerField()


class RoseInfo(models.Model):
    color = models.CharField(max_length=100)
    size = models.IntegerField()


class Rose(models.Model):
    paint = models.IntegerField()
    beauty = models.IntegerField()