const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models/");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", req = request, res = response) => {
  let { limit = 5, state = true } = req.query;
  const isValidMongoid = ObjectId.isValid(term);

  if (isValidMongoid) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? [user] : [],
    });
  }

  const regexp = new RegExp(term, "i");

  let [total, users] = await Promise.all([
    User.countDocuments({
      $or: [{ name: regexp }, { mail: regexp }],
      $and: [{ state }],
    }),
    User.find({
      $or: [{ name: regexp }, { mail: regexp }],
      $and: [{ state }],
    }).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    results: users,
  });
};

let searchCategories = async (term = "", req = request, res = response) => {
  let { limit = 5, state = true } = req.query;
  const isValidMongoid = ObjectId.isValid(term);

  if (isValidMongoid) {
    const category = await Category.findById(term);
    return res.status(200).json({
      results: category ? [category] : [],
    });
  }
  term = term.toUpperCase();
  const regexp = new RegExp(term, "i");

  let [total, categories] = await Promise.all([
    Category.countDocuments({ name: regexp, state }),
    Category.find({ name: regexp, state }).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    results: categories,
  });
};

let searchProducts = async (term, req = request, res = response) => {
  let { limit = 5, state = true } = req.query;
  const isValidMongoid = ObjectId.isValid(term);

  if (isValidMongoid) {
    const product = await Product.findById(term)
      .populate("user", "name")
      .populate("category", "name");
    return res.status(200).json({
      results: product ? [product] : [],
    });
  }
  const regexp = new RegExp(term, "i");

  let [total, products] = await Promise.all([
    Product.countDocuments({ name: regexp, state }),
    Product.find({ name: regexp, state })
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);

  res.status(200).json({
    total,
    results: products,
  });
};

//get Router initial
let getSearch = async (req = request, res = response) => {
  let { colection, term } = req.params;

  if (!allowedCollections.includes(colection)) {
    res.status(404).json({
      msg: "Colection not found",
    });
  }

  switch (colection) {
    case "users":
      searchUsers(term, req, res);
      break;
    case "categories":
      searchCategories(term, req, res);
      break;
    case "products":
      searchProducts(term, req, res);
      break;
    default:
      res.status(500).json({
        notdeined: "lol",
      });
  }
};

module.exports = {
  getSearch,
};
