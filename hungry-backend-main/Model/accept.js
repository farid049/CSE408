const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    orderId: {
        type : String,
        required: true
    },

    riderId: {
        type: String,
        required: true
    }
})

const model = mongoose.model('accept__orders', schema);
module.exports = model;
