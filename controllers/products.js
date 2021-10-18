const { request, response } = require("express");
const { Category, User, Product } = require("../models");

let getproducts = async (req = request, res = response) => {
  const { limit = 5, since = 0, product_state = true } = req.query;
  let query = { state: product_state };

  let [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    products,
  });
};

let getProductById = async (req = request, res = response) => {
  let { id } = req.params;

  let product = await Product.findById(id);

  if (!product) {
    res.status(404).json({
      msg: `Product with id '${id}' does not exist`,
    });
  }

  res.status(200).json({
    product,
  });
};

let createProduct = async (req = request, res = response) => {
  let { name, price, categoryId, description } = req.body;

  name = name.toUpperCase();

  let productDB = await Product.findOne({ name });
  if (productDB) {
    res.status(400).json({
      msg: "Product already exists",
    });
  }

  let user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({
      error: "User Not found",
      msg: "no ok",
      userId,
    });
  }

  let category = await Category.findById(categoryId);

  let data = {
    name,
    user,
    price,
    category,
    description,
  };

  let product = new Product(data);

  await product.save();

  res.status(201).json({
    msg: "Product created successfully",
    product,
  });
};

let updateProduct = async (req = request, res = response) => {
  let id = req.params.id;
  let userId = req.user._id;

  let userDB = await User.findById(userId);

  let { user, uid, ...data } = req.body;
  data.user = userDB;
  data.name = data.name.toUpperCase();

  if (data.category) {
    let categoryId = data.category;
    const category = await Category.findById(categoryId);
    data.category = category;
  }

  try {
    let product = await Product.findByIdAndUpdate(id, data);

    res.status(201).json({
      msg: "Updated",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error updating",
    });
  }
};

let deleteProduct = async (req = request, res = response)=>{
let id = req.params.id;
let product = await Product.findByIdAndUpdate(id, { state: false, available: false});
res.status(201).json({
  product
})
}

module.exports = {
  createProduct,
  getproducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
