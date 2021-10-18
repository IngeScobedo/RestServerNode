const { response, request } = require("express");
const { UserEncrypted } = require("../helpers/ecrypt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, since = 0, user_state = true } = req.query;
  let query = { state: user_state };

  let [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  

  res.status(200).json({
    total,
    users,
  });
};
const usersPost = async (req = request, res = response) => {
  const { name, mail, password, role } = req.body;

  let user = UserEncrypted(name, mail, password, role);

  await user.save();

  res.status(200).json({
    user,
  });
};
const usersPatch = (req = request, res = response) => {
  res.status(200).json({
    msg: "patch API - controller",
  });
};
const usersDelete = async (req = request, res = response) => {
  let { id } = req.params;
  let user = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json( user );
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, mail, ...rest } = req.body;
  console.log(rest);

  if (password) {
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.status(200).json({
    msg: "put API - controller",
    user,
  });
};
const userError = (req = request, res = response) => {
  res.status(404).json({
    msg: "Error 404",
  });
};
module.exports = {
  usersGet,
  usersPut,
  usersDelete,
  usersPost,
  usersPatch,
  userError,
};
