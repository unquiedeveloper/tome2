import {Cart} from "../models/cartSchema.js"



export const addToCart = async(req, res) => {
    const { userId, productId, quantity } = req.body;
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
  
 export  const getCartItems = async (req, res) => {
      const { userId } = req.params; // Retrieve userId from URL params
      try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.status(200).json(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  
   export  const removeFromCart = async (req, res) => {
      const { userId, productId } = req.params; // Retrieve userId and productId from URL params
      try {
        await Cart.findOneAndDelete({ userId, productId });
        res.status(200).json({ message: 'Item removed from cart' });
      } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  
   export  const updateCartItemQuantity = async (req, res) => {
      const { userId, productId, quantity } = req.body;
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
    