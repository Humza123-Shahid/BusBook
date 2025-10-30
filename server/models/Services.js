const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({
    // driver_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'driver'
       
    // },
    service_name:{
        type:String,
        required: true
    },
    service_description:{
        type:String,
        required: true
    },
    availability_status:{
        type:Boolean,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('services',ServicesSchema)