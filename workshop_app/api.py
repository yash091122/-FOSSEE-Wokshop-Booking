from rest_framework import serializers, viewsets, status
from .models import WorkshopType, Workshop, Profile
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.db import transaction
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class WorkshopTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopType
        fields = '__all__'

class WorkshopSerializer(serializers.ModelSerializer):
    workshop_type_name = serializers.CharField(source='workshop_type.name', read_only=True)
    workshop_type_duration = serializers.IntegerField(source='workshop_type.duration', read_only=True)
    coordinator_name = serializers.CharField(source='coordinator.get_full_name', read_only=True)
    
    class Meta:
        model = Workshop
        fields = ['id', 'uid', 'coordinator', 'coordinator_name', 'instructor', 'workshop_type', 
                  'workshop_type_name', 'workshop_type_duration', 'date', 'status', 'tnc_accepted']

class WorkshopTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WorkshopType.objects.all()
    serializer_class = WorkshopTypeSerializer

class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all().order_by('-date')
    serializer_class = WorkshopSerializer
    
class AuthViewSet(viewsets.ViewSet):
    @method_decorator(ensure_csrf_cookie)
    @action(detail=False, methods=['get'])
    def csrf(self, request):
        return Response({'detail': 'CSRF cookie set'})

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        return Response({'error': 'Invalid credentials'}, status=400)

    @action(detail=False, methods=['post'])
    def register(self, request):
        data = request.data
        try:
            with transaction.atomic():
                # Check if username exists
                if User.objects.filter(username=data.get('username')).exists():
                    return Response({'error': 'Username already exists'}, status=400)
                
                # Create User
                user = User.objects.create_user(
                    username=data.get('username'),
                    email=data.get('email'),
                    password=data.get('password'),
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name')
                )
                
                # Create Profile
                Profile.objects.create(
                    user=user,
                    institute=data.get('institute'),
                    department=data.get('department'),
                    phone_number=data.get('phone_number'),
                    position=data.get('position', 'coordinator'),
                    location=data.get('location', ''),
                    state=data.get('state', 'IN-MH'),
                    is_email_verified=True # Auto-verify for simplicity in this modernized flow
                )
                
                # Auto Login after registration
                login(request, user)
                serializer = UserSerializer(user)
                return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

    @action(detail=False, methods=['get'])
    def check(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response({'user': serializer.data})
        return Response({'user': None})

    @action(detail=False, methods=['post'])
    def logout(self, request):
        from django.contrib.auth import logout
        logout(request)
        return Response({'status': 'logged out'})
