const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    role:{
        type:String,
        required:true
    },
    // category:{
    //     type:String,
    // },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:
    {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('user',UserSchema)