import { Order } from "../models/orderSchema.js";

export const checkout = async (req, res) => {
    try {
        const { email, products, amount, address, paymentMethod } = req.body;

        // Validate required fields
        if (!email || !products || !amount || !address || !paymentMethod) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create order in the database
        const newOrder = await Order.create({
            email,
            products,
            amount,
            address,
            paymentMethod
        });

        res.json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
