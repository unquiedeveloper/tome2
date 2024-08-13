import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pcs: {
    type: Number,
   
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
   
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});
 
export const Product = mongoose.model('Product', productSchema);


