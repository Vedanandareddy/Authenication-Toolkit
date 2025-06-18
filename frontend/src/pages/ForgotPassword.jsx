import {useState} from 'react'
import { ArrowLeft,Mail } from 'lucide-react';
import {motion} from "framer-motion"
import Input from '../components/Input';
import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore';

const ForgotPassword = () => {
    const {forgotpassword}=useAuthStore()
    const [mail, setmail] = useState("")
    const [submitted, setsubmitted] = useState(false)

    const onSubmittingMail = async (e) => {
        e.preventDefault()// prevents from refreshing the page after submit button is clicked
        if(!mail){
            return
        }
        try {
        setsubmitted(true)
        await forgotpassword(mail)
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
                <h2 className=' mb-6 text-2xl  text-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent  '>Forgot Password </h2>


                {submitted && (
                    <div className='flex-col justify-center items-center'>
                    <Mail  className='w-full text-green-500 size-14 text-center' />
                     <p className='p-1 text-white text-center '>If an account exists for  {mail.trim()} you will receive a  reset link shortly</p>
                     </div>
                )}

                {!submitted && (<>

                <p className=' text-sm p-3 mb-2 text-white text-center '>Enter your email adress and we will send you a link to reset you password </p>

                <form onSubmit={onSubmittingMail}>

                    <Input icon={Mail} type="email" value={mail} placeholder="Email Adress" onChange={(e) => { setmail(e.target.value) }} />



                    <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.9 }}
                        type='submit'
                    > Send Reset Link </motion.button>
                </form>
</>)}
            </div>


            <div className='px-8 py-4 bg-gray-900 opacity-50 flex justify-center '>
                <p className='text-lg font-bold text-gray-400 flex'>
                    <Link to="/login" className='hover:underline text-green-500 flex justify-center items-center'><ArrowLeft className='size-8 font-bold p-2 ' />{"  "}Back to login </Link>
                                        
                </p>
            </div>
        </motion.div>
    )
}

export default ForgotPassword
