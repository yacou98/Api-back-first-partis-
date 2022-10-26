const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyparser= require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helped/jwt')

const app =express();
app.use(bodyparser.json());
app.use(morgan('tiny'))
app.use(cors())
//app.use(authJwt);

const api= process.env.API_URL;
const productRouter = require('./routers/product');
const categoryRouter= require('./routers/categories')
const userRouter=require('./routers/users')
const orderRouter=require('./routers/orders')


app.use(`${api}/product`,productRouter);
app.use(`${api}/category`,categoryRouter);
app.use(`${api}/user`,userRouter);
app.use(`${api}/orders`,orderRouter);


mongoose.connect('mongodb+srv://yacou:Bamo1998@cluster0.04l1zbd.mongodb.net/?retryWrites=true&w=majority')
.then((db)=>{
    console.log('...connected to db');
}).catch(err =>{console.log(err);})





app.listen(3000,()=>{
    console.log("server is running on port 3000");
})