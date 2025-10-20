const express = require('express');
const FoodProduct = require('../models/FoodProduct');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

router.use(auth, adminOnly);

// Crear producto comestible
router.post('/', async (req, res) => {
  try {
    const product = await FoodProduct.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', details: error.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await FoodProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const updated = await FoodProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', details: error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await FoodProduct.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;
