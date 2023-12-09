import ProductModel from "../modals/Product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({}).limit(10)
        if (products.length) {
            return res.status(200).json({ success: true, message: "products found", products: products })
        }
        return res.status(404).json({ success: false, message: "product not found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getSingleProducts = async (req, res) => {
    try {
        const { id: productId } = req.query;
        if (!productId) return res.status(404).json({ success: false, message: "id not found" })

        const product = await ProductModel.findById(productId)

        if (product) {
            return res.status(200).json({ success: true, message: "product found", product: product })
        }
        return res.status(404).json({ success: false, message: "product not found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image, id } = req.body;
        if (!name || !price || !category || !image) return res.status(401).json({ success: false, message: "all data is mandotory" })

        const product = new ProductModel({
            name, price, category, image, userId: id
        })
        await product.save()

        return res.status(200).json({ success: true, message: "product added successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, })
    }
}

export const filterProducts = async (req, res) => {
    try {
        const { skip , page=10, query,sorting } = req.body;
        const updateQuery = {category :query}
        
        const name = sorting.replace(/^-/,"")
        const order = sorting[0]=="-"?"-":"";

        const updatedSorting = {[name]:`${order}1`}

        const products = await ProductModel.find(updateQuery).skip(skip).limit(page).sort({sorting})

        return res.status(200).json({ success: true, message: "product found", products})
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const YourProduct = async (req,res) =>{
    try{
        const {id} = req.body;
        if(!id) return res.status(401).json({message:"id not found",success:false})
         
        const allproducts = await ProductModel.find({userId: id})
        return res.status(200).json({ success: true, message: "products found", products: allproducts })
    }catch(error){
        return res.status(500).json({ success: false, message: error })
    }
}

export const UpdateProduct = async (req,res)=>{
    try{
        const{ name, price, category, image,_id } = req.body.productData;

        if(!name || !price || !category || !image || !_id) return res.status(404).json({success:false,message:"All fields are mandotory" })


        await ProductModel.findByIdAndUpdate(_id,{name, price, category, image})
        return res.status(200).json({success:true,message:"product updated successfully"})

        

    }catch(error){
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteProduct = async (req,res)=>{
   try{
       const {id} = req.query;
       if(!id) return res.status(401).json({message:"id not found",success:false})

       await ProductModel.findByIdAndDelete(id)
       return res.status(200).json({success:true,message:"product deleted success"})
   }catch(error){

   }
}