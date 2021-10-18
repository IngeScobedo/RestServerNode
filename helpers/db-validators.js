const Role = require("../models/role");
const {Category,User, Product} = require("../models");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The entered role ${role} does not exist in the database`);
  }
};
 const isValidEmail = async (mail)=>{
   //validar si el correo existente

  const emailValidation = await User.findOne({mail});

  if (emailValidation){
    throw new Error('The email entered is already registered')
  }
 }

 const isValidCategoryId = async (id)=>{
  const categoryExistence = await Category.findById(id);

  if (!categoryExistence){
    throw new Error(`Category with the id ${id} does not exist`);
  }
 }

 const isValidCategoryIdv = async (id)=>{

  if(!id){
    return;
  }

  const categoryExistence = await Category.findById(id);

  if (!categoryExistence){
    throw new Error(`Category with the id ${id} does not exist`);
  }
 }
 const isValidUserByID = async (id)=>{
  const userExists = await User.findById(id);

  if (!userExists){
    throw new Error(`There is no user with the id ${id}`);
  }
 }

let isValidProductByID = async (id)=>{

  let product = await Product.findById(id);

  if(!product){
    throw new Error(`There is no product with the id ${id}`)
  }
}



module.exports = {
  isValidEmail,
    isValidRole,
    isValidUserByID,
    isValidCategoryId,
    isValidProductByID,
    isValidCategoryIdv
};
