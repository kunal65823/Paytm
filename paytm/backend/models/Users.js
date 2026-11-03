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

const User = mongoose.model(
    'User',userSchemas
)

module.exports = User;