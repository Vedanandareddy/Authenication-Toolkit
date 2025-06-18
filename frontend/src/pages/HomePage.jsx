import React from 'react'
import { motion } from "framer-motion"
import { useAuthStore } from '../store/authStore.js'

const HomePage = () => {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex-col items-center p-8 " >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
        Dashboard
      </h2>
      <div className='space-y-6'>
        <motion.div
          className='p-4  bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >	<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
          <p className='text-gray-300'>Name: {user.name}</p>
          <p className='text-gray-300'>Email: {user.email}</p>
        </motion.div>
      </div>
      <div className='mt-2'>
        <motion.div
          className='p-4  bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >						<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
          <p className='text-gray-300'>
            <span className='font-bold'>Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className='text-gray-300'>
            <span className='font-bold'>Last Login: </span>
            {new Date(user.lastlogin).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
        >
          Logout
        </motion.button>
      </motion.div>

    </motion.div>
  )
}

export default HomePage
