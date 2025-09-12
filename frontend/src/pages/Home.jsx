import React from 'react'
import { motion } from "framer-motion";
import Marquee from '../components/Marquee';
import { FaArrowUpLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
    const goToRegister = () => {
        navigate("/register");
    }

    return (
        <div className='relative h-full w-full flex flex-col'>
            <nav className='shadow-xl h-24 px-10 py-5 w-full flex justify-between items-center'>
                <div className='h-full flex items-center gap-2'>
                    <img className='w-full h-5/6' src="/images/logo.png" alt="logo" />
                    <div className=' font-semibold text-2xl'>JobTracker</div>
                </div>

                <div className='flex gap-3'>
                    <motion.button onClick={goToLogin} whileHover={{ scale: 1.05 }} className='rounded-xl h-14 w-52 box-border bg-[#7f49e2] text-white font-semibold text-2xl hover:border-2 hover:border-[#7f49e2] hover:bg-white hover:text-[#7f49e2] hover:shadow-lg hover:shadow-slate-400 transition-all ease-in-out'>Login</motion.button>
                    <motion.button onClick={goToRegister} whileHover={{ scale: 1.05 }} className='rounded-xl h-14 w-52 box-border bg-[#7f49e2] text-white font-semibold text-2xl hover:border-2 hover:border-[#7f49e2] hover:bg-white hover:text-[#7f49e2] hover:shadow-lg hover:shadow-slate-400 transition-all ease-in-out'>Register</motion.button>
                </div>
            </nav>
            <div className='z-20 h-full w-full flex items-center gap-10'>
                <div className=' w-1/2 h-full px-10 flex flex-col justify-center items-center'>
                    <div className="textstructure mb-32 ">
                        {["Track your", "Job", "applications"].map((item, index) => {
                            return (
                                <div key={index} className="masker">
                                    <div className="w-fit flex items-center overflow-hidden">
                                        {index === 1 && (<motion.div initial={{ width: 0, height: "7.8vw" }} animate={{ width: "9vw", height: "8vw" }} transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }} className=' mr-[1vw] w-[9vw] rounded-md relative overflow-hidden bg-cover bg-center bg-[url("https://i.pinimg.com/736x/84/1a/82/841a82661e9e2bd0717df2f54752fe07.jpg")]'></motion.div>)}
                                        <div className="leading-[7vw] tracking-tight uppercase text-[6vw] font-['Inter_Tight'] font-[700] ">
                                            {item}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                        <motion.div onClick={goToLogin} whileHover={{ scale: 1.05 }} className="mt-2 flex w-fit items-center gap-1 cursor-pointer group">
                            <div className="uppercase px-7 py-[0.6rem] text-lg border-[1.5px] border-zinc-500 rounded-full group-hover:bg-[#bd8bec] transition-all ease-in-out">Get started</div>
                            <div className=" w-12 h-12 border-[1.5px] text-2xl border-zinc-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-slate-400 transition-all ease-in-out">
                                <span className='rotate-[45deg]'>
                                    <FaArrowUpLong />
                                </span>

                            </div>

                        </motion.div>
                    </div>
                </div>
                <div className=' z-10 w-1/2 mr-5 h-full flex justify-center items-center'>
                    <motion.img whileHover={{ scale: 1.02 }} className='w-full' src="/images/bg1.png" alt="bg" />
                </div>
            </div>

            <div style={{ boxShadow: '-5px -10px 20px rgba(0, 0, 0, 0.25)' }} className='absolute z-10 -right-80 bottom-0 bg-red-200 rounded-tl-full rounded-tr-full w-2/3 h-[30vw] '></div>
            <Marquee />
        </div>
    )
}

export default Home
