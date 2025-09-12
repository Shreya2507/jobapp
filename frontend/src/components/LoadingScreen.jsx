import React from 'react'
import { motion } from 'framer-motion'

function LoadingScreen() {
    return (
        <div className="w-screen h-screen bg-gradient-to-b from-[#7f49e2]/20 to-white font-inter-tight">
            <div className="w-full h-full flex gap-4 flex-col justify-center items-center">

                {/* Logo with smooth bounce animation */}
                <motion.img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-28"
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="text-5xl text-[#7f49e2] font-semibold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Loading...
                </motion.div>
            </div>
        </div>
    )
}

export default LoadingScreen
