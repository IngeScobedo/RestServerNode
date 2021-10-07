const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPut,
  usersPatch,
  usersDelete,
  usersPost,
  userError,
} = require("../controllers/users");

const { isValidRole, isValidEmail, isValidUserByID } = require("../helpers/db-validators");
const inputValidate = require("../middlewares/input-validate");

const Role = require("../models/role");
const router = Router();

router.get("/", usersGet);



router.put("/:id", [
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(isValidUserByID),
  check('role').custom(isValidRole),
  inputValidate
] ,usersPut);



router.patch("/", usersPatch);


router.delete("/", usersDelete);



router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("mail").custom(isValidEmail).isEmail(),
    check(
      "password",
      "The password is invalid or must contain more than 6 digits"
    ).isLength({ min: 6 }),
    check("role").custom(isValidRole),
    inputValidate,
  ],
  usersPost
);



router.get("*", userError);

module.exports = router;
