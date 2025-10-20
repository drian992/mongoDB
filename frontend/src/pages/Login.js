import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, form);
      if (res.data.user.role !== 'admin') {
        setError('Solo los administradores pueden acceder al panel.');
        return;
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem('userEmail', res.data.user.email);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Credenciales incorrectas');
      } else {
        setError('No se pudo conectar con el servidor');
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2>Acceso de administrador</h2>
        {error && <p className="auth__alert">{error}</p>}
        <form className="auth__form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              placeholder="ejemplo@tienda.com"
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
          <button type="submit" className="auth__submit">
            Ingresar
          </button>
        </form>
        <p className="auth__footer">
          ¿Aún no tienes una cuenta? <Link to="/register">Crea una aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
