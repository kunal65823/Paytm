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



const accountSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        accountHolder: {
            type: String,
            required: true,
            trim: true
        },

        // Store money in paise, not decimal rupees
        balancePaise: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isSafeInteger,
                message: "Balance must be a safe integer"
            }
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Account", accountSchema);


const Account = mongoose.model('Account',accountSchemas);

const User = mongoose.model(
    'User',userSchemas
)

module.exports = User;