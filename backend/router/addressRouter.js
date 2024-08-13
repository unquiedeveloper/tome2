import express from "express"
import { createAddress, deleteAddress, getAddressByUserId, updateAddress } from "../controllers/addressController.js";


const router = express.Router();

router.post('/addresses', createAddress);

// Get address by user ID
router.get('/addresses/:userId', getAddressByUserId);

// Update address
router.put('/addresses/:addressId', updateAddress);

// Delete address
router.delete('/addresses/:addressId',deleteAddress);




export default router