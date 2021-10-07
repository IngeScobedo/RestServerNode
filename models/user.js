const {Schema, model } = require("mongoose");

const userScheme = Schema({
    name: {
        type: String,
        required: [true,'Name is Required']
    },
    mail: {
        type: String,
        required: [true,'Name is Required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'Password is Required'],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: [true,'Role is Required']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
        unique: false
    }
})

userScheme.methods.toJSON = function(){
    const { __v, password , ...user} = this.toObject();
    return user;
}

module.exports = model( 'User', userScheme );