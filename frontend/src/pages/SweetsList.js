import React, { useEffect, useState } from 'react';
import API from '../api';

function SweetItem({ s, onPurchase }) {
  return (
    <div style={{
      border: '1px solid #eee',
      padding: '16px',
      marginBottom: '12px',
      borderRadius: '12px',
      background: '#fff8f0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}
    >
      {/* Display sweet image if available */}
      { s.image && 
  <img 
    src={s.image} 
    alt={s.name} 
    style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} 
  /> 
}


      <h4 style={{ margin: '0 0 8px 0', color: '#d2691e' }}>{s.name} — Rs {s.price}</h4>
      <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', color: '#555' }}>
        {s.category} | Stock: {s.quantity}
      </p>
      <p style={{ margin: '0 0 12px 0', color: '#333' }}>{s.description}</p>
      <button
        disabled={s.quantity <= 0}
        onClick={() => onPurchase(s.id)}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: s.quantity > 0 ? '#ff6347' : '#ccc',
          color: '#fff',
          cursor: s.quantity > 0 ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={e => {
          if (s.quantity > 0) e.currentTarget.style.backgroundColor = '#e5533d';
        }}
        onMouseLeave={e => {
          if (s.quantity > 0) e.currentTarget.style.backgroundColor = '#ff6347';
        }}
      >
        {s.quantity > 0 ? 'Purchase' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default function SweetsList() {
  const [sweets, setSweets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const r = await API.get('/sweets/');
        setSweets(r.data);

        // Extract unique categories from sweets
        const uniqueCategories = [...new Set(r.data.map(s => s.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching sweets", err);
      }
    };
    load();
  }, []);

  async function handlePurchase(id) {
    try {
      await API.post(`/sweets/${id}/purchase/`, { quantity: 1 });
      alert('Purchased');

      // refresh list
      const r = await API.get('/sweets/');
      setSweets(r.data);
    } catch (e) {
      alert('Purchase failed. Login required or out of stock.');
    }
  }

  // Filter sweets based on selected category
  const filteredSweets = selectedCategory
    ? sweets.filter(s => s.category === selectedCategory)
    : sweets;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      padding: '20px',
      backgroundColor: '#fff5f0',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', color: '#d2691e', marginBottom: '20px' }}>Available Sweets</h3>

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '16px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Sweet List */}
      {filteredSweets.map(s => <SweetItem key={s.id} s={s} onPurchase={handlePurchase} />)}
    </div>
  );
}
