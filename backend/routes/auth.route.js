import express from "express"
import { login, logout, signup, verifyEmail,forgotPassword,resetPassword,checkauth } from "../controllers/auth.controller.js"
import {verifytoken } from "../middleware/verifytoken.js"

const router=express.Router()

router.get("/check-auth",verifytoken,checkauth)
router.post("/signup",signup)
router.post("/verify-email",verifyEmail)
router.post("/login",login)
router.get("/logout",logout)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)

export default router;