import React, { useState, useEffect } from 'react'
import { people } from '../../utils/data'
import { FaUserCircle } from "react-icons/fa";
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import axios from "axios";

function People() {
  const [people, setPeople] = useState(null);

  //GET ALL PEOPLE
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const userId = currentUser.uid;
    console.log(userId);
    let response;
    axios.get(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}/people/`)
      .then(res => {
        response = res.data;
        console.log(response.all_users);
        setPeople(response.all_users
          .filter((user) => user.relation.toLowerCase() === 'none'));
      }).catch(err => { })
  }, []);

  const [sentRequests, setSentRequests] = useState([]);
  const sendFriendRequest = (id) => {
    console.log("Sending to ", id)

    //ADD FEATURE - when error "request already sent to user, display error" 
    //Response({"error": "Friend request already exists"}, status=status.HTTP_400_BAD_REQUEST)
    // -- profile on load --> each user with status (friend, pending, "")
    //on clicking "send request" --> that particular user is returned with updates status


    // //API call to send request
    const currentUser = JSON.parse(localStorage.getItem('current-user'));
    const userId = currentUser.uid;
    console.log("Sending from", userId);
    let response;
    axios.post(`https://lc2tbvxv-8000.inc1.devtunnels.ms/user/${userId}/people/`, {
      "user2": id
    })
      .then(res => {
        response = res.data;
        console.log(response);
        const peopleLeft = people
  .filter((user) => user.id !== id);
        setPeople(peopleLeft);
      }).catch(err => {
        if (err.status === 400) {
          console.log("Request has already been sent")
        }
      })


    if (!sentRequests.includes(id)) {
      setSentRequests([...sentRequests, id]);
    }
  };


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
          results.push(user)
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
        people?.length > 0 ? (
          <div className=' w-full h-full pb-2 overflow-y-auto grid grid-cols-4 auto-rows-min gap-7'>
            {
              searchQuery === ''
                ? people.map((user, index) => (
                  (<div key={user.id} className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                    <div className=' h-full w-full flex flex-col justify-between items-center'>
                      <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                      <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.username}</div>
                      <motion.button onClick={() => sendFriendRequest(user.id)} whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} className={`text-base xl:text-xl font-semibold rounded-lg px-4 py-2 ${sentRequests.includes(user.id) ? 'bg-red-500' : 'bg-[#8ad4ed]'} `}>{sentRequests.includes(user.id) ? 'Sent' : 'Send Friend Request'}</motion.button>
                    </div>
                  </div>)

                ))
                :
                (searchResults.map((user, index) => (
                  <>
                    {
                      (<div key={user.id} className='bg-white w-full h-full p-10 rounded-3xl shadow-md shadow-slate-400'>
                        <div className=' h-full w-full flex flex-col justify-between items-center'>
                          <div className='mb-2 w-1/4'><FaUserCircle className='h-full w-full' /></div>
                          <div className=' mb-8 text-lg xl:text-2xl text-center font-semibold capitalize'>{user.username}</div>
                          <motion.button onClick={() => sendFriendRequest(user.id)} whilehover={{ scale: 1.05 }} whiletap={{ scale: 1.02 }} className={`text-base xl:text-xl font-semibold rounded-lg px-4 py-2 ${sentRequests.includes(user.id) ? 'bg-red-500' : 'bg-[#8ad4ed]'}`}>{sentRequests.includes(user.id) ? 'Sent' : 'Send Friend Request'}</motion.button>
                        </div>
                      </div>)

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
