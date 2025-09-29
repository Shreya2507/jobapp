import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from "framer-motion";
import axios from 'axios';
import Navbar from '../components/dashboard/Navbar';
import Friends from '../components/dashboard/Friends';
import People from '../components/dashboard/People';
import Settings from '../components/dashboard/Settings';
import JobLinks from '../components/dashboard/JobLinks';
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";


function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState(0);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("current-user")));
  }, []);

  const signOut = async () => {
    await logout();
    navigate("/");
  }

  const renderContent = (currentLink) => {
    switch (currentLink) {
      case 0:
        return <JobLinks />;
      case 1:
        return <Friends />;
      case 2:
        return <People />;
      case 3:
        return <Settings />;
      case 'error':
        return <p>There was an error loading data.</p>;
      default:
        return null;
    }
  }


  return (
    <div className='h-full w-full flex justify-start items-center'>
      <Navbar selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
      <div className=' overflow-y-scroll w-full h-full px-10 py-5 flex flex-col items-center justify-start'>

        {/* TOP BAR */}
        <div className=' w-full h-16 mb-8 flex justify-end items-center'>
          {/* {
            (selectedLink === 1 || selectedLink === 2) ?

              <div className='relative h-full w-1/2'>
                <input className=' h-full w-full rounded-full px-14 outline-none focus:border-[1.5px] focus:border-purple-400 text-xl shadow-lg shadow-slate-300 transition-all ease-in-out' type="text" placeholder='Search' /><CiSearch className='absolute top-0 left-4 h-full w-7' />
              </div>

              : <div></div>
          } */}
          <div className=' h-full w-fit flex justify-between gap-7 items-center'>
            <div className=' w-60 h-5/6'><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={signOut} className=' w-full h-full text-lg xl:text-xl bg-purple-400 text-white uppercase shadow-lg shadow-purple-300 cursor-pointer text-center font-semibold rounded-full transition-all ease-in-out'>Logout</motion.button></div>
            <div className='w-fit h-full flex justify-end items-center'>
              <div className='w-12 h-full mr-4'><FaUserCircle className='h-full w-full' /></div>
              <div className=' capitalize font-semibold text-lg xl:text-2xl'>{currentUser ? currentUser.name : ""}</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className=' relative w-full h-full overflow-hidden p-7 xl:p-10 rounded-3xl bg-slate-200'>
          {
            renderContent(selectedLink)
          }
          {
            selectedLink === 0 ? <div className='absolute right-0 xl:right-1 bottom-1/2 h-7 w-7 xl:h-9 xl:w-9'><IoIosArrowForward className=' text-purple-400 h-full w-full' /></div> : ''
          }
        </div>

        {/* <div className=' w-full h-full flex flex-col gap-5 text-2xl'>
          <button className=' float-end text-xl px-5 py-2 border-blue-400 border-2' onClick={signOut}>Log out</button>
          {
            data?.map((object, index) => (
              <div className='border-2 bg-green-400 p-5'>
                <div><span className='font-semibold'>User : </span>{object.username}</div>
                <div className='font-semibold'>Applied to: </div>
                {object.joblinks_set.map((job, jobIndex) => {
                  return <div>{jobIndex + 1}. {job.job_link}</div>
                })
                }
              </div>
            ))
          }
        </div> */}
      </div>
    </div>

  )
}

export default Dashboard
