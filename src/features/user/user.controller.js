// importing important modules
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config(); // must be first before other imports

const jwtSecret = process.env.JWT_SECRET;

export default class UserController {
  async SignUp(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Double-check input 
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await UserModel.signUp(name, email, hashedPassword);

      // Optional: Auto-login after signup
      const token = jwt.sign(
        { userID: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        message: "User created successfully",
        user: { id: user.id, name: user.name, email: user.email },
        token,
        expiresIn: "1h",
      });
      
    } catch (err) {
      next(err);
    }
  }

  async SignIn(req, res, next) {
    try {
      const { email, password } = req.body;

      // checking email and password if any of them is missing then throw error
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const result = await UserModel.signIn(email);
      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userID: result.id, email: result.email },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        expiresIn: "1h",
      });

    } catch (err) {
      next(err);
    }
  }
};
