
const mongoose = require('mongoose');
const orderSchema =  mongoose.Schema({
   orderItems:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'orderItem',
    required:true
   },
   shippingAdress1:{
    type:String,
    required:true
   },
   shippingAdress2:{
    type:String,
    required:true
   },
   city:{
    type:String,
    required:true
   },
   zip:{
    type:String,
    required:true,
   },
   country:{
    type:String,
    required:true
   },
   phone:{
    type:String,
    default:''
   },
   status:{
      type:String,
      required:true,
      default:'Pending'
   },
   totalPrice:{
    type:Number,
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   },dateOrdered:{
 type:Date,
 default:Date.now,
   }
})


const orderschema= mongoose.model('order',orderSchema);
module.exports=orderschema;