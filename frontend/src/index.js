import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import SweetsList from './pages/SweetsList'
import AdminPanel from './pages/AdminPanel'
import './index.css';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<SweetsList/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="admin" element={<AdminPanel/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
