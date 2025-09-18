import React, { useEffect, useState } from 'react';
import API from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPanel() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: null, name: '', category: '', price: '', quantity: '', description: '', image: null
  });
  const [error, setError] = useState(null);

  useEffect(() => { fetchAll() }, []);

  async function fetchAll() {
    const r = await API.get('/sweets/');
    setList(r.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.quantity) {
      setError("All fields are required");
      return;
    }

    const data = new FormData();
    data.append('name', form.name);
    data.append('category', form.category);
    data.append('price', parseFloat(form.price));
    data.append('quantity', parseInt(form.quantity));
    data.append('description', form.description);
    if (form.image) data.append('image', form.image);

    try {
      if (form.id) {
        // Edit existing sweet
        await API.put(`/sweets/${form.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setForm({ id: null, name: '', category: '', price: '', quantity: '', description: '', image: null });
      } else {
        // Add new sweet
        await API.post('/sweets/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setForm({ name: '', category: '', price: '', quantity: '', description: '', image: null, id: null });
      }
      setError(null);
      fetchAll();
    } catch (err) {
      setError("Only admin can add/edit sweets");
    }
  }

  function handleEdit(sweet) {
    setForm({
      id: sweet.id,
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description,
      image: null 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    try {
      await API.delete(`/sweets/${id}/`);
      fetchAll();
    } catch (err) {
      setError("Only admin can delete sweets");
    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🍬 Admin Panel</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col"><input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" /></div>
          <div className="col"><input className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" /></div>
          <div className="col"><input className="form-control" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" /></div>
          <div className="col"><input className="form-control" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" /></div>
        </div>
        <input className="form-control mt-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input className="form-control mt-2" type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        <button className="btn btn-primary mt-3">{form.id ? 'Update Sweet' : 'Add Sweet'}</button>
        {form.id && <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => setForm({ id: null, name: '', category: '', price: '', quantity: '', description: '', image: null })}>Cancel</button>}
      </form>

      <div className="row">
        {list.map(s => (
          <div key={s.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              { s.image && 
  (<img 
    src={s.image} 
    alt={s.name} 
    style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} 
  /> 
)}

              <div className="card-body">
                <h5 className="card-title">{s.name}</h5>
                <p className="card-text">Category: {s.category}</p>
                <p className="card-text">Price: ₹{s.price}</p>
                <p className="card-text">Stock: {s.quantity}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(s)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
