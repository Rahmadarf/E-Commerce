// src/components/AuthForms.jsx
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, MessageCircleX, LockKeyhole, UserPlus, LogIn } from 'lucide-react';
import AnimatedAlert from "@/components/ui/AnimatedAlert"
import AnimatedSuccess from '@/components/ui/AnimatedSuccess'
import axios from 'axios';
import Cookies from 'js-cookie'

const Registerforms = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const handleRegis = async () => {
        if (!email || !name || !password) {
            setError('Please Fill The Blank')
            await delay(2000)
            setError('')
            return
        }

        if (cPassword !== password) {
            setError('Password ')
            await delay(2000)
            setError('')
            return
        }

        setLoading(true)
        await delay(3000)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
                email,
                password,
                name
            });

            const result = res.data

            localStorage.setItem("name", result.user.name)

            Cookies.set('Token', result.token)
            Cookies.set('email', result.user.email)
            Cookies.set('isLoggedIn', true)

            setSuccess('Registered Successfull')
            await delay(2000)
            setSuccess('')
            navigate('/')

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Server Error"

            setError(errorMessage)
            setLoading(false)
            await delay(2000)
            setError('')
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
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
                <div className="fixed w-full max-w-md p-5 pt-9 mb-4">
                    <AnimatedSuccess
                        type='success'
                        message={
                            <div className='flex items-center gap-2'>
                                <MessageCircleX size={18} />
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
                                        src="registerLogo.png"
                                        className="w-12 h-12 object-contain"
                                        alt="App Logo"
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Fill in your details to get started
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Username Input */}
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-gray-700">Username</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={20} className=" z-99 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="input outline-0 input-bordered w-full pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your username"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-gray-400 z-99 group-focus-within:text-blue-500 transition-colors" />
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

                            {/* Password Fields - Side by Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Password Input */}
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text font-semibold text-gray-700">Password</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockKeyhole size={20} className="text-gray-400 z-99 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="input outline-0 input-bordered w-full pl-10 pr-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Input */}
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text font-semibold text-gray-700">Confirm Password</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockKeyhole size={20} className="text-gray-400 z-99 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="input outline-0 input-bordered w-full pl-10 pr-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                            placeholder="Confirm Password"
                                            value={cPassword}
                                            onChange={(e) => setCPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="form-control">
                                <label className="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary mt-0.5 rounded-[6px] w-5 h-5 border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500"
                                    />
                                    <span className="label-text text-gray-700 text-sm flex-1">
                                        I agree to the <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">Terms & Conditions</span>
                                    </span>
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                onClick={handleRegis}
                                disabled={loading}
                                className="btn w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <UserPlus size={18} />
                                        <span>Create Account</span>
                                    </div>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center py-4">
                                <div className="grow border-t border-gray-300"></div>
                                <span className="shrink mx-4 text-gray-500 text-sm">or</span>
                                <div className="grow border-t border-gray-300"></div>
                            </div>

                            {/* Sign In Link */}
                            <div className="text-center">
                                <p className="text-gray-600 text-sm flex items-center justify-center gap-1.5">
                                    Already have an account?{' '}
                                    <Link
                                        to='/login'
                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                                    >
                                        <LogIn size={16} />
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <p className="text-center text-gray-500 text-xs">
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registerforms;