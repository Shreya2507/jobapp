import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function Settings() {
  const current = JSON.parse(localStorage.getItem('current-user'));
  const [modalOneOpen, setModalOneOpen] = useState(false);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
  const { deleteUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const permanentlyDeleteAccount = () => {
    console.log("Deleting..");
    const userId = current.uid
    
    axios.delete(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}`)
      .then(res => {
        console.log("User deleted from backend");
        deleteUser();
        setModalTwoOpen(false);
        setTimeout(() => {
          navigate("/");
        }, 1500);

      }).catch(err => { })
  }

  return (

    <div className='w-full h-full flex flex-col justify-between'>
      {
        modalOneOpen &&
        <>
          <div className='absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full'></div>

          <div className=" add-job-modal flex flex-col justify-center px-7 absolute top-[20%] bottom-[20%] left-1/3 right-1/3 rounded-2xl bg-white" >
            <div className='w-full mb-5 text-3xl text-center font-extrabold text-red-700'>WARNING !</div>
            <div className='w-full mb-5 text-2xl text-center font-bold text-slate-800 capitalize'>This is a destructive action</div>

            <div className='w-full mb-5 text-xl text-center font-bold text-slate-800'>Are you sure you want to continue ?</div>
            <div className='w-full flex justify-between gap-10 items-center'>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => {
                setModalOneOpen(false)
                setModalTwoOpen(true)
              }
              } className='w-full h-12 text-xl font-medium bg-red-800 text-white rounded-md'>YES</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => setModalOneOpen(false)} className='w-full h-12 text-xl font-medium bg-gray-400 text-white rounded-md'>NO</motion.button>
            </div>
          </div>
        </>
      }
      {
        modalTwoOpen &&
        <>
          <div className='absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full'></div>

          <div className=" add-job-modal flex flex-col justify-center px-7 absolute top-[20%] bottom-[20%] left-1/3 right-1/3 rounded-2xl bg-white" >
            <div className='w-full mb-5 text-3xl text-center font-extrabold text-red-700'>WARNING !</div>
            <div className='w-full mb-5 text-2xl text-center font-bold text-slate-800 uppercase'>This action is permanent</div>

            <div className='w-full mb-5 text-xl text-center font-bold text-slate-800'>Are you sure you want to delete your account forever ?</div>
            <div className='w-full flex justify-between gap-10 items-center'>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={permanentlyDeleteAccount} className='w-full h-12 text-xl font-medium bg-red-800 text-white rounded-md'>YES</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => setModalTwoOpen(false)} className='w-full h-12 text-xl font-medium bg-gray-400 text-white rounded-md'>NO</motion.button>
            </div>
          </div>
        </>
      }
      <div className=' w-full mb-7 text-2xl xl:text-4xl font-bold text-slate-800'>Settings</div>
      <motion.button onClick={() => setModalOneOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className=' px-10 w-fit h-16 text-lg xl:text-xl bg-red-800 text-white uppercase shadow-lg shadow-purple-300 cursor-pointer text-center font-semibold rounded-full transition-all ease-in-out'>delete account</motion.button>
    </div>
  )
}

export default Settings
