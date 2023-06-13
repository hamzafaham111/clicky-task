const express = require('express');
const env = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;
require('./DB/connection')

const stockRoute = require('./Routes/stockRoute')
app.use('/',stockRoute)

app.listen(PORT, ()=>{
    console.log(`SERVER is Running on Port: ${PORT}`);
})
