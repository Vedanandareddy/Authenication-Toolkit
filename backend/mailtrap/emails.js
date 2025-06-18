import {mailtrapclient,sender} from "./mailtrap.config.js"
import {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,WELCOME_EMAIL_TEMPLATE} from "./emailTemplates.js"


export const sendVerificationEmail =async (email,verificationToken)=>{
    const recipients=[{email}]  // it contains array of objects of email
    try {
        const response=mailtrapclient.send({
        from: sender,
        to: recipients,
        subject: "Verify Your Account",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category: "Verification Email",
        })
        console.log("Email sent succesfully")
    } catch (error) {
        console.log("Error sending email")
    }
}


export const sendWelcomeEmail=async (email,name)=>{
    const recipients=[{email}]
    try {

        const response=await mailtrapclient.send({
        from: sender,
        to: recipients,
        subject: "Welcome to our Company",     
        html:WELCOME_EMAIL_TEMPLATE.replace("{Name}",name),
        category: "Welcome  Email",
        })
        console.log("Welcome  Email Sent Succesfully", response)
 
    } catch (error) {
        console.log("Error sending Welcome Mail",error.message)
        
    }
}



export const sendforgotPasswordMail=async (email,reseturl)=>{
    const recipients=[{email}]  // it contains array of objects of email
    try {
        const response=mailtrapclient.send({
        from: sender,
        to: recipients,
        subject: "Reset  Your Password",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",reseturl),
        category: "Password Reset  Email",
        })
        console.log("Email sent succesfully")
    } catch (error) {
        console.log("Error sending email",error.message)
    }
}


export const sendResetPasswordMail=async (email)=>{
    const recipients=[{email}]  // it contains array of objects of email
    try {
        const response=mailtrapclient.send({
        from: sender,
        to: recipients,
        subject: "Password Reset Succesfull",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset Success Mail",
        })
        console.log("Email sent succesfully")
    } catch (error) {
        console.log("Error sending email",error.message)
    }
}