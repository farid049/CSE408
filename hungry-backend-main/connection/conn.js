require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.CONN__STRING;

mongoose.connect(URI).then(() => {
    console.log('Database connected')
}).catch(e => {
    console.log(e)
})