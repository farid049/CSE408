const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    payment: {
        type: String,
        required: true
    },

    orderItem: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    countdown: {
        type: String,
        default: '0'
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model('new__orders', orderSchema);
module.exports = model;