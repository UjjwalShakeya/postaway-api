export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static signUp(name, email, password) {
    const existingUser = Users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const newUser = new UserModel(Users.length + 1, name, email, password);
    Users.push(newUser);
    console.log(Users);
    return newUser;
  }

  static signIn(email, password) {
    const isUserFound = Users.find(
      (u) => u.email == email && u.password == password
    );
    if (!isUserFound) {
      throw new Error("Incorrect Credentials");
    }
    return isUserFound;
  }
}

let Users = [
    { id: 1, name: 'Ujjwal Shakeya', email: 'ujjwalshakeya1@gmail.com', password: 'abc123' }
]
