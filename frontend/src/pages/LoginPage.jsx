import { useState } from 'react'
import { motion } from "framer-motion"
import Input from '../components/Input'
import { Mail, Lock ,LoaderIcon} from 'lucide-react'
import { Link, useNavigate } from "react-router"
import { useAuthStore } from '../store/authStore.js'

const LoginPage = () => {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const success=await login(mail,password)
      if(success){
        navigate("/")
      }
    } catch (error) {
      console.log("Error logging in ",error.message)
    }

  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden  " >
      <div className='p-8'>
        <h2 className=' mb-6 text-2xl  text-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent  '>Welcome Back </h2>

        <form onSubmit={handleLogin}>

          <Input icon={Mail} type="email" value={mail} placeholder="Email Adress" onChange={(e) => { setMail(e.target.value) }} />

          <Input icon={Lock} type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <div className='p-2 text-red-500'>{error}</div>

          <Link className='hover:underline text-green-500 p-2 text-sm font-semibold' to="/forgot-password">Forgot Password ?</Link>

          <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
            type='submit'
          >{isLoading?<div className='w-full flex justify-center items-center'><LoaderIcon className='size-6 animate-spin '/></div>:"Login"} </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 opacity-50 flex justify-center '>
        <p className='text-sm text-gray-400'>
          Don't have an account?{"  "}
          <Link to="/signup" className='hover:underline text-green-500'>Signup</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
