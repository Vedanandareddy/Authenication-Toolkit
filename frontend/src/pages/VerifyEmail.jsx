import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { LoaderIcon } from "lucide-react";

const VerifyEmail = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const {verifymail,isLoading,error}=useAuthStore()
    const navigate = useNavigate();


    const handleChange = (index, value) => {
        const newCode = [...code]; // get current code 

        // Handle pasted content
        if (value.length>1) {
            if(value.length!=6){
                return
            }
            const pastedCode = value.slice(0, 6).split("");   // slice used to get a portion of array or string without changing it (startindex,lastindex) 
            //  split seperates a string based on given seperator and turns them into an array
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");  // gets lastindex the given function return true
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;   // focuses on next unfilled index if last index filled is not 5 which makes it completely filled
            inputRefs.current[focusIndex].focus(); // focuses on the unfilled index or lastindex
        } else {
            if(index==5){
                if(code[5] && value){
                    return
                }
            }
            newCode[index] = value;
            setCode(newCode);  // update the changed value

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus(); // shifts focus if a value is entered
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // check if its backspace and the input index is empty so we focus on before element where backspace is executed 
            inputRefs.current[index - 1].focus();
        }
    };


// submit function automatically refreshes the page , this prevents that
// This stops the page from reloading when the form is submitted.
// Prevents default browser behavior like form submission to a new URL.


    const handleSubmit = async (e) => {
        e.preventDefault();    
        const verificationCode = code.join(""); // converts array of characters to a string 
        console.log(verificationCode)
        try {
           const success= await verifymail(verificationCode)
           if(success){
            navigate("/login")
           }
        } catch (error) {
            console.log(error.message)
        }
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        // if (code.every((digit) => digit !== "")) {
        //     handleSubmit(new Event("submit"));
        // }
    }, [code]);

    return (
        <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >

                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                // onChange :After the input value changes    onKeyDown:Immediately when a key is pressed before the action
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                            />
                        ))}
                    </div>


                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={code.some((digit) => !digit)}
                        className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
                    >
                       {isLoading?<div className='w-full flex justify-center items-center'><LoaderIcon className='size-6 animate-spin '/></div>:"Verify Email"} 
                    </motion.button>

                </form>
            </motion.div>
        </div>
    );
};
export default VerifyEmail;