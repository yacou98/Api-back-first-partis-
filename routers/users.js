const router = require('express').Router();
const User = require('../models/user')
const bcript = require('bcrypt')
const jwt= require('jsonwebtoken')


router.get('/',async (req,res)=>{

    const user = await User.find({}).select("-password");
    if(!user)
    return res.status(500).json({message:'uncknow id'})
    res.status(200).json({data:user})
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user = await User.findById(_id=id).select("-password");
    if(!user)
    return res.status(500).json({message:'uncknow id'})
    res.status(200).json({data:user})
})

router.post('/register',async (req,res)=>{
   let user = new User({
    name:req.body.name,
    email:req.body.email,
    password:bcript.hashSync(req.body.password,10),
    street:req.body.street,
    appartement:req.body.appartement,
    zip:req.body.zip,
    city:req.body.city,
    country:req.body.country,
    phone:req.body.phone,
    isAdmin:req.body.isAdmin
    
   });
   user = await user.save();
   if (!user) 
    return res.status(404).send('cannot be create category ');

    res.send(user)
})


router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if (!user) {
       return  res.status(400).send('email not found');
    }
    if (user && bcript.compareSync(req.body.password ,user.password)) {
        const token= jwt.sign(
            { userId:user.id },
            process.env.secret,
            {expiresIn:'1d'}
           
           
        )
        return  res.status(200).send({user:user.email,token:token});
    } else {
            return  res.status(400).send("password is wrong");

    }
})







module.exports=router;