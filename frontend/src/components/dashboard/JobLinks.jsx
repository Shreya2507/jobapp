import React, { useEffect, useState } from 'react'
import { data } from '../../utils/data'
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";

import { motion } from 'framer-motion'


function JobLinks() {

  const current = JSON.parse(localStorage.getItem('current-user'));
  const [currentBackendId, setCurrentBackendId] = useState();
  const [data, setData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState([false, null]);
  const [updateModalOpen, setUpdateModalOpen] = useState([false, null]);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);


  //add job - 
  const addJob = () => {
    console.log("Sending link ", link, " with id ", currentBackendId);
    let response;
    axios.post(`https://lc2tbvxv-8000.inc1.devtunnels.ms/joblinks/`,
      {
        "user": currentBackendId,
        "job_link": link
      })
      .then(res => {
      }).catch(err => { })
    setModalOpen(false);
    setLink('');
  };

  const fetchUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const userId = currentUser.uid;
    let response;
    axios.get(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}`)
      .then(res => {
        response = res.data;
        console.log(response);
        setCurrentBackendId(response.id);
        setData(response);
        setLoading(false);
      }).catch(err => { })
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   fetchUserData();
  // }, [modalOpen, deleteModalOpen, updateModalOpen]);

  const openUpdateModal = (id) => {
    setUpdateModalOpen([true, id]);
  }
  const updateJob = () => {
    const jobId = updateModalOpen[1];
    axios.patch(`https://lc2tbvxv-8000.inc1.devtunnels.ms/joblinks/${jobId}`,
      {
        "job_link": link
      }
    )
      .then(res => {
        console.log("Updated");
      }).catch(err => { })
    setUpdateModalOpen([false, null]);
    setLink('');
  }

  const openDeleteModal = (id) => {
    setDeleteModalOpen([true, id]);
  }
  const deleteJob = () => {
    const jobId = deleteModalOpen[1];
    axios.delete(`https://lc2tbvxv-8000.inc1.devtunnels.ms/joblinks/${jobId}`)
      .then(res => {
        console.log("Deleted");
      }).catch(err => { })

    setDeleteModalOpen([false, null]);
  }


  return (
    loading ?
      <div className='w-full h-full flex flex-col justify-between'>
        <div className=' w-full mb-7 text-2xl xl:text-4xl font-bold text-slate-800'>Dashboard</div>
        <div className=' w-full h-full overflow-x-auto overflow-y-hidden flex items-start gap-7'>
          <div className='bg-white border-[1.5px] border-purple-400 w-[32%] flex-none overflow-scroll flex flex-col p-5 pb-10 rounded-3xl'>
            <div className='mb-5 h-12 w-full flex justify-between items-center'>
              <div className=' text-lg xl:text-2xl font-semibold capitalize'>Your list</div>
              <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} className=' text-base xl:text-xl font-semibold rounded-lg px-4 py-2 bg-[#8ad4ed]'>Add Job</motion.button>
            </div>
            <div className='w-full overflow-y-auto flex flex-col gap-3'>
              <div className='w-full text-lg xl:text-2xl p-3 border-[1.5px] border-slate-200 bg-slate-100 overflow-x-hidden'>...</div>
            </div>
          </div>
        </div>
      </div>
      :
      <>
        {
          modalOpen &&
          <>
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full'></div>

            <div className=" add-job-modal py-10 px-7 absolute top-[28%] bottom-[28%] left-1/3 right-1/3 rounded-2xl bg-white" >
              <div className='w-full mb-5 text-2xl text-center font-bold text-slate-800'>Add Job</div>
              <textarea name="link" value={link} onChange={(e) => setLink(e.target.value)} className='mb-7 w-full text-xl p-5 border-2 border-black rounded focus:outline-purple-400 transition-all ease-in-out' placeholder='Paste link here ...' rows={5}></textarea>
              <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={addJob} className='w-full h-12 text-xl font-medium bg-purple-400 text-slate-800 rounded-md'>SUBMIT</motion.button>
              <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={() => setModalOpen(false)} className='absolute top-3 right-3 w-8 h-8 hover:text-red-600 transition-all ease-in-out'><IoCloseCircleOutline className='w-full h-full' /></motion.button>
            </div>
          </>
        }
        {
          updateModalOpen[0] &&
          <>
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full'></div>

            <div className=" add-job-modal py-10 px-7 absolute top-[28%] bottom-[28%] left-1/3 right-1/3 rounded-2xl bg-white" >
              <div className='w-full mb-5 text-2xl text-center font-bold text-slate-800'>Update Job</div>
              <textarea name="link" value={link} onChange={(e) => setLink(e.target.value)} className='mb-7 w-full text-xl p-5 border-2 border-black rounded focus:outline-purple-400 transition-all ease-in-out' placeholder='Paste link here ...' rows={5}></textarea>
              <motion.button whilehover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={updateJob} className='w-full h-12 text-xl font-medium bg-purple-400 text-slate-800 rounded-md'>SUBMIT</motion.button>
              <motion.button whilehover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => setUpdateModalOpen([false, null])} className='absolute top-3 right-3 w-8 h-8 hover:text-red-600 transition-all ease-in-out'><IoCloseCircleOutline className='w-full h-full' /></motion.button>
            </div>
          </>
        }
        {
          deleteModalOpen[0] &&
          <>
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full'></div>

            <div className=" add-job-modal flex flex-col justify-center items-center py-10 px-7 absolute top-[30%] bottom-[30%] left-1/3 right-1/3 rounded-2xl bg-white" >
              <div className='w-full mb-10 text-2xl text-center font-bold text-slate-800'>Are you sure you want to delete this job ?</div>
              <div className='w-full flex justify-between gap-10 items-center'>
                <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={() => setModalOpen(false)} className='w-full h-12 text-xl font-medium bg-purple-400 text-slate-800 rounded-md'>CANCEL</motion.button>
                <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={deleteJob} className='w-full h-12 text-xl font-medium bg-purple-400 text-slate-800 rounded-md'>YES</motion.button>
              </div>
              <motion.button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={() => setDeleteModalOpen([false, null])} className='absolute top-3 right-3 w-8 h-8 hover:text-red-600 transition-all ease-in-out'><IoCloseCircleOutline className='w-full h-full' /></motion.button>
            </div>
          </>
        }


        <div className='w-full h-full flex flex-col justify-between'>
          <div className=' w-full mb-7 text-2xl xl:text-4xl font-bold text-slate-800'>Dashboard</div>
          <div className=' w-full h-full overflow-x-auto overflow-y-hidden flex items-start gap-7'>
            <div className='bg-white h-full border-[1.5px] border-purple-400 w-[32%] flex-none flex flex-col p-5 pb-10 rounded-3xl'>
              <div className='mb-5 h-12 w-full flex justify-between items-center'>
                <div className=' text-lg xl:text-2xl font-semibold capitalize'>Your list</div>
                <button whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} onClick={() => setModalOpen(true)} className=' text-base xl:text-xl font-semibold rounded-lg px-4 py-2 bg-[#8ad4ed]'>Add Job</button>
              </div>
              <div className='w-full overflow-y-auto flex flex-col gap-3'>
                {
                  data?.joblinks_set.map((job, jobIndex) => (
                    <div key={job.id} className='px-2 w-full flex justify-between items-center p-3 border-[1.5px] border-slate-200 bg-slate-100'>
                      <div className='w-8/12'><a key={job.id} href={job.job_link} target='_blank' rel="noopener noreferrer"><div className=' w-full text-lg xl:text-2xl overflow-x-hidden '>{job.job_link}</div></a></div>
                      <div className='w-fit gap-2 flex items-center justify-between text-sm text-white'>
                        <motion.button onClick={() => openUpdateModal(job.id)} whilehover={{ scale: 1.1 }} whiletap={{ scale: 1.02 }} className='p-[5px] rounded bg-yellow-600'><FaPen /></motion.button>
                        <motion.button onClick={() => openDeleteModal(job.id)} whilehover={{ scale: 1.1 }} whiletap={{ scale: 1.02 }} className='p-[5px] rounded bg-red-700'><IoTrashSharp /></motion.button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>



            {
              data?.friendlist_set.map((user, index) => (
                user.status === 'accepted' ?
                  (<div key={user.id} className='bg-white border-[1.5px] h-full border-purple-400 w-[32%] flex-none flex flex-col p-5 pb-10 rounded-3xl'>
                    <div className='mb-5 h-12 w-full flex justify-between items-center'>
                      <div className=' text-lg xl:text-2xl font-semibold capitalize'>{`${user.to_user_name}'s`} list</div>
                    </div>
                    <div className=' w-full overflow-y-auto flex flex-col gap-3'>
                      {
                        user.friend_joblinks_set.map((job, jobIndex) => (
                          <a key={job.id} href={job.job_link} target='_blank' rel="noopener noreferrer"><div className='w-full text-lg xl:text-2xl p-3 border-[1.5px] border-slate-200 bg-slate-100 overflow-x-hidden'>{job.job_link}...</div></a>
                        ))
                      }
                    </div>
                  </div>)
                  : ''
              ))
            }

          </div>
        </div>
      </>
  )
}

export default JobLinks
