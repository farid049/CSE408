require('dotenv').config();
require('./connection/conn');
const cors = require('cors');
const express = require('express');
const app = express();
const userRoute = require('./API/userRoute');
const orderRoute = require('./API/orderRoute');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/order', orderRoute);

app.listen(PORT, () => {
    console.log(`You are listening to the port: ${PORT}`)
})