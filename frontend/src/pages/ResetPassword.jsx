import { useState } from 'react'
import { ArrowLeft, Lock } from 'lucide-react';
import { motion } from "framer-motion"
import Input from '../components/Input';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuthStore } from '../store/authStore';

const ResetPassword = () => {
    const { isLoading, resetpassword } = useAuthStore()
    const [firstpassword, setfirstpassword] = useState("")
    const [secondpassword, setsecondpassword] = useState("")
    const [submitted, setsubmitted] = useState(false)
    const {token}= useParams()  // get token from url params
    const navigate=useNavigate()

    const onSubmitPassword = async (e) => {
        e.preventDefault()
        if(firstpassword!=secondpassword){
            alert("Password do not match")
            return 
        }
        await resetpassword(firstpassword,token)
        navigate("/login")

    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden  " >
            <div className='p-8'>
                <h2 className=' mb-6 text-2xl  text-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent  '>Reset Password </h2>

                {submitted && (
                    <div className='flex-col justify-center items-center'>
                        <Mail className='w-full text-green-500 size-14 text-center' />
                        <p className='p-1 text-white text-center '>If an account exists for you will receive a  reset link shortly</p>
                    </div>
                )}

                {!submitted && (<>

                    {/* <p className=' text-sm p-3 mb-2 text-white text-center '>Enter your email adress and we will send you a link to reset you password </p> */}

                    <form onSubmit={onSubmitPassword}>

                        <Input icon={Lock} type="password" value={firstpassword} placeholder="New Password" onChange={(e) => { setfirstpassword(e.target.value) }} />

                        <Input icon={Lock} type="password" value={secondpassword} placeholder="Confirm Password" onChange={(e) => { setsecondpassword(e.target.value) }} />


                        <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.9 }}
                            type='submit'
                        >Set New Password </motion.button>
                    </form>
                </>)}
            </div>


            {/* <div className='px-8 py-4 bg-gray-900 opacity-50 flex justify-center '>
                <p className='text-lg font-bold text-gray-400 flex'>
                    <Link to="/login" className='hover:underline text-green-500 flex justify-center items-center'><ArrowLeft className='size-8 font-bold p-2 ' />{"  "}Back to login </Link>

                </p>
            </div> */}
        </motion.div>
    )
}

export default ResetPassword
