const mongoose = require('mongoose');
const userSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    street:{
        type:String,
        default:''
    },
    appartement:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})






const user= mongoose.model('User',userSchema);
module.exports=user;