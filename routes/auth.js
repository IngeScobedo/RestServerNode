const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const inputValidate = require("../middlewares/input-validate");

const router = Router();

router.post(
  "/login",
  [
    check("mail", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    inputValidate,
  ],
  login
);

module.exports = router;
