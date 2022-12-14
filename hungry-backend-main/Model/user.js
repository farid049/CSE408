const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    vehicle: {
        type: String, 
        required: true
    },

    shift: {
        type: String, 
        required: true
    }

})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const model = mongoose.model('registered__users', userSchema);
module.exports = model;