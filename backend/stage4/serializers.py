from django.db.models import fields
from rest_framework import serializers
from .models import SpadeSoldier, HeartSoldier, CloverSoldier, DiamondSoldier, Pocket, ScoreBoard, RoseInfo, Rose

class SpadeSoldierListSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpadeSoldier
        fields = '__all__'
    
class HeartSoldierListSerializer(serializers.ModelSerializer):

    class Meta:
        model = HeartSoldier
        fields = '__all__'
    
class CloverSoldierListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CloverSoldier
        fields = '__all__'
    
class DiamondSoldierListSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiamondSoldier
        fields = '__all__'
    
class PocketListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pocket
        fields = '__all__'

class ScoreBoardListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ScoreBoard
        fields = '__all__'

class RoseInfoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoseInfo
        fields = '__all__'

class RoseListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rose
        fields = '__all__'

class Stage4Serializer(serializers.Serializer):

    spadesoldier = SpadeSoldierListSerializer(many=True)
    heartsoldier = HeartSoldierListSerializer(many=True)
    cloversoldier = CloverSoldierListSerializer(many=True)
    diamondsoldier = DiamondSoldierListSerializer(many=True)
    pocket = PocketListSerializer(many=True)
    scoreboard = ScoreBoardListSerializer(many=True)
    roseinfo = RoseInfoListSerializer(many=True)
    rose = RoseListSerializer(many=True)