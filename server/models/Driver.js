const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
    name:{
        type:String,
        required: true
       
    },
    license_number: 
    {
        type: String,
        required: true
    },
    contact_number: 
    {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('driver',DriverSchema)