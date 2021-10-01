const { response, request} = require("express");

const usersGet = (req = request, res = response) => {

  const query = req.query;

  res.status(200).json({
    msg: "get API - controller",
    query
  });
};
const usersPost = (req, res) => {
  const { name, years } = req.body;

  res.status(200).json({
    msg: "post API - controller",
    body,
  });
};
const usersPatch = (req, res) => {
  res.status(200).json({
    msg: "patch API - controller",
  });
};
const usersDelete = (req, res) => {
  res.status(200).json({
    msg: "delete API - controller",
  });
};
const usersPut = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "put API - controller",
    id,
  });
};
const userError = (req, res) => {
    res.status(404).json({
        msg: 'Error 404',
    })
}
module.exports = {
  usersGet,
  usersPut,
  usersDelete,
  usersPost,
  usersPatch,
  userError
};
