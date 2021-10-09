let { request, response } = require("express");
let jwt = require("jsonwebtoken");

let User = require("../models/user");

const validatorJWT = async (req = request, res = response, next) => {
  let token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Petition without licenses ",
    });
  }

  try {
    let { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    let user = await User.findById(uid);

    if(!user) {
      return res.status(404).json({
        msg: "Username does not exist"
      })
    }

    if (!user.state) {
      return res
        .status(401)
        .json({ msg: `RESTRICTED method for user ${user.name}` });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "Petition with invalid token",
    });
  }
};

module.exports = {
  validatorJWT,
};
