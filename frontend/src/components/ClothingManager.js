import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Manager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const initialForm = {
  name: '',
  brand: '',
  size: '',
  color: '',
  price: '',
  stock: ''
};

function ClothingManager({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/api/clothing`, authConfig);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    if (editingId) {
      await axios.put(`${API_URL}/api/clothing/${editingId}`, payload, authConfig);
    } else {
      await axios.post(`${API_URL}/api/clothing`, payload, authConfig);
    }

    resetForm();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      brand: product.brand,
      size: product.size,
      color: product.color,
      price: product.price,
      stock: product.stock
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/clothing/${id}`, authConfig);
    fetchProducts();
  };

  return (
    <div className="manager">
      <h3 className="manager__title">Inventario de Indumentaria</h3>
      <form className="manager__form" onSubmit={handleSubmit}>
        <div className="manager__grid">
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Marca
            <input name="brand" value={form.brand} onChange={handleChange} required />
          </label>
          <label>
            Talle
            <input name="size" value={form.size} onChange={handleChange} required />
          </label>
          <label>
            Color
            <input name="color" value={form.color} onChange={handleChange} required />
          </label>
          <label>
            Precio
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
          </label>
        </div>
        <div className="manager__actions">
          <button type="submit" className="btn btn--primary">
            {editingId ? 'Guardar cambios' : 'Agregar prenda'}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="manager__list">
        {products.length === 0 ? (
          <p className="manager__empty">No hay prendas registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Talle</th>
                <th>Color</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.size}</td>
                  <td>{product.color}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="manager__tableActions">
                    <button className="btn" onClick={() => handleEdit(product)}>
                      Editar
                    </button>
                    <button className="btn btn--danger" onClick={() => handleDelete(product._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ClothingManager;
