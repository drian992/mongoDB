const mongoose = require('mongoose');

const clothingProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClothingProduct', clothingProductSchema);
