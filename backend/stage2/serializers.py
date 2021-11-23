from rest_framework import serializers
from .models import Potion, Pocket

class PotionListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Potion
        fields = '__all__'

class PocketListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pocket
        fields = '__all__'

class Stage2Serializer(serializers.Serializer):

    potion = PotionListSerializer(many=True)
    pocket = PocketListSerializer(many=True)