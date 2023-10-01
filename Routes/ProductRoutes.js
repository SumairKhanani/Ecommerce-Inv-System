const router = require("express").Router();
const Product = require("../Models/Product");

//Create a product
router.post("/createProduct", async (req, res) => {
    console.log("Inside the function");
    try {
        const newProduct = new Product({
            Name: req.body.Name,
            Supplier: req.body.Supplier,
            Description: req.body.Description,
            Category:req.body.Category,
            Price: req.body.Price,
            Qty: req.body.Qty,
            LowStockFlag: req.body.Qty < 10 ? true : false
        });

        const savedProduct = await newProduct.save();

        if (savedProduct.LowStockFlag) {
            console.log(`Product "${savedProduct.Name}" is low in stock.`);
        }

        res.status(200).json(savedProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});



//Update a product
router.put("/updateProduct/:id",async(req,res)=>
    {
    try{
        const productId = req.params.id;

        // Find the existing product by ID
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        const UpdatedProduct= await Product.findByIdAndUpdate(req.params.id,
            {$set:req.body},
        {
            new:true
        });
        if (UpdatedProduct.Qty < 10) {
            UpdatedProduct.LowStockFlag = "true";
            console.log(`Product "${UpdatedProduct.Name}" is low in stock.`);
        } else {
            UpdatedProduct.LowStockFlag = "false";
        }
        res.status(200).json(
            {   success:true,
                UpdatedProduct
            });
 
    } 
      catch(err){
        return res.status(500).json({
            success:false,
            err
        });
    }
});

//Get all products
router.get("/getProducts", async(req,res)=>
{
    try{
        const products= await Product.find({isDeleted:"false"})
        res.status(200).json(
        { 
            success:true,
            products
         });
      
    }catch(err)
    {
        return res.status(500).json(
        {
            success:false,
            err
        });
    }
});

//Get all products according to the category
router.get("/getProducts/:category", async(req,res)=>
{
    cat = req.params.category
    try{
        const products= await Product.find({isDeleted:"false", Category:cat})
        res.status(200).json(
        { 
            success:true,
            products
         });
      
    }catch(err)
    {
        return res.status(500).json(
        {
            success:false,
            err
        });
    }
});

//Hard Delete - Will delete from the database
router.delete("/deleteProduct/:id", async(req,res)=>
{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Bid has been deleted",
            success:true
        })
    }catch(err)
    {
        return  res.status(500).json(
            {
                success:false,
                err
            });
    }
});

//Soft Delete - Will not delete from the database but the product will not show anywhere except in the database
router.put("/deleteProd/:id",async(req,res)=>
    {
    try{
        const DeletedProduct= await Product.findByIdAndUpdate(req.params.id, {isDeleted:"true"},
        {
            new:true
        });
        res.status(200).json(
            {   success:true,
                DeletedProduct
            });
 
    } 
      catch(err){
        return res.status(500).json({
            success:false,
            err
        });
    }
});

//LowStock
router.get("/lowstock/:category", async(req,res)=>
{
    cat = req.params.category
    try{
        const products= await Product.find({LowStockFlag: req.body.Qty < 10 ? "true" : true, Category:cat})
        res.status(200).json(
        {
            success:true,
            message:("The stock for these items is low kindly update the stock"),
            products
            
         });
      
    }catch(err)
    {
        return res.status(500).json(
        {
            success:false,
            err
        });
    }
});


module.exports=router;
