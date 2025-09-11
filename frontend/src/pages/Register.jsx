import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../firebaseConfig';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { motion } from "framer-motion";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // const emailPattern = /^[a-zA-Z0-9._%+-]+@aai\.aero$/;

        // if (!emailPattern.test(email)) {
        //     setError('Please use official email ID');
        //     setLoading(false);
        //     return;
        // }

        try {
            const userCredential = await register(email, password, name);
            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                name,
                email
            });

            console.log("Registered successfully !");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered.');
            } else {
                setError('Registration failed. Please try again.');
            }
            setLoading(false);
        }
    };


    return (
        <div className="min-h-full w-full flex items-center justify-center font-['Inter_Tight'] bg-gradient-to-b from-[#7f49e2]/20 to-white">
            <div className="relative bg-white h-2/3 w-2/3 shadow-xl border border-gray-200">
                <div className='bg-red-200 w-full h-full flex items-center'>
                    <div className='w-1/3 h-full py-12 flex justify-center items-center'><motion.img whileHover={{ scale: 1.05 }} className='h-full' src="/images/man.png" alt="man" /></div>
                    <div className='px-20 py-16 rounded-tl-[4vw] rounded-bl-[4vw] bg-white w-2/3'>
                        

                        <h2 className="text-center uppercase mb-2 text-4xl font-bold text-[#7f49e2] ">Create Account</h2>
                        {/* <p className="text-gray-500 text-center mb-8">Join us today to get started</p> */}

                        {error ? (
                            <div className="mb-2 p-3 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-sm">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>)
                            : (<div className="mb-2 p-3 rounded-lg flex items-center justify-center text-sm">
                                
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f49e2] focus:border-[#7f49e2] outline-none text-xl placeholder:text-xl transition-all duration-200"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your full name"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f49e2] focus:border-[#7f49e2] outline-none text-xl placeholder:text-xl transition-all duration-200"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f49e2] focus:border-[#7f49e2] outline-none text-xl placeholder:text-xl transition-all duration-200"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        minLength="6"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-xl bg-[#7f49e2] text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-[#7f49e2] hover:border-2 hover:border-[#7f49e2] transition-all ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Register'
                                )}
                            </button>

                            
                        </form>
                        <div className=" mt-2 pt-2 border-t border-gray-200 text-center">
                                <p className="text-lg font-semibold text-gray-500">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                    </div>
                </div>
                <Link to="/" className="absolute top-5 right-5 text-slate-600 hover:text-blue-800"><FaArrowLeft className="inline mr-2 mb-1" />Go back</Link>
            </div>

        </div>
    );
}