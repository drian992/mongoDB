import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });//useState crea un estado local llamado form, Inicialmente, los campos email y password están vacíos (''), setForm se usa para actualizar los valores del formulario cuando el usuario escribe en los inputs
  const navigate = useNavigate(); //Permite redirigir a otra página después de un evento exitoso, por ejemplo al dashboard tras iniciar sesión.

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //e es el evento que ocurre cuando el usuario escribe en un input.

                                                           //e.target.name → el nombre del input (email o password).
    
                                                          //e.target.value → el valor que el usuario escribió.
    
                                                              // actualiza solo el campo que cambió, dejando los demás intactos.
  };

  const handleSubmit = async (e) => { //Se ejecuta cuando el usuario hace clic en el botón de "Login" dentro de un formulario
    e.preventDefault(); //es el evento que se dispara al enviar el formulario, evita que la página se recargue, que es el comportamiento normal de un formulario HTML, Esto permite manejar el envío con JavaScript sin recargar la página
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login exitoso');
      navigate('/dashboard'); // redirige al Dashboard
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
