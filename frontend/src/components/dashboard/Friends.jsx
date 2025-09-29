import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import axios from "axios";

function Friends() {
  const [friends, setFriends] = useState();
  const current = JSON.parse(localStorage.getItem('current-user'));
  
  // const people = useState();
  useEffect(() => {
    //API call to fetch all friends
    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const userId = currentUser.uid;
    console.log(userId);
    let response;
    axios.get(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}/friends/`)
      .then(res => {
        response = res.data;
        console.log(response);
        setFriends(response);
      }).catch(err => { })
  }, []);

  const acceptRequest = (friendId) => {
    console.log(friendId)
    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const userId = currentUser.uid;
    // console.log(userId);
    let response;
    axios.post(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}/friends/`, {
      "user2": friendId
    })
      .then(res => {
        response = res.data;
        console.log(response);
        console.log("Accepted");
        //CHANGE UI 

      }).catch(err => { })
  }

  //to-user mei mai hu (current user's firebaseId) ----> accept or ignore invitation

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const results = [];
      friends?.forEach((user, userIndex) => {
        if (user.friend_username.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            ...user,
            id: userIndex,
            username: user.friend_username,
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

      <div className='text-2xl xl:text-4xl font-bold text-slate-800'>Friends</div>


      <div className='mb-2 text-2xl font-bold text-slate-800'>Pending Requests</div>
      <div className='mb-7 pb-5 w-full h-full overflow-y-auto grid grid-cols-4 auto-rows-min gap-5'>
        {
          friends
            ?.filter(user => (user.status === 'pending'))
            .map((user, index) => (
              (<div className='bg-white w-full h-full py-10 px-8 rounded-3xl shadow-md shadow-slate-400'>
                <div className=' h-full w-full flex flex-col justify-between items-center'>
                  <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                  <div className='text-lg xl:text-2xl text-center font-semibold capitalize'>{user.friend_username}</div>
                  <motion.button className={` mt-5 text-base xl:text-xl font-semibold rounded-lg px-4 py-2 text-white ${user.friendship_sent_or_received === 'Sent' ? '' : 'hidden'} bg-gray-400 cursor-not-allowed`}>Request Sent</motion.button>
                  <motion.button onClick={() => acceptRequest(user.friend_id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className={` mt-5 text-base xl:text-xl font-semibold rounded-lg px-4 py-2 text-white bg-orange-500 ${user.friendship_sent_or_received === 'Sent' ? ' hidden' : ''}`}>Click to Accept</motion.button>
                </div>
              </div>)
            ))
        }
      </div>

      {/* <div className='mt-7 text-2xl font-bold text-slate-800'>Requests Received</div>
      <div className='mt-2 w-full h-full overflow-y-auto grid grid-cols-4 auto-rows-min gap-5'>
        {
          friends
            ?.filter(user => (user.status === 'pending' && user.friendship_sent_or_received === 'Received'))
            .map((user, index) => (

              (<div className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                <div className=' h-full w-full flex flex-col justify-between items-center'>
                  <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                  <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.friend_username}</div>
                  <motion.button onClick={() => acceptRequest(user.user1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className={` text-base xl:text-xl font-semibold rounded-lg px-4 py-2 text-white ${user.status === 'pending' ? 'bg-orange-500' : 'bg-blue-300'}`}>{user.status === 'pending' ? 'Click to accept request' : 'Accepted'}</motion.button>
                </div>
              </div>)
            ))}
      </div> */}

      <div className=' h-16 w-full mb-7 flex justify-between items-center'>
        <div className='mb-2 text-2xl font-bold text-slate-800'>Friends</div>
        <div className='relative h-full w-1/2'>
          <input className=' h-full w-full rounded-full px-14 outline-none focus:border-[1.5px] focus:border-purple-400 text-xl shadow-lg shadow-slate-300 transition-all ease-in-out' type="text" placeholder='Search' value={searchQuery} onChange={handleSearchChange} /><CiSearch className='absolute top-0 left-4 h-full w-7' />
        </div>
      </div>
      {
        friends?.length > 0 ? (
          <div className=' w-full h-full pb-2 overflow-y-auto grid grid-cols-4 auto-rows-min gap-7'>
            {
              searchQuery === ''
                ? friends.map((user, index) => (
                  user.status === 'accepted' ?
                    (<div className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                      <div className=' h-full w-full flex flex-col justify-between items-center'>
                        <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                        <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.friend_username}</div>
                      </div>
                    </div>)
                    : ''
                ))
                :
                (searchResults.map((user, index) => (


                  <div className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                    <div className=' h-full w-full flex flex-col justify-between items-center'>
                      <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                      <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.friend_username}</div>
                    </div>
                  </div>


                )))
            }
          </div>

        )
          : <div className='text-lg w-full h-full flex flex-col justify-center gap-5 items-center xl:text-2xl text-center font-semibold capitalize'>
            <img src="/gifs/alone.gif" alt="" />
            No job search buddies yet! <br />Add some friends to follow their job search journey!! 🎉
          </div>
      }

    </div>
  )
}

export default Friends
