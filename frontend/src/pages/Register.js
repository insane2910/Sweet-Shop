import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // NEW: default user
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register/', { username, password, role });
      alert('Registered');
      nav('/login');
    } catch (err) {
      alert('Register failed');
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
        <h3 style={{ textAlign: 'center', color: '#d2691e', marginBottom: '10px' }}>Register</h3>

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
          <option value="user">Register as User</option>
          <option value="admin">Register as Admin</option>
        </select>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none'
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
            fontSize: '16px',
            outline: 'none'
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
          Register
        </button>
      </form>
    </div>
  );
}
