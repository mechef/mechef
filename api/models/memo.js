// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const MemoSchema = new mongoose.Schema({
  email: String,
  name: String,
  ingredients:  [mongoose.Schema.Types.Mixed],
  sum: Number,
});

// Export the Mongoose model
module.exports = mongoose.model('Memo', MemoSchema);
