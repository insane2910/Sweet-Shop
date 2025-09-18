from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Sweet
from .serializers import SweetSerializer, UserSerializer
from .permissions import IsAdminOrReadOnly
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'id': user.id, 'username': user.username}, status=201)

class SweetViewSet(viewsets.ModelViewSet):
    queryset = Sweet.objects.all().order_by('-created_at')
    serializer_class = SweetSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = (MultiPartParser, FormParser) 
    @action(detail=False, methods=['get'], permission_classes=[])
    def search(self, request):
        q = request.query_params.get('q', '')
        cat = request.query_params.get('category')
        minp = request.query_params.get('min_price')
        maxp = request.query_params.get('max_price')
        qs = self.get_queryset()
        if q:
            qs = qs.filter(name__icontains=q)
        if cat:
            qs = qs.filter(category__iexact=cat)
        if minp:
            qs = qs.filter(price__gte=minp)
        if maxp:
            qs = qs.filter(price__lte=maxp)
        page = self.paginate_queryset(qs)
        serializer = self.get_serializer(page or qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def purchase(self, request, pk=None):
        sweet = self.get_object()
        try:
            qty = int(request.data.get('quantity', 1))
        except:
            return Response({'detail': 'Invalid quantity.'}, status=400)
        if qty <= 0:
            return Response({'detail': 'Quantity must be positive.'}, status=400)
        if sweet.quantity < qty:
            return Response({'detail': 'Not enough stock.'}, status=400)
        sweet.quantity -= qty
        sweet.save()
        return Response({'detail': 'Purchase successful', 'remaining': sweet.quantity})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def restock(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'detail': 'Only admin can restock.'}, status=403)
        sweet = self.get_object()
        try:
            qty = int(request.data.get('quantity', 0))
        except:
            return Response({'detail': 'Invalid quantity.'}, status=400)
        if qty <= 0:
            return Response({'detail': 'Quantity must be positive.'}, status=400)
        sweet.quantity += qty
        sweet.save()
        return Response({'detail': 'Restocked', 'new_quantity': sweet.quantity})
