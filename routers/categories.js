const router = require('express').Router();
const {Category}=require('../models/category');

router.get('/all',async (req,res)=>{
    let category = await Category.find({})
    res.status(200).json(category)
})


router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const category = await Category.findById(_id=id);
    if(!category)
    return res.status(500).json({message:'uncknow id'})
    res.status(200).json({data:category})
})

router.post('/new',async (req,res)=>{
   let category = new Category({
    name:req.body.name,
    icon:req.body.icon,
    color:req.body.color
   });
   category = await category.save();
   if (!category) 
    return res.status(404).send('cannot be create category ')

    res.send(category)
})

 router.put('/:id',async (req,res)=>{
    const id = req.params.id;
    let category= await Category.findOneAndUpdate({_id:id},{
        name:req.body.name,
        icon:req.body.icon ,
        color:req.body.color,
    });
      category.save();
     if(!category) return res.status(404).json({message:"category cannot be updated"});
     res.status(200).json({data:category})
 })

router.delete('/deleteOne/:id',async (req,res)=>{
    const id= req.params.id;
    const category =await Category.findByIdAndRemove(_id=id);
    if (!category) 
      return res.status(404).send('category cannot be removed')  
      res.status(200).json({message:'deleted'})
    
})

module.exports=router;

