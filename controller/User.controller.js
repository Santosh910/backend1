import UserModel from "../modals/Users.model.js";
import ProductModal from "../modals/Product.model.js"

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) return res.status(404).json({ success: false, message: "User and product are mandotory" })

        await UserModel.findByIdAndUpdate(userId,{$push: { cart: productId }} )
        return res.status(200).json({ success: true, message: "product added to cart successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const Cart = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(404).json({ success: false, message: "User is mandotory" })

       const user = await UserModel.findById(id)
        if (!user) {
            var userCart = []
            for (var i = 0; i < user.cart.length; i++) {
                const productData = await ProductModal.findById(user.cart[i])
                userCart.push(productData)
             }
            return res.status(201).json({ success: true, message: "product fetched successfully.", products: userCart })
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) return res.status(404).json({ success: false, message: "User and Product are mandatory.." })

        const user = await UserModal.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })
        
        const index = user.cart.indexOf(productId);
        user.cart.splice(index, 1)
        await user.save();

        var userCart = []
        for (var i = 0; i < user.cart.length; i++) {
            const productData = await ProductModal.findById(user.cart[i])
            userCart.push(productData)
        }
        return res.status(201).json({ success: true, message: "Product deleted successfully.", products: userCart })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}