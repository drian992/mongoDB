import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() { 
  const [form, setForm] = useState({ name: '',
     email: '', password: '' });//useState crea un estado local llamado form.
                                //Inicialmente, los campos name, email y password están vacíos.
                                //setForm se usa para actualizar los valores del formulario cuando el usuario escribe
  const navigate = useNavigate();//Permite redirigir a otra página después de un evento, por ejemplo al login tras registrarse

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //e.target.name el nombre del input (name, email o password).

                                                           //e.target.value el valor que el usuario escribió.
    
                                                           // actualiza solo el campo que cambió, manteniendo los demás iguales.
  };       

  const handleSubmit = async (e) => {
    e.preventDefault(); //e.preventDefault() Evita que el formulario haga un refresh de la página al enviar
                      
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form); //Envía los datos del formulario (name, email, password) al backend.
                                                                                      //Es una petición POST a la ruta /api/users/register
      alert(res.data.message); //Muestra un mensaje que viene del backend, por ejemplo: "Usuario registrado".
      navigate('/'); // redirige al login
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
