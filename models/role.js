

const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Role is Required'],
    }
});

module.exports = model('role', RoleSchema);

