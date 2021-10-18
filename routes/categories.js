const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const { 
    inputValidate, 
    hasRole, 
    validatorJWT 
} = require("../middlewares/");

const { 
    isValidCategoryId 
} = require("../helpers/db-validators");

const router = Router();

//Get all public categories - public
router.get("/", getCategories);

//Get specific categories by id  - public
router.get(
  "/:id",
  [
    check("id").isMongoId(),
    check("id").custom(isValidCategoryId),
    inputValidate,
  ],
  getCategoryById
);

//Create a category   - private - any user with a valid token
router.post(
  "/",
  [
    validatorJWT,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("name", "Name is required").not().isEmpty(),
    inputValidate,
  ],
  createCategory
);

//Update  specific categories by id  - private only with valid token
router.put(
  "/:id",
  [
    validatorJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(isValidCategoryId),
    hasRole("ADMIN_ROLE"),
    inputValidate,
  ],
  updateCategory
);

//Delete specific categories by id  - private only ADMIN
router.delete(
  "/:id",
  [
    validatorJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(isValidCategoryId),
    hasRole("ADMIN_ROLE"),
    inputValidate,
  ],
  deleteCategory
);

module.exports = router;
