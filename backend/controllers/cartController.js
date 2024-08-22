import { Cart } from "../models/cartSchema.js";

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Get userId from authenticated user
    try {
        const existingCartItem = await Cart.findOne({ userId, productId });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            res.status(200).json(existingCartItem);
        } else {
            const newCartItem = new Cart({ userId, productId, quantity });
            await newCartItem.save();
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCartItems = async (req, res) => {
    const userId = req.userId; // Get userId from authenticated user
    try {
        const cartItems = await Cart.find({ userId }).populate('productId'); // Ensure this field matches the schema
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeFromCart = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.userId;
    try {
        await Cart.findOneAndDelete({ _id: itemId, userId });
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Get userId from authenticated user
    try {
        const cartItem = await Cart.findOne({ userId, productId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Increase quantity of an item in the cart
export const increaseCartItemQuantity = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.userId; // Get userId from authenticated user

    try {
        const cartItem = await Cart.findOne({ _id: itemId, userId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        cartItem.quantity += 1;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error increasing cart item quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Decrease quantity of an item in the cart
export const decreaseCartItemQuantity = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.userId; // Get userId from authenticated user

    try {
        const cartItem = await Cart.findOne({ _id: itemId, userId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            await Cart.findOneAndDelete({ _id: itemId, userId });
            res.status(200).json({ message: 'Item removed from cart' });
        }
    } catch (error) {
        console.error('Error decreasing cart item quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};