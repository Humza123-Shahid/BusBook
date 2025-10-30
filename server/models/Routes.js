const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

const RoutesSchema = new Schema({
    start_destination_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'destination'
       
    },
    end_destination_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'destination'
       
    },
    bus_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'buses'
       
    },
    departure_time:{
        type:Date,
        required: true
    },
    arrival_time:{
        type:Date,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    fare:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('routes',RoutesSchema)