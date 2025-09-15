import React, { useState } from 'react'
import { people } from '../../utils/data'
import { FaUserCircle } from "react-icons/fa";
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";

function People() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const results = [];
      people.forEach((user, userIndex) => {
        if (user.username.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            ...user,
            id: userIndex,
            username: user.username,
          });
        }
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className=' h-16 w-full mb-7 flex justify-between items-center'>
        <div className='text-2xl xl:text-4xl font-bold text-slate-800'>People</div>
        <div className='relative h-full w-1/2'>
          <input className=' h-full w-full rounded-full px-14 outline-none focus:border-[1.5px] focus:border-purple-400 text-xl shadow-lg shadow-slate-300 transition-all ease-in-out' type="text" placeholder='Search' value={searchQuery} onChange={handleSearchChange} /><CiSearch className='absolute top-0 left-4 h-full w-7' />
        </div>
      </div>
      {
        people.length > 0 ? (
          <div className=' w-full h-full pb-2 overflow-y-auto grid grid-cols-4 auto-rows-min gap-7'>
            {
              searchQuery === ''
                ? people.map((user, index) => (
                  user.username !== 'Shreya' ?
                    (<div className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                      <div className=' h-full w-full flex flex-col justify-between items-center'>
                        <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                        <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.username}</div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className=' text-base xl:text-xl font-semibold rounded-lg px-4 py-2 bg-[#8ad4ed]'>Send Friend Request</motion.button>
                      </div>
                    </div>)
                    : ''
                ))
                :
                (searchResults.map((user, index) => (
                  <>
                    {user.username !== 'Shreya' ?
                      (<div className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                        <div className=' h-full w-full flex flex-col justify-between items-center'>
                          <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                          <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.username}</div>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className=' text-base xl:text-xl font-semibold rounded-lg px-4 py-2 bg-[#8ad4ed]'>Send Friend Request</motion.button>
                        </div>
                      </div>)
                      : ''
                    }
                  </>
                )))
            }
          </div>

        )
          : <div className='text-lg w-full h-full flex flex-col justify-center gap-5 items-center xl:text-2xl text-center font-semibold capitalize'>
            <img src="/gifs/alone.gif" alt="" />
            Hmm, nobody's here yet...<br />Invite some friends and track your job hunts together!! 🎉
            </div>
      }

    </div>
  )
}

export default People
