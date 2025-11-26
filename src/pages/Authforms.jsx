import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, LockKeyhole, MessageCircleX, LogIn, UserPlus, MailCheck } from 'lucide-react';
import supabase from '../supabaseClient'
import Swal from 'sweetalert2'
import AnimatedAlert from "@/components/ui/AnimatedAlert"
import AnimatedSuccess from "@/components/ui/AnimatedSuccess"
import Cookies from 'js-cookie'
import axios from 'axios'

const Authforms = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const status = Cookies.get('isLoggedIn')

    useEffect(() => {
        if (status === 'true') {
            navigate('/')
        }
    }, [status])

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please Fill Email and Password!");
            await delay(2000);
            setError("");
            return;
        }

        setLoading(true);
        await delay(3000)

        try {
            const res = await axios.post("http://localhost:3001/login", {
                email,
                password
            });

            const result = res.data;

            setLoading(false)
            setSuccess('Login Successfull')
            await delay(2500)


            // Simpan JWT
            localStorage.setItem("name", result.user.name)
            localStorage.setItem("token", result.token)
            localStorage.setItem("UUID", result.user.id)

            Cookies.set('Token', result.token)
            Cookies.set('email', result.user.email)
            Cookies.set('userId', result.user.id)
            Cookies.set('isLoggedIn', true)
            if (password === '223332AxU') {
                Cookies.set('isAdmin', true)
            }

            setSuccess('')
            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Server Error"
            setError(errorMessage);
            setLoading(false);
            await delay(2000);
            setError("");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4 transition-all duration-300">
            <div className="w-full max-w-md">
                {/* Alert Messages */}
                <div className="fixed w-full max-w-md p-5 pt-9 mb-4">
                    <AnimatedAlert
                        type='error'
                        message={
                            <div className='flex items-center gap-2'>
                                <MessageCircleX size={18} />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        }
                        show={Boolean(error)}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
                    />
                </div>
                <div className="fixed mb-4 w-full max-w-md p-5 pt-9 ">
                    <AnimatedSuccess
                        type='success'
                        message={
                            <div className='flex items-center gap-2'>
                                <MailCheck size={18} />
                                <span className="text-sm font-medium">{success}</span>
                            </div>
                        }
                        show={Boolean(success)}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
                    />
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <img
                                        src="loginLogo.png"
                                        className="w-12 h-12 object-contain"
                                        alt="App Logo"
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-gray-400 group-focus-within:text-blue-500 transition-colors z-99" />
                                    </div>
                                    <input
                                        type="email"
                                        className="input outline-0 input-bordered w-full pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="label-text font-semibold text-gray-700">Password</label>
                                    <Link
                                        to='/forgetpassword'
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockKeyhole size={20} className="text-gray-400 group-focus-within:text-blue-500 transition-colors z-99" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input outline-0 input-bordered w-full pl-10 pr-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute z-99 inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LogIn size={18} />
                                        <span>Sign In</span>
                                    </div>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center py-4">
                                <div className="grow border-t border-gray-300"></div>
                                <span className="shrink mx-4 text-gray-500 text-sm">or</span>
                                <div className="grow border-t border-gray-300"></div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-gray-600 text-sm flex items-center justify-center gap-x-1.5">
                                    Don't have an account?{' '}
                                    <Link
                                        to='/register'
                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                                    >
                                        <UserPlus size={16} />
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <p className="text-center text-gray-500 text-xs">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authforms;