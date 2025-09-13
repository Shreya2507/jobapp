import React from 'react'
import {motion} from 'framer-motion';

export default function Marquee() {
  return (
    
    <div className='absolute bottom-0 z-1 w-full rounded-tl-3xl py-7 rounded-bl-3xl bg-[#8ad4ed] font-["Inter_Tight"]'>
        <div className="text border-t-2 border-b-2 border-[#377589] flex whitespace-nowrap overflow-hidden gap-10">
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{repeat:Infinity, ease: "linear", duration: 10}} className='text-[4vw] leading-none font-["Inter_Tight"] font-semibold tracking-tight uppercase pr-5'>Hassle free tracking</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{repeat:Infinity, ease: "linear", duration: 10}} className='text-[4vw] leading-none font-["Inter_Tight"] font-semibold tracking-tight uppercase pr-5'>Hassle free tracking</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{repeat:Infinity, ease: "linear", duration: 10}} className='text-[4vw] leading-none font-["Inter_Tight"] font-semibold tracking-tight uppercase pr-5'>Hassle free tracking</motion.h1>

        </div>
      
    </div>
  )
}
