import React, { useState } from 'react'
import { RiDashboardFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import {motion} from 'framer-motion';

function Navbar({selectedLink, setSelectedLink}) {
    
    const navLinkClicked = (index) => {
        setSelectedLink(index);
    }

    const navLinks = [
        { name: "Dashboard", icon: <RiDashboardFill className='w-full h-full' /> },
        { name: "Friends", icon: <FaUserFriends className='w-full h-5/6 mt-1' /> },
        { name: "People", icon: <PiUsersThreeFill className='w-full h-full' /> },
        { name: "Settings", icon: <IoMdSettings className='w-full h-full' /> }
    ];
    
    return (
        <div className='w-1/4 xl:w-1/6 h-full px-3 xl:px-5 py-10 flex flex-col gap-16'>
            <div className='w-full h-16 flex items-center justify-start pl-5 gap-2'>
                <img className='h-4/6 xl:h-5/6' src="/images/logo.png" alt="logo" />
                <div className=' font-semibold text-xl xl:text-2xl'>JobTracker</div>
            </div>

            <div className='w-full h-fit flex flex-col gap-10 justify-between items-center'>
                {
                    navLinks.map((link, index) => (
                        <motion.div whileTap={{ scale: 1.05 }} onClick={() => navLinkClicked(index)} className={`${selectedLink === index ? 'bg-purple-400 text-white shadow-lg shadow-purple-300' : 'bg-transparent hover:bg-slate-200'} cursor-pointer w-full h-16 pl-4 text-2xl gap-1 xl:gap-2 flex justify-center items-center font-semibold rounded-full transition-all ease-in-out`}>
                            <div className='h-1/3 w-1/3 xl:h-1/2 xl:w-1/4 transition-all ease-out'>{link.icon}</div>
                            <div className={`text-base xl:text-2xl w-3/4 ${selectedLink === index ? 'text-white' : ''}`}>{link.name}</div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default Navbar
