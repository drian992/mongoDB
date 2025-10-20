const mongoose = require('mongoose');

const foodProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    isOrganic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodProduct', foodProductSchema);
