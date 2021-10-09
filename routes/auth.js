const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
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

router.post(
  "/google",
  [
    check("id_token", "id_token is necessary").not().isEmpty(),
    inputValidate],
  googleSignIn
);
module.exports = router;
