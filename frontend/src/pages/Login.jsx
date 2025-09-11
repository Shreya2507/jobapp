import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { motion } from "framer-motion";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-full w-full flex items-center justify-center font-['Inter_Tight'] bg-gradient-to-b from-[#7f49e2]/20 to-white">
            <div className="relative bg-white h-2/3 w-2/3  shadow-xl border border-gray-200">
                <div className='bg-red-200 w-full h-full flex items-center'>
                    <div className='w-1/3 h-full py-12 flex justify-center items-center'><motion.img whileHover={{ scale: 1.05 }} className='h-full' src="/images/man.png" alt="man" /></div>
                    <div className='px-20 py-24 rounded-tl-[4vw] rounded-bl-[4vw] bg-white w-2/3'>
                        <div className="text-4xl font-bold text-[#7f49e2] uppercase mb-6 text-center">Welcome Back</div>

                        {error ? (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-lg text-center">
                                {error}
                            </div>)
                            : (<div className="mb-4 p-3 rounded-lg">
                            </div>
                            )}

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div>
                                <label className="block text-xl font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f49e2] focus:border-[#7f49e2] outline-none text-xl placeholder:text-xl transition-all duration-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xl font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f49e2] focus:border-[#7f49e2] outline-none text-xl placeholder:text-xl transition-all duration-200"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute h-full w-20 inset-y-0 right-0 flex items-center p-4 pr-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <IoMdEyeOff className='w-full h-full' /> : <IoMdEye className='w-full h-full' />}
                                    </button>
                                </div>
                            </div>


                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                type="submit"
                                className="w-full text-xl bg-[#7f49e2] text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-[#7f49e2] hover:border-2 hover:border-[#7f49e2] transition-all ease-in-out"
                            >
                                Login <FaArrowRight className="inline ml-2" />
                            </motion.button>
                        </form>

                        <div className="mt-3 pt-3 border-t border-gray-200 text-center font-semibold flex justify-between text-gray-500">
                            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">Forgot password?</Link>
                            <Link to="/register" className="text-blue-600 hover:text-blue-800">Are you new ? Register</Link>
                        </div>

                    </div>
                </div>
                <Link to="/" className="absolute top-5 right-5 text-slate-600 hover:text-blue-800"><FaArrowLeft className="inline mr-2 mb-1" />Go back</Link>
            </div>

        </div>
    );
}
