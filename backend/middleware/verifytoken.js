import jwt from "jsonwebtoken"


export const verifytoken= async (req,res,next)=>{
    const token=req.cookies.token // cookieparser middleware needs to added in index.js to parse incoming cookie 
    if(!token){
        console.log("No token found")
       return res.status(401).json({success:false,message:"Unauthorized : No Token to verify"})
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)

        if(!decode){
            res.status(401).json({success:false,message:"Unauthorized : No Token to verify"})
        }
        req.user_id=decode.user_id  // contains encoded userid
        console.log("Valid token with userid",req.user_id)
        next()
        
    } catch (error) {
        console.log("Error verifying token")
        res.status(401).json({success:false,message:"Error verifying token"})
        
    }
}