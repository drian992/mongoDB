const mongoose = require('mongoose');//Triga la librería Mongoose, que permite trabajar con MongoDB usando esquemas y modelos en Node.js.
                                     // Con Mongoose se define la estructura de tus documentos, validaciones, relaciones, etc 
const userSchema = new mongoose.Schema({ //mongoose.Schema() crea un esquema, que define la estructura de los documentos en la colección.
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Agrega automáticamente dos campos a cada documento:
                            //createdAt:fecha de creación
                            //updatedAt:fecha de la última actualización

module.exports = mongoose.model('User', userSchema); //Crea un modelo llamado User basado en el esquema userSchema
