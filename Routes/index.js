import { Router } from "express";
import AuthRoutes from './Auth.routes.js'
import ProductRoutes from './Product.routes.js'
import UserRoutes from './User.routes.js'

const router = Router()
  
router.use('/auth',AuthRoutes)
router.use('/product',ProductRoutes)
router.use('/user',UserRoutes)

export default router