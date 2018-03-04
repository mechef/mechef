// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const MenuSchema = new mongoose.Schema({
  email: String,
  dishName: String,
  unitPrice: String,
  quantity: Number,
  category: [String],
  ingredients: [String],
  description: String,
  cookingBuffer: String,
  serving: String,
  images: [String],
  deliveryIdList: [String],
  deliveryList: [mongoose.Schema.Types.Mixed],
  publish: Boolean
}, { versionKey: false, });

MenuSchema.methods.toKitchenMenu = function() {
  return {
    dishName: this.dishName,
    unitPrice: this.unitPrice,
    quantity: this.quantity,
    description: this.description,
    images: this.images,
    _id: this._id
  }
};

// Export the Mongoose model
module.exports = mongoose.model('Menu', MenuSchema);
