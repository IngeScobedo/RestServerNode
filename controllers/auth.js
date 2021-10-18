const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const { generator } = require("../helpers/genJWT");
const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/user");

const login = async (req = request, res = response) => {
  let { mail, password } = req.body;

  try {
    //Verificar email

    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "e-mail / password incorrect - e",
      });
    }

    //Si el usuario esta activo

    if (!user.state) {
      return res.status(400).json({
        msg: "e-mail / password inactive",
      });
    }

    //Verificar password

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "e-mail / password invalid - p",
      });
    }

    //generar JWT

    let token = await generator(user.id);

    console.log(user);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Internal error",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    let { name, image, mail, google } = await googleVerify(id_token);

    let user = await User.findOne({ mail });

    if (!user) {
      //Create user
      const data = {
        name,
        mail,
        password: "temporal",
        image,
        google: true,
        role: "USER_ROLE",
      };
      user = new User(data);
      await user.save();
    }

    //Check State

    if (!user.state) {
      res.status(401).json({
        msg: "Contacte con el administrador",
      });
    }

    //Generate JWT

    let token = await generator(user.id);

    res.json({
      msg: "200 OK",
      user,
      id_token,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  login,
  googleSignIn,
};
