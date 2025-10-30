const mongoose = require('mongoose');
const { Schema } = mongoose;

const FaqsSchema = new Schema({
    question:{
        type:String,
        required: true 
    },
    answer:{
        type:String,
        required: true 
    },
    status: 
    {
        type: Boolean
    }
});

module.exports=mongoose.model('faqs',FaqsSchema)