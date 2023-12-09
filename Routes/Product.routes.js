import { Router } from "express";
import { UpdateProduct, YourProduct, addProduct, deleteProduct, filterProducts, getAllProducts, getSingleProducts } from "../controller/Product.controller.js";
import { checkUserId } from "../Middlewares/AllMiddleware.js";

const router = Router();

router.get('/get-all-product',getAllProducts)
router.get('/get-single-product',getSingleProducts)
router.post('/add-product',checkUserId,addProduct)
router.post('/filter-product',filterProducts)
router.post('/your-products',YourProduct)
router.post('/update-product',UpdateProduct)
router.delete('/delete-products',deleteProduct)

export default router