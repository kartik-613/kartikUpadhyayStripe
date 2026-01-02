const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerEmail: { type: String, required: true },
    items: [
      {
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['success', 'pending', 'failed'],
      default: 'success',
    },
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
