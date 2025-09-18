import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './index.css';

export default function App() {
  const linkStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: '#ff6347',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  }

  const linkHover = (e) => e.currentTarget.style.backgroundColor = '#e5533d'
  const linkLeave = (e) => e.currentTarget.style.backgroundColor = '#ff6347'

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <h2>Sweet Shop</h2>
        <Link 
          to="/" 
          style={linkStyle} 
          onMouseEnter={linkHover} 
          onMouseLeave={linkLeave}
        >Home</Link>
        <Link 
          to="/login" 
          style={linkStyle} 
          onMouseEnter={linkHover} 
          onMouseLeave={linkLeave}
        >Login</Link>
        <Link 
          to="/register" 
          style={linkStyle} 
          onMouseEnter={linkHover} 
          onMouseLeave={linkLeave}
        >Register</Link>
        <Link 
          to="/admin" 
          style={linkStyle} 
          onMouseEnter={linkHover} 
          onMouseLeave={linkLeave}
        >Admin</Link>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}
