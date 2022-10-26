const router = require('express').Router();
const { Category } = require('../models/category');
const Products = require('../models/product');
const muter = require('multer');



router.get('/',async (req,res)=>{
    const listProducts= await  Products.find({}).populate('category');
    res.json(listProducts)
});

router.get('/:id',async (req,res)=>{
    const id= req.params.id;
    const product = await Products.findById({_id:id}).populate('category');
    if(!product) return res.status(500).json({product});
    res.status(200).json(product)
    
})

router.get('/',async (req,res)=>{
   let filter={};
   if (req.query.categories) {
    filter= {category: req.query.categories.split(',')}
    
   }
    const product = await Products.findById(filter).populate('category');
    if(!product) return res.status(500).json({product});
    res.status(200).json(product)

})


router.post('/newproduct',async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(500).send('invalid category')
    let product = new Products({
        name:req.body.name,
        description:req.body.description,
        richDecription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock : req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    })
    product = await product.save();
    if(!product) return res.status(500).json({message:'product cannot be created'})
    res.status(200).json(product)
})


router.put('/:id',async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(500).send('invalid category');
    const id = req.params.id;
    let product=await  Products.findOneAndUpdate({_id:id},{
        name:req.body.name,
        description:req.body.description,
        richDecription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock : req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    },{new:true});
      product =  product.save()
     if(!product) return res.status(404).json({message:"category cannot be updated"});
     res.status(200).json(product)
 })


 router.delete('/:id',async (req,res)=>{
    const id= req.params.id;
    const product =await Products.findByIdAndRemove(_id=id);
    if (!product) 
      return res.status(404).send('category cannot be removed')  
      res.status(200).json({message:'deleted'})
    
})

router.get('/get/count',async (req,res)=>{
    const countProduct = await Products.countDocuments({})
    if(!countProduct)
     {
        return res.status(500).json({success:false})
    }else{
        res.status(200).send({
        countProduct:countProduct
    })
    }

});

router.get('/get/featured/:count',async (req,res)=>{
    const count = req.params.count ? req.params.count :0;
    const product = await Products.find({isFeatured:true}).limit(count);
    if(!product) return res.status(500).json({success:false});
    res.status(200).json({product:product});

})



module.exports= router;