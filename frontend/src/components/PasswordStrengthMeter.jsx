import { Check, Cross, X } from 'lucide-react'
import React from 'react'


const passwordpower=(password)=>{
    let strength=0;
    if(password.length>=6) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if( /[a-z]/.test(password)) strength++;
    if(/\d/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;
    return strength
}

const passwordstrength=(password)=>{
    const power=passwordpower(password)
    if(power<1) return "Very Weak";
    if(power<=2) return "Weak"
    if(power<=3) return "Fair"
    if(power<=4) return "Good"
    return "Strong"
}


const getColor = (strength) => {
  if (strength == 1) return "bg-red-500";
  if (strength === 2) return "bg-red-400";
  if (strength === 3) return "bg-yellow-500";
  if (strength === 4) return "bg-yellow-400";
  return "bg-green-500";
};


const PasswordCriteria=({password})=>{
    const criterias=[
        {label:"Atleast 6 characters" ,met: password.length>=6},
        {label:"Contains an Uppercase Letter", met: /[A-Z]/.test(password) },
        {label:"Contains a Lowercase Letter", met: /[a-z]/.test(password) },
        {label:"Contains a number", met: /\d/.test(password) },
        {label:"Contains a special character", met: /[^A-Za-z0-9]/.test(password) }
    ]

    return (
        <div className='mt-2 space-y-1 p-3'>
            {criterias.map((item,index)=>(
                <div key={item.label} className='flex items-center text-sm'>
                {item.met? 
                    <Check className='size-4 text-green-500 mr-2' />  
                    : <X className='size-4 text-red-400 mr-2' />  
                }
                <div className={item.met? "text-green-500":"text-gray-300"} >{item.label}</div>
                </div>
            ))}
        </div>
    )
}

const PasswordStrengthCheck=({password})=>(
    <div>
    <div className='mt-2 p-4 text-gray-300 flex justify-between text-sm'>
        <span>Password Strength</span>
        <span>{passwordstrength(password)}</span>
    </div>
    <div className='flex space-x-1'>
        {[...Array(4)].map((_,index)=>(
            <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index<(passwordpower(password)-1)?getColor(passwordpower(password)):"bg-gray-600"}`}></div>
        ))}
    </div>
    </div>

)


const PasswordStrengthMeter = ({password}) => {
  return (<div>
      <PasswordStrengthCheck password={password} />
      <PasswordCriteria password={password} />
  </div>
  )
}

export default PasswordStrengthMeter
