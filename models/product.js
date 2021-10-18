const {Schema, model } = require("mongoose");

const ProductScheme = Schema({
    name: {
        type: String,
        required:[true,'Name is Required'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
        required: false
    }
})

ProductScheme.methods.toJSON = function(){
    const { __v,  _id, state,  ...product} = this.toObject();
    product.uid = _id;
    return product;
}

module.exports = model( 'Product', ProductScheme );