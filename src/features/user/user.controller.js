// imporing important modules
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// importing enviroment variables
import dotenv from "dotenv";
dotenv.config();

// getting jwt token from the enviroment variable
const jwtSecret = process.env.JWT_SECRET;

export default class UserController {
  async SignUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = UserModel.signUp(name, email, hashedPassword);
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async SignIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = UserModel.signIn(email);
      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      } else {
        // 1. Create token
        const token = jwt.sign(
          { userID: result.id, email: result.email },
          jwtSecret,
          { expiresIn: "1h" }
        );

        // 2. send token
        return res.status(200).send(token);
      };
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
