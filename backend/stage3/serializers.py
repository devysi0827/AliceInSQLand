from rest_framework import serializers
from .models import Neighbor, Menu, PartyAttendee, Kitchen

class NeightborListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Neighbor
        fields = '__all__'
    
class MenuListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'
class PartyAttendeeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = PartyAttendee
        fields = '__all__'
class KitchenListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kitchen
        fields = '__all__'

class Stage3Serializer(serializers.Serializer):

    neighbor = NeightborListSerializer(many=True)
    menu = MenuListSerializer(many=True)
    partyattendee = PartyAttendeeListSerializer(many=True)
    kitchen = KitchenListSerializer(many=True)