import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClothingManager from '../components/ClothingManager';
import FoodManager from '../components/FoodManager';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('clothing');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const name = localStorage.getItem('userName');

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/');
    }
  }, [navigate, role, token]);

  if (!token || role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1>Panel del Administrador</h1>
          <p className="dashboard__welcome">Bienvenido, {name}</p>
        </div>
        <button className="btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <section className="dashboard__tabs">
        <button
          className={`dashboard__tab ${activeModule === 'clothing' ? 'dashboard__tab--active' : ''}`}
          onClick={() => setActiveModule('clothing')}
        >
          Indumentaria
        </button>
        <button
          className={`dashboard__tab ${activeModule === 'food' ? 'dashboard__tab--active' : ''}`}
          onClick={() => setActiveModule('food')}
        >
          Comestibles
        </button>
      </section>

      <main className="dashboard__content">
        {activeModule === 'clothing' ? (
          <ClothingManager token={token} />
        ) : (
          <FoodManager token={token} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
