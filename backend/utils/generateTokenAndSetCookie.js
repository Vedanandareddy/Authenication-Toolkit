import jwt from "jsonwebtoken";

const generateTokenAndSetCookie= (res,user_id)=>{
    // jwt sign method is used to create tokens 
    // jwt.sign(payload,secret, options)
    const token=jwt.sign({user_id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    // In Express.js, res.cookie() is used to set a cookie in the user's browser from the server-side.
    // res.cookie(name, value, options)
    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });


    return token 
}


export default generateTokenAndSetCookie