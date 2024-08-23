import { Order } from '../models/orderSchema.js';

export const checkout = async (req, res) => {
  try {
    const { email, products, amount, discount = 0, address, paymentMethod } = req.body; // Include discount

    // Validate required fields
    if (!email || !products || !amount || !address || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate address fields
    const requiredAddressFields = ['userId', 'email', 'name', 'phoneNo', 'addressLine1', 'city', 'state', 'country', 'postalCode'];
    for (const field of requiredAddressFields) {
      if (!address[field]) {
        return res.status(400).json({ error: `Missing address field: ${field}` });
      }
    }

    // Validate products
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products array is required and should not be empty" });
    }

    const calculatedAmount = products.reduce((total, product) => {
      if (!product.productId || !product.quantity || !product.price) {
        throw new Error("Each product must include productId, quantity, and price");
      }
      return total + (product.quantity * product.price);
    }, 0);

    const finalAmount = calculatedAmount - discount; // Subtract discount from calculated amount

    // Verify amount matches
    if (Math.abs(finalAmount - amount) > 0.01) { // Allow for small floating-point differences
      return res.status(400).json({ error: "Amount does not match the total price of products after discount" });
    }

    // Create order in the database
    const newOrder = await Order.create({
      email,
      products,
      amount: finalAmount, // Save the final amount after discount
      discount, // Save the discount in the order
      address,
      paymentMethod
    });

    // Send response
    return res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error('Error processing order:', error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
