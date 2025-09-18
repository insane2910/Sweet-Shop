from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Sweet

class SweetTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user('admin', password='pass')
        self.admin.is_staff = True
        self.admin.save()
        self.user = User.objects.create_user('user', password='pass')
        Sweet.objects.create(name='Ladoo', category='Traditional', price=10.0, quantity=5)

    def test_register_and_login(self):
        url = reverse('register')
        resp = self.client.post(url, {'username': 'new', 'password': 'pwd'})
        self.assertEqual(resp.status_code, 201)

    def test_purchase_decreases_quantity(self):
        login = self.client.post('/api/auth/login/', {'username':'user','password':'pass'})
        token = login.data['access']
        sweet = Sweet.objects.first()
        resp = self.client.post(f'/api/sweets/{sweet.id}/purchase/', {'quantity': 2}, HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(resp.status_code, 200)
        sweet.refresh_from_db()
        self.assertEqual(sweet.quantity, 3)
