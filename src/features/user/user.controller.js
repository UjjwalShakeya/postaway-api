// imporing important modules
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  SignUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = UserModel.signUp(name, email, password);
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(500).json({err:err.message});
    }
  }

  SignIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = UserModel.signIn(email, password);
      if (!result){
        res.status(400).send("Invalid Credentials");
      }else{
        // 1. Create token
        const token = jwt.sign({userID: result.id, email: result.email},"HSXFQH0CnnZc1hohcKH0NicmyfI9sizw",{expiresIn : "1h"});

        // 2. send token
        return res.status(200).send(token);

      }
    } catch (error) {
       res.status(500).send(error);
    }
  }
}
