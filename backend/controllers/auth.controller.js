import bcryptjs from "bcryptjs";
import crypto from "crypto"


import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail,sendforgotPasswordMail,sendResetPasswordMail } from '../mailtrap/emails.js'
import { User } from "../models/user.model.js";



export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            res.status(400).json({ message: "This Email Already exists" })
            return
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()// this creates a random 6 digit verification code 


        const user = new User(
            {
                email,
                password: hashedPassword,
                name,
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            })

        await user.save()
        // we hashed the password and created a user and save it in the database , now we need to create a jwt token to  authenicate them in the client set the cookie and send verification email with verification token to verify the users email  


        const jwttoken = generateTokenAndSetCookie(res, user._id)

        res.status(200).json({
            success: true,
            message: "user created succesfully",
            user: {
                ...user._doc,// this contains only data without mongoose specific function and data 
                password: null
            }
        })

        sendVerificationEmail(user.email, verificationToken)
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }

}


export const verifyEmail = async (req, res) => {
    const { enteredcode } = req.body;
    const user = await User.findOne({
        verificationToken: enteredcode,
        verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400).json("Invalid Verification Code")
        return
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save()

    await sendWelcomeEmail(user.email, user.name)

    res.status(200).json({
        success: true,
        user: {
            ...user._doc,
            password: null
        }
    })

}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("got a login request")
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
            
        }

        const isValidPassword = await bcryptjs.compare(password, user.password)

        if (!isValidPassword) {
            console.log("Invalid Password from the user")
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        generateTokenAndSetCookie(res, user._id)

        user.lastlogin = Date.now()
        await user.save()
        console.log("User logged in succesfully",user.email)

        res.status(200).json(
            {
                success: true,
                message: "Logged in Succesfully",
                user:{
                    ...user._doc,
                    password:null
                }
            }
        )


    } catch (error) {
        console.log("Error logging in",error.message)
        res.status(400).json({message:"error loggin in"})

    }
}


export const logout = async (req, res) => {
    // for logout function we just have to clear the cookie we set so the user becomes anauthenicated 
    res.clearCookie("token")
    res.status(200).json({ message: "Succesfully Logged Out" })
}


export const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({ success:false, message:"No User found for the  email, signup first"})
        } 

        const token=crypto.randomBytes(20).toString('hex')

        user.resetPasswordToken= token;
        user.resetPasswordExpiresAt = Date.now() + 1*60*60*1000  // 1 hour

        await user.save()

        await sendforgotPasswordMail(email,`${process.env.CLIENT_URL}/reset-password/${token}`)
        console.log(`${process.env.CLIENT_URL}/reset-password/${token}`)
        res.status(200).json({success:true, message:"Reset Password mail sent succesfully"})

    } catch (error) {
        res.status(400).json({success:false, message:"Error Sending Password Reset Mail"})
        
    }
}


export const resetPassword = async (req,res)=>{
    const {newpassword}=req.body;
    // destructuring works only when names match
    const {token}=req.params
    console.log(token,newpassword)
    try {
        const user=await User.findOne({resetPasswordToken:token,resetPasswordExpiresAt: { $gt: Date.now() }})
        if(!user){
           return res.status(400).json({success:false,message:"Invalid Request"})
        }

        const hashedPassword = await bcryptjs.hash(newpassword, 10)
        user.password=hashedPassword
        // after reseting password remove fields related to resetting password 
        user.resetPasswordToken= undefined;
        user.resetPasswordExpiresAt = undefined ; 


        await user.save()
        console.log("Password changed")

        await sendResetPasswordMail(user.email)
        
        res.status(200).json({success:true,message:"password updated succesfully"})

    } catch (error) {
        console.log("Error while Reseting password",error.message)
        res.status(400).json({success:false,message:"Error Resetting password"})
    }
}



export const checkauth=async (req,res)=>{
    const user_id=req.user_id
    try {
        const user=await User.findById(user_id).select("-password")
        if(!user){
            console.log("Invalid User")
            return res.status(400).json({success:false,message:"Unauthorized Invalid User "})
        }
        res.status(200).json({success:true,user,message:"Authorized User"})

    } catch (error) {
        console.log("Error in checkauth")
        res.status(401).json({success:false, message:error.message})
    }
}