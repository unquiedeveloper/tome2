import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    avatar: { 
      type: String, 
      default: null 
    },
  name: { 
    type: String, 
    required: true, 
    minlength: 1,
     maxlength: 50 
    },
 
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});


export const User =  mongoose.model("User" , userSchema)