const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},{
    timestamps:true
    }
);

const accountSchemas = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        default:0
    }
})

const Account = mongoose.model('Account',accountSchemas);

const User = mongoose.model(
    'User',userSchemas
)

module.exports = User;