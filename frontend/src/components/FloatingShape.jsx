import {motion} from "framer-motion" 
const FloatingShape = ({color,size,top,left,delay}) => {
  return (
    <motion.div
    className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl `}
    style={{top,left}}
    animate={{
        x: ["0%","100%","0%"],
        y: ["0%","100%","0%"],
        rotate:[0,360]
    }}
    transition={{
        duration:20,
        ease:"linear",
        repeat:Infinity,
        delay
    }}

    aria-hidden='true'  // so that this is not accesible by screen readers

    >Floating Shape</motion.div>
  )
}



export default FloatingShape

// x: ["0%", "100%", "0%"] → moves from 0% to right edge and back

// y: ["0%", "50%", "0%"] → moves down 50% and back

// rotate: [0, 360] → rotates fully in a circle

// transition:

// duration: 2 seconds

// repeat: Infinity = loop forever

// ease: animation curve