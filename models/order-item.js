const mongoose = require('mongoose');


const orderItemSchema =new mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }
})
const orderitem= mongoose.model('orderItem',orderItemSchema)
module.exports=orderitem;