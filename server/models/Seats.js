const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeatsSchema = new Schema({
    // bus_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'buses'
    // },
    booking_id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'bookings'
    },
    seat_number:{
        type:String,
        required: true
       
    },
    seat_code:{
        type:String,
        required: true
       
    },
    gender:{
        type:String,
        required:true
    },
    // isWindow: 
    // {
    //     type: Boolean,
    //     default: false
    // },
    fare:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('seats',SeatsSchema)