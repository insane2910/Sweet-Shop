import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // NEW
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/auth/login/', { username, password });
      localStorage.setItem('access', r.data.access);
      localStorage.setItem('refresh', r.data.refresh);

      // save role in localStorage (needed for frontend checks)
      localStorage.setItem('role', role);

      if (role === 'admin') {
        nav('/admin');
      } else {
        nav('/');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#fff0f5',
      padding: '20px'
    }}>
      <form onSubmit={handle} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '30px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h3 style={{ textAlign: 'center', color: '#d2691e', marginBottom: '10px' }}>Login</h3>

        {/* Role selection */}
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none'
          }}
        >
          <option value="user">User Login</option>
          <option value="admin">Admin Login</option>
        </select>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <button type="submit" style={{
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#d2691e',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Login
        </button>

        <p style={{ textAlign: 'center', color: '#555', marginTop: '10px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#d2691e', textDecoration: 'none' }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}
