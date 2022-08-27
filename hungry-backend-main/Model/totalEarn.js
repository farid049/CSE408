const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    riderId: {
        type: String,
        required: true
    },

    earned: {
        type: Number,
        required: true
    },

    date: {
        type: Object,
        required: true
    }
})

const model = mongoose.model('totalEarned', schema);
module.exports = model;
