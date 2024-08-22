import mongoose from "mongoose";
import {User} from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import  bcrypt  from "bcryptjs"


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Validate required fields
      if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required' });
      }

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      user = new User({
          name,
          email,
          password
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;

      // Save the user to the database
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
  
 export  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, userId: user._id, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };