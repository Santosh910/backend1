import { Router } from "express";
import { Cart, addCart, deleteCart } from "../controller/User.controller.js";

const router = Router()

router.post('/add-cart',addCart)
router.post('/get-cart',Cart)
router.post('/delete-cart', deleteCart)

export default router