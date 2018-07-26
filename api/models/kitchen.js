// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const KitchenSchema = new mongoose.Schema(
  {
    kitchenDescription: String,
    kitchenName: String,
    coverPhoto: String,
    profileImage: String,
    email: String,
    deliveryList: [mongoose.Schema.Types.Mixed],
    menuList: [mongoose.Schema.Types.Mixed],
  },
  { versionKey: false },
);

// Export the Mongoose model
module.exports = mongoose.model('Kitchen', KitchenSchema);
