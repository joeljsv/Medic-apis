const mongoose = require('mongoose');
const { DependentHostedNumberOrderPage } = require('twilio/lib/rest/preview/hosted_numbers/authorizationDocument/dependentHostedNumberOrder');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxlength:32,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10
    },
    role:{
        type:Number,
        default:0
    },
    i:{
        type:Number,
        default:0
    },
    time:{
        type:String,
        
    },
    token:{
        type:Number
    },
    appointment:{
        type:Array,
        default:[]
    },
    height:{
        type:Number
    },
    weight:{
        type:Number
    },
    dob:{
        type:Date
    }
});

module.exports = mongoose.model('User', userSchema);