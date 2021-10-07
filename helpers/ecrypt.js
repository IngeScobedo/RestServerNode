const User = require("../models/user");
const bcrypt = require("bcryptjs");

const UserEncrypted = (name, mail, password, role) => {
  const user = new User({ name, mail, password, role });

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  
  return user;
};

module.exports = {
  UserEncrypted,
};
