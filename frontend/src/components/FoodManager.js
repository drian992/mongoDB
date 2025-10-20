import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Manager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const initialForm = {
  name: '',
  category: '',
  expirationDate: '',
  price: '',
  stock: '',
  isOrganic: false
};

function FoodManager({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/api/foods`, authConfig);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
      await axios.put(`${API_URL}/api/foods/${editingId}`, payload, authConfig);
    } else {
      await axios.post(`${API_URL}/api/foods`, payload, authConfig);
    }

    resetForm();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      expirationDate: product.expirationDate?.split('T')[0] || '',
      price: product.price,
      stock: product.stock,
      isOrganic: product.isOrganic
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/foods/${id}`, authConfig);
    fetchProducts();
  };

  return (
    <div className="manager">
      <h3 className="manager__title">Control de Productos Comestibles</h3>
      <form className="manager__form" onSubmit={handleSubmit}>
        <div className="manager__grid">
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Categoría
            <input name="category" value={form.category} onChange={handleChange} required />
          </label>
          <label>
            Fecha de vencimiento
            <input name="expirationDate" type="date" value={form.expirationDate} onChange={handleChange} required />
          </label>
          <label>
            Precio
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
          </label>
          <label className="manager__checkbox">
            <input name="isOrganic" type="checkbox" checked={form.isOrganic} onChange={handleChange} />
            Producto orgánico
          </label>
        </div>
        <div className="manager__actions">
          <button type="submit" className="btn btn--primary">
            {editingId ? 'Guardar cambios' : 'Agregar producto'}
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
          <p className="manager__empty">No hay productos comestibles cargados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Vencimiento</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Orgánico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.isOrganic ? 'Sí' : 'No'}</td>
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

export default FoodManager;
