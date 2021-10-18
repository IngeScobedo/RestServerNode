const { request, response } = require("express");
const { Category, User } = require("../models");

let getCategories = async (req = request, res = response) => {
  const { limit = 5, since = 0, category_state = true } = req.query;
  let query = { state: category_state };

  let [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    categories,
  });
};

let getCategoryById = async (req = request, res = response) => {
  let { id } = req.params;

  let category = await Category.findById(id).populate("user", "name");

  if (!category) {
    res.status(404).json({
      msg: `Category with the given id does not exist`,
    });
  }

  res.status(200).json({
    category,
  });
};

let createCategory = async (req = request, res = response) => {
  let name = req.body.name.toUpperCase();
  let user = await User.findById(req.user._id);
  let categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    res
      .status(400)
      .json({ msg: `Category ${categoryDB.name} is already created` });
  }

  let data = {
    name,
    user,
  };

  let category = new Category(data);

  await category.save();

  res.status(201).json({
    msg: `Category: ${category.name} saved successfully!`,
    category,
  });
};

let updateCategory = async (req = request, res = response) => {
  let { id } = req.params;
  let { user, uid, state, ...rest } = req.body;

  rest.name = rest.name.toUpperCase();
  rest.user = req.user;

  let category = await Category.findByIdAndUpdate(id, rest, { new: true });

  res.status(200).json({
    msg: `Success category updated successfully`,
    category,
  });
};

let deleteCategory = async (req = request, res = response) => {
  let { id } = req.params;

  let category = await Category.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    msg: `Success category deleted`,
    category_deleted: category,
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
