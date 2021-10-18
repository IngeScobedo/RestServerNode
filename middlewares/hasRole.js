const { request, response } = require("express");

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `RESTRICTED method for user ${req.user.name}` });
    }
    next();
  };

};

module.exports = hasRole;