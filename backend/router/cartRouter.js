import express from "express";
import { addToCart, getCartItems, removeFromCart, updateCartItemQuantity 
    , increaseCartItemQuantity , decreaseCartItemQuantity
 } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/add-to-cart', addToCart);
router.get('/cart-items', getCartItems); // No need for userId in the URL
// router.delete('/remove-from-cart/:productId', removeFromCart); // Only include productId
router.put('/update-cart-item-quantity', updateCartItemQuantity);
router.patch('/increase-quantity/:itemId', increaseCartItemQuantity);
router.patch('/decrease-quantity/:itemId', decreaseCartItemQuantity);
router.delete('/remove-from-cart/:itemId', removeFromCart);

export default router;
