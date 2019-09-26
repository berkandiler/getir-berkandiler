const express=require('express');
const app=express();
const bodyParser =require('body-parser');
const mongoose = require('mongoose');


const getirRoutes=require('./api/routes/getir');


mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study',
{ useUnifiedTopology: true ,useNewUrlParser: true}

);




mongoose.Promise=global.Promise;


app.use (bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/',getirRoutes );    


app.use((req,res,next)  => {

    const error = new Error('bulunamadi');
    error.status=404;                             
    next(error);

});



module.exports = app;