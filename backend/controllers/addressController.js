import { Address } from "../models/addressSchema.js";




export const createAddress = async (req, res) => {
    try {
      const { userId,email, name, phoneNo, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
      const address = await Address.create({ userId,email, name, phoneNo, addressLine1, addressLine2, city, state, postalCode, country });
      res.status(201).json(address);
    } catch (error) {
      console.error('Error creating address:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Get address by user ID
 export  const getAddressByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const addresses = await Address.find({ userId });
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Error fetching address:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update address
 export  const updateAddress = async (req, res) => {
    const { addressId } = req.params;
    try {
      const { userId,name,phoneNo, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
      const updatedAddress = await Address.findByIdAndUpdate(addressId, { userId, name,phoneNo, addressLine1, addressLine2, city, state, postalCode, country }, { new: true });
      res.status(200).json(updatedAddress);
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete address
export   const deleteAddress = async (req, res) => {
    const { addressId } = req.params;
    try {
      await Address.findByIdAndDelete(addressId);
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error('Error deleting address:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };