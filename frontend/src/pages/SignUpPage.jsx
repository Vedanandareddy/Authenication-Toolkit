import { useState } from 'react'
import { motion, scale } from "framer-motion"
import Input from '../components/Input'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { Mail, User, Lock, LoaderIcon } from "lucide-react"
import {Link,useNavigate} from "react-router"
import { useAuthStore } from '../store/authStore.js'


const SignUpPage = () => {
    const [name, setname] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const {signup,isLoading,error}=useAuthStore()
    const navigate=useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
        console.log("Signing Up")
        const success=await signup(mail,password,name)
        if(success){
            navigate("/verify-email")
        }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden  " >
            <div className='p-8'>
                <h2 className=' mb-6 text-2xl  text-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent  '>Create Account </h2>

                <form onSubmit={handleSignUp}>
                    <Input icon={User} type="text" value={name} placeholder="Full Name" onChange={(e) => { setname(e.target.value) }} />

                    <Input icon={Mail} type="email" value={mail} placeholder="Email Adress" onChange={(e) => { setMail(e.target.value) }} />

                    <Input icon={Lock} type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />

                    <PasswordStrengthMeter password={password}/>
                    {error}
                    <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.9 }}
                        type='submit'
                    >{isLoading?<div className='w-full flex justify-center items-center'><LoaderIcon className='size-6 animate-spin '/></div>:"Signup"} </motion.button>
                </form>

            </div>
            <div className='px-8 py-4 bg-gray-900 opacity-50 flex  justify-center '>
                <p className='text-sm text-gray-400'>
                    Already have an account?{"  "}
                    <Link to="/login" className='hover:underline text-green-500'>login</Link>
                </p>
            </div>



        </motion.div>
    )
}

export default SignUpPage
