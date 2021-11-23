from django.shortcuts import render, get_list_or_404
from django.http import JsonResponse
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response

from stage1.models import Room
from stage2.models import Potion, Pocket as P2
from stage3.models import Neighbor, Menu, PartyAttendee, Kitchen
from stage4.models import SpadeSoldier, HeartSoldier, DiamondSoldier, CloverSoldier, Pocket as P4, ScoreBoard, RoseInfo, Rose

from stage1.serializers import RoomListSerializer
from stage2.serializers import Stage2Serializer
from stage3.serializers import Stage3Serializer
from stage4.serializers import Stage4Serializer

from collections import namedtuple

Stage2 = namedtuple('Stage2', ('potion', 'pocket'))
Stage3 = namedtuple('Stage3', ('neighbor', 'menu', 'partyattendee', 'kitchen'))
Stage4 = namedtuple('Stage4', ('spadesoldier', 'heartsoldier', 'cloversoldier', 'diamondsoldier', 'pocket', 'scoreboard', 'roseinfo', 'rose'))

@api_view(['GET'])
def reset(request, stage):

    if stage == 1:
        room = get_list_or_404(Room)
        serializer = RoomListSerializer(room, many=True)

        return Response(serializer.data)
    
    elif stage == 2:
        
        data = Stage2(
            potion = Potion.objects.all(),
            pocket = P2.objects.all(),
        )

        serializer = Stage2Serializer(data)
        return Response(serializer.data)
    
    elif stage == 3:
        
        data = Stage3(
            neighbor = Neighbor.objects.all(),
            menu = Menu.objects.all(),
            partyattendee = PartyAttendee.objects.all(),
            kitchen = Kitchen.objects.all(),
        )

        serializer = Stage3Serializer(data)
        return Response(serializer.data)
    
    elif stage == 4:
        data = Stage4(
            spadesoldier = SpadeSoldier.objects.all(),
            heartsoldier = HeartSoldier.objects.all(),
            cloversoldier = CloverSoldier.objects.all(),
            diamondsoldier = DiamondSoldier.objects.all(),
            pocket = P4.objects.all(),
            scoreboard = ScoreBoard.objects.all(),
            roseinfo = RoseInfo.objects.all(),
            rose = Rose.objects.all(),
        )

        serializer = Stage4Serializer(data)
        return Response(serializer.data)