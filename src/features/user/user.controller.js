// imporing important modules
import UserModel from "./user.model.js";

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
      const newuser = UserModel.signIn(email, password);
      res.status(200).send("User has been logged in");
    } catch (error) {
       res.status(500).send(error);
    }
  }
}
