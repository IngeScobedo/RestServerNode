const bcrypt = require('bcryptjs');
const {request, response} = require('express');
const { generator } = require('../helpers/genJWT');
const User = require('../models/user');


const login = async (req = request, res = response)=>{

    let { mail, password } = req.body;

try {
    
    //Verificar email

    const user = await User.findOne({mail})
    if(!user) { return res.status(400).json({
        msg: 'e-mail / password incorrect - e'
    })}

    //Si el usuario esta activo

    if(!user.state) { return res.status(400).json({
        msg: 'e-mail / password inactive'
    })}

    //Verificar password

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) { return res.status(400).json({
        msg: 'e-mail / password invalid - p'
    })}

    //generar JWT

    let token = await generator(user.id)

    res.status(200).json({
        user,
        token
    })

} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Server Internal error'
    })
}


}

module.exports = {
    login
};