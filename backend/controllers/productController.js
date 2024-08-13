import {Product} from "../models/productSchema.js"

export const createProduct = async (req, res) => {
    try {
      const { name, price, pcs, category, description } = req.body;
  
      const product = new Product({
        name,
        price,
        pcs,
        category,
        description,
      });
  
      await product.save();
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get a single product by ID
  export const getSingleProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Delete a product by ID
  export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      await product.remove();
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };