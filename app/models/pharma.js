const mongoose = require('mongoose')
let Schema = mongoose.Schema
var pharmaSchema = new Schema({
    title:{
        type:String,
        trim:true,
        default:''
    },
    description:{
        type:String,
        trim:true,
        default:''
    },
    price:{
        type:Number,
        trim:true,
        default:''
    },
    image:{
        type:String,
        trim:true,
        default:''
    },
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'Usermodel'
    }],
    vendor:{
        type: Schema.Types.ObjectId,
        ref: 'Usermodel'
    }

})

module.exports = mongoose.model('Pharmamodel',pharmaSchema)