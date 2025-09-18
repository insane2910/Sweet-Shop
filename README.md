# 🍬 Sweet Shop Management System

A full-stack web application for managing sweets, built with **Django REST Framework (backend)** and **React (frontend)**.
It supports admin and user authentication, sweet listing with image upload, purchasing, and stock management.

---

## 🚀 Features

* **User Registration & Login** (JWT authentication)
* **Admin Registration & Login** (restricted access to add/modify sweets)
* **Upload & Display Sweet Images**
* **Purchase Sweets (with stock management)**
* **Category Filtering**
* **Responsive Frontend with React**

---

## 🛠️ Tech Stack

* **Backend:** Python, Django, Django REST Framework, SimpleJWT
* **Frontend:** React, Axios, React Router
* **Database:** SQLite (default) / PostgreSQL (optional)
* **Deployment Ready:** Configurable for Vercel/Netlify (frontend) & Heroku/AWS (backend)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/sweet-shop.git
cd sweet-shop
```

### 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

Django backend runs at:
👉 [http://localhost:8000](http://localhost:8000)

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

React frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

### 4️⃣ API Endpoints

* `POST /api/auth/register/` → Register user/admin
* `POST /api/auth/login/` → Login & get JWT
* `GET /api/sweets/` → List sweets
* `POST /api/sweets/` → Add sweet (admin only)
* `POST /api/sweets/{id}/purchase/` → Purchase sweet

---

## 🧪 Running Tests

```bash
cd backend
pytest
```

You should see a test report with all backend tests.

---

## 📸 Screenshots

(Add screenshots of your app UI here)

---

## 🤖 My AI Usage

I used AI tools to assist in development:

* **ChatGPT** → For generating boilerplate (serializers, viewsets, test structure), debugging errors, and explaining configurations.
* **GitHub Copilot** → For autocompleting code snippets inside VS Code (especially repetitive test cases and form components).

AI **did not write the project alone** — I manually structured the codebase, debugged issues, and added custom logic.
This collaboration with AI helped speed up my workflow and improved productivity.

---

## 📦 Deployment

(Optional) Deploy backend to **Heroku/AWS** and frontend to **Vercel/Netlify**.

---
