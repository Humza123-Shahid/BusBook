const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpencesSchema = new Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'expencescategory'
    },
    amount:{
        type:Number,
        required:true
    },
    notes: 
    {
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('expences',ExpencesSchema)