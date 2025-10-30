const mongoose = require('mongoose');
const { Schema } = mongoose;

const DestinationSchema = new Schema({
    name:{
        type:String,
        required: true 
    },
    status: 
    {
        type: Boolean
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('destination',DestinationSchema)