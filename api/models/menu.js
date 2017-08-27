// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const MenuSchema = new mongoose.Schema({
  email: String,
  dishName: String,
  unitPrice: String,
  quantity: Boolean,
  category: [String],
  ingredients: [String],
  description: String,
  cookingBuffer: String,
  serving: String,
  images: [String],
});

// Export the Mongoose model
module.exports = mongoose.model('Menu', MenuSchema);
