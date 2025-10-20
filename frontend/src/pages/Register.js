import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post(`${API_URL}/api/users/register`, form);
      setSuccess('Usuario creado con éxito. Puedes iniciar sesión.');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'No se pudo registrar el usuario');
      } else {
        setError('No se pudo conectar con el servidor');
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2>Crear cuenta</h2>
        {error && <p className="auth__alert">{error}</p>}
        {success && <p className="auth__alert" style={{ background: 'rgba(34,197,94,0.15)', color: '#15803d' }}>{success}</p>}
        <form className="auth__form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              name="name"
              placeholder="Ana Pérez"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              placeholder="ana@tienda.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tipo de cuenta
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
          {form.role === 'admin' && (
            <label>
              Código de administrador
              <input
                name="adminCode"
                placeholder="Código proporcionado"
                value={form.adminCode}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <button type="submit" className="auth__submit">
            Registrarme
          </button>
        </form>
        <p className="auth__footer">
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
