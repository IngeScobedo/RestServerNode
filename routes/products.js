const { Router } = require("express");
const { check } = require("express-validator");

const {
  createProduct,
  getproducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/products");

const {
  isValidRole,
  isValidEmail,
  isValidUserByID,
  isValidProductByID,
  isValidCategoryIdv,
} = require("../helpers/db-validators");

const { inputValidate, hasRole, validatorJWT } = require("../middlewares/");

const router = Router();

//Get products - PUBLIC
router.get("/", getproducts);

//Get Product by id - PUBLIC

router.get(
  "/:id",
  [
    check("id", "ID is required or is not valid").isMongoId(),
    check("id").custom(isValidProductByID),
    inputValidate,
  ],
  getProductById
);

//Create Product - AUTHORIZED ROLE
router.post(
  "/",
  [
    validatorJWT,
    hasRole("SELLER_ROLE", "ADMIN_ROLE"),
    check("name", "Name of the Product is required").not().isEmpty(),
    check("price", "Price of the Product is required")
      .not()
      .isEmpty()
      .isNumeric(),
    check("description", "Description of the Product is required")
      .not()
      .isEmpty(),
    check("categoryId", "Category of the Product is required").isMongoId(),
    inputValidate,
  ],
  createProduct
);

//Update Product - AUTHORIZED ROLE
router.put("/:id", [
validatorJWT,
hasRole("ADMIN_ROLE",'SELLER_ROLE'),
check('id','Id of the Product is required"').isMongoId(),
check('id').custom(isValidProductByID),
check('name', 'Product Name is Required').not().isEmpty(),
check('category').custom(isValidCategoryIdv),
inputValidate,
], updateProduct);

//Delete Product - ADMIN ROLE
router.delete('/:id', [
  validatorJWT,
hasRole("ADMIN_ROLE",'SELLER_ROLE'),
check('id','Id of the Product is required"').isMongoId(),
check('id').custom(isValidProductByID),
inputValidate,
], deleteProduct);

module.exports = router;
