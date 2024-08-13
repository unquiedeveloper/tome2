import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true // assuming this is what you intended
    },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        quantity: { 
            type: Number, 
            default: 1 
        } 
    }],
    amount: { 
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

export const Order = mongoose.model("Order", orderSchema);
