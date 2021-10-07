const Role = require("../models/role");
const User = require("../models/user");

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

 const isValidUserByID = async (id)=>{
  const userExists = await User.findById(id);

  if (!userExists){
    throw new Error(`There is no user with the id ${id}`);
  }
 }

module.exports = {
  isValidEmail,
    isValidRole,
    isValidUserByID,
};
