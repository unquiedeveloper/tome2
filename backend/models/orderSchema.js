import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
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
        type: new mongoose.Schema({
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
                required: true
            },
            email: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            phoneNo: {
                type: String,
                required: true
            },
            addressLine1: {
                type: String,
                required: true
            },
            addressLine2: String,
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

export const Order = mongoose.model("Order", orderSchema);
