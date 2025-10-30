const mongoose = require('mongoose');
const { Schema } = mongoose;

const BusesSchema = new Schema({
    driver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'driver'
       
    },
    bus_number:{
        type:String,
        required: true
    },
    bus_type:{
        type:String,
        required: true
    },
    bus_category:{
        type:String,
        required: true
    },
    total_seats:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('buses',BusesSchema)