import hashlib
import uuid
from datetime import timedelta
from django.utils import timezone
from rest_framework import serializers, viewsets, status
from .models import WorkshopType, Workshop, Profile
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.db import transaction
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_superuser']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Profile
        fields = ['title', 'institute', 'department', 'phone_number', 'position', 'how_did_you_hear_about_us', 'location', 'state', 'username', 'first_name', 'last_name', 'email']

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

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
            
        profile = request.user.profile
        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        
        data = request.data
        if 'first_name' in data or 'last_name' in data:
            user = request.user
            if 'first_name' in data: user.first_name = data['first_name']
            if 'last_name' in data: user.last_name = data['last_name']
            user.save()
            
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            if hasattr(user, 'profile') and not user.profile.is_email_verified:
                return Response({'error': 'activation_pending'}, status=status.HTTP_403_FORBIDDEN)
                
            login(request, user)
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def register(self, request):
        data = request.data
        try:
            with transaction.atomic():
                if User.objects.filter(username=data.get('username')).exists():
                    return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
                if User.objects.filter(email=data.get('email')).exists():
                    return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
                
                user = User.objects.create_user(
                    username=data.get('username'),
                    email=data.get('email'),
                    password=data.get('password'),
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name')
                )
                
                salt = uuid.uuid4().hex
                activation_key = hashlib.sha256((user.username + salt).encode('utf-8')).hexdigest()
                key_expiry_time = timezone.now() + timedelta(days=1)
                
                Profile.objects.create(
                    user=user,
                    title=data.get('title', ''),
                    institute=data.get('institute'),
                    department=data.get('department'),
                    phone_number=data.get('phone_number'),
                    position=data.get('position', 'coordinator'),
                    how_did_you_hear_about_us=data.get('how_did_you_hear_about_us', ''),
                    location=data.get('location', ''),
                    state=data.get('state', 'IN-MH'),
                    is_email_verified=False,
                    activation_key=activation_key,
                    key_expiry_time=key_expiry_time
                )
                
                print(f"\n{'='*60}\nACTIVATION EMAIL FOR {user.email}\nLink: http://localhost:5173/activate/{activation_key}\n{'='*60}\n")
                
                return Response({'message': 'Registration successful. Activation required.', 'status': 'activation_pending'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post', 'get'])
    def activate(self, request):
        key = request.data.get('key') or request.query_params.get('key')
        if not key:
            return Response({'error': 'Key is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            profile = Profile.objects.get(activation_key=key)
            if profile.is_email_verified:
                return Response({'status': 2, 'message': 'Already verified'})
                
            if profile.key_expiry_time and timezone.now() > profile.key_expiry_time:
                return Response({'status': 1, 'message': 'Key expired. Please register again.'})
                
            profile.is_email_verified = True
            profile.save()
            return Response({'status': 0, 'message': 'Account successfully activated.'})
        except Profile.DoesNotExist:
            return Response({'error': 'Invalid activation key'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def check(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response({'user': serializer.data})
        return Response({'user': None})

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({'status': 'logged out'})
