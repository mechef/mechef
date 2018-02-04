// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const OrderSchema = new mongoose.Schema({
  buyerName: String,
  buyerEmail: String,
  menuList: [mongoose.Schema.Types.Mixed],
  sellerEmail: String,
  state: String,
  amount: Number,
  orderTime: Date,
  deliveryId: String,
  deliveryTime: String,
  deliveryAddress: String,
  deliveryLatitude: Number,
  deliveryLongitude: Number,
  messageFromBuyer: String
}, { versionKey: false, });

OrderSchema.methods.toOrder = function() {
  return {
    _id: this._id,
    buyerName: this.buyerName,
    buyerEmail: this.buyerEmail,
    menuList: this.menuList,
    amount: this.amount,
    orderTime: this.orderTime,
    deliveryAddress: this.deliveryAddress,
    deliveryTime: this.deliveryTime,
    deliveryLatitude: this.deliveryLatitude,
    deliveryLongitude: this.deliveryLongitude,
    messageFromBuyer: this.messageFromBuyer,
    state: this.state,
    dishName: this.dishName,
    image: this.image
  }
};

OrderSchema.statics.getOrderList = function getOrderList (orderList) {
  const processedOrderList = []
  orderList.forEach(function(order) {
    processedOrderList.push(order.toOrder());
  });

  return processedOrderList;
}

// Export the Mongoose model
module.exports = mongoose.model('Order', OrderSchema);
