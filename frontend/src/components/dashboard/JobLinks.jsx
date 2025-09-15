import React, { useState } from 'react'
import { data } from '../../utils/data'

function JobLinks() {

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className=' w-full mb-7 text-2xl xl:text-4xl font-bold text-slate-800'>Dashboard</div>
      <div className=' w-full overflow-x-auto overflow-y-hidden flex gap-7'>
        {
          data.map((user, index) => (
            <div className='bg-white border-[1.5px] border-purple-400 w-[32%] flex-none overflow-scroll flex flex-col p-5 pb-10 rounded-3xl'>
              <div className='mb-5 h-12 w-full flex justify-between items-center'>
                <div className=' text-lg xl:text-2xl font-semibold capitalize'>{user.username === 'Shreya' ? 'Your' : `${user.username}'s`} list</div>
                {user.username === 'Shreya' ? 
                <button className=' text-base xl:text-xl font-semibold rounded-lg px-4 py-2 bg-[#8ad4ed]'>Add Job</button> 
                : ''}
                
              </div>
              <div className='w-full overflow-y-auto flex flex-col gap-3'>
                {
                  user.joblinks_set.map((job, jobIndex) => (
                    <a href={job.job_link} target='_blank'><div className='w-full text-lg xl:text-2xl p-3 border-[1.5px] border-slate-200 bg-slate-100 overflow-x-hidden'>{job.job_link.slice(0, 37)}...</div></a>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default JobLinks
