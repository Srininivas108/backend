const Product=require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");


//create product
exports.createProduct=async (req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}
//get all products and search ,filter product
exports.getAllProducts=async(req,res)=>{
    const apiFeature =new ApiFeatures(Product.find(),req.query).search().filter();
    const products=await apiFeature.query;

     res.status(200).json({
         success:true,
        products
    });

}
//get product details
exports.getProductDetails=async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true,
       product
   });
}


//update  product

exports.updateProduct=async (req,res,next)=>{

    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        product,
      });

}
//delete product
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found",
          })
    }
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  }