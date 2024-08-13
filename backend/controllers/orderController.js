import {Order} from "../models/orderSchema.js"


export const checkout = async (req, res) => {
    try {
        const { Email, products, amount,address } = req.body;
        // Create order in the database
        const newOrder = await Order.create({
            Email,
            products,
            amount,
            address,
            paymentMethod: 'Cash On Delivery'
        });

        res.json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};