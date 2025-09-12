import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from "framer-motion";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //     console.log(user);
  //   }
  // }, []);

  const signOut = async () => {
    await logout();
    navigate("/");
  }
  return (
    <div className='text-5xl'>
      Dashboard
      <button onClick={signOut}>Log out</button>
    </div>
  )
}

export default Dashboard
