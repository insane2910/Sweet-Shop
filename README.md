# Sweet Shop Management System - Full Stack

This repo contains a Django REST backend and a React frontend.

## Backend (Django)
- Location: backend/
- Setup:
  - python -m pip install -r requirements.txt
  - create a .env file in backend/ with SECRET_KEY and optional DB settings (DATABASE_HOST)
  - python manage.py migrate
  - python manage.py createsuperuser
  - python manage.py runserver

API endpoints:
- POST /api/auth/register/  -> register
- POST /api/auth/login/     -> obtain JWT tokens
- GET/POST/PUT/DELETE /api/sweets/  -> sweets CRUD (admin for non-GET)
- POST /api/sweets/<id>/purchase/  -> purchase (authenticated)
- POST /api/sweets/<id>/restock/   -> restock (admin)

## Frontend (React)
- Location: frontend/
- Setup:
  - cd frontend
  - npm install
  - npm start

Frontend expects API at REACT_APP_API_URL (defaults to http://localhost:8000/api)

# Sweet-Shop
