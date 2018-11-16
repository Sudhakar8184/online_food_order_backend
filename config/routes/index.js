let express = require('express');
const router = require('express').Router();
require('./../../app/models/user')
require('./../../app/models/pharma')
module.exports = function(app){
    app.get('/',(req,res)=>{
        res.json({success:true,meassage: "mainpage"})
    })
 
    app.use('/api/v1',require('./v1'))
}