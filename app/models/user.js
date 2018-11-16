const mongoose = require('mongoose')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
let Schema = mongoose.Schema
var userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        default:''
    },
    email:{
        type:String,
        trim:true,
        default:''
    },
    phone:{
        type:String,
        trim:true,
        default:''
    },
    address:{
        type:String,
        trim:true,
        default:''
    },
    role:{
        type:String,
        enum:['user','vendor','admin'],
        default:'user'
    },
    password:{
        type:String,
        trim:true,
        default:''
    },
    pharma:[{
        type: Schema.Types.ObjectId,
        ref: 'Pharmamodel'
    }]
})

module.exports = mongoose.model('Usermodel',userSchema)