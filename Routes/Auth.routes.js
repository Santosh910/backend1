import { Router } from "express";
import { Login, Register, getCurrentUser } from "../controller/Auth.controller.js";

const router = Router();

router.post('/register',Register)
router.post('/login',Login)
router.post('/get-user',getCurrentUser)

export default router