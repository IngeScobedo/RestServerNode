const jwt = require("jsonwebtoken");
require('dotenv').config();


const generator = (uid = '')=>{
    return new Promise((resolve, reject)=>{
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY , {
            expiresIn: '365d',
        }, (error, token)=>{
            if(error){
                console.log(error);
                reject('Generate failed');
            }
            else{
                resolve(token);
            }
        })
    })
}


module.exports = {
    generator
}