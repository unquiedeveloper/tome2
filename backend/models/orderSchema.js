import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  products: [productSchema],
  amount: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Add discount field
  address: addressSchema,
  paymentMethod: { type: String, enum: ['cod', 'card'], required: true },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
