import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]); //Guarda la lista de usuarios que se obtiene del backend
  const [editUser, setEditUser] = useState(null);//Guarda la información del usuario que se está editando, inicialmente null porque no hay ninguno seleccionado

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');//axios.get: hace una petición GET al backend para obtener todos los usuarios.
    setUsers(res.data); //res.data: contiene el arreglo de usuarios que devuelve MongoDB.
                        //setUsers(res.data): actualiza el estado users para que la UI se renderice con la lista de usuarios
  };

  const handleUpdate = async (id) => { //Es asíncrona (async) porque utiliza await para esperar respuestas del backend
                                       //Recibe como parámetro id, que es el _id del usuario que queremos actualizar.    
    await axios.put(`http://localhost:5000/api/users/${id}`, editUser);
    setEditUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers(); //Llama a la función fetchUsers() para volver a obtener todos los usuarios del backend
  }, []);

  return (
    <div>
      <h2>Dashboard - Usuarios</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                {editUser?.id === user._id ? (
                  <input
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUser?.id === user._id ? (
                  <input
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUser?.id === user._id ? (
                  <button onClick={() => handleUpdate(user._id)}>Guardar</button>
                ) : (
                  <button onClick={() => setEditUser({ id: user._id, name: user.name, email: user.email })}>Editar</button>
                )}
                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
