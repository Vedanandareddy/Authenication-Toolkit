import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastlogin:{
        type:Date,
        default:Date.now()
    },
    isVerified:{
        type:Boolean,
        default:false
    },// if multiple fields are present then brackets are added, if only type is needed to be specified it can be done directly
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt:Date,
},{timestamps:true})


export const User=mongoose.model("User",UserSchema)