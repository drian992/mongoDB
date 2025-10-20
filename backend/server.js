const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
