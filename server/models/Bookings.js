const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingsSchema = new Schema({
    booking_id:{
        type:String,
        required:true
    },
    
    // seat_id:
    // {
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'seats' 
    // },
     name:{
        type:String,
        required:true
    },
    cnic:{
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
    booking_date:
    {
       type:Date,
        default:Date.now
    },
    status: 
    {
        type: String
    },
    route_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'routes'
    },
    discount:{
        type:Number,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    }
    // date:{
    //     type:Date,
    //     default:Date.now
    // }
});

module.exports=mongoose.model('bookings',BookingsSchema)