import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ChevronLeft, Send } from "lucide-react";

const Forgetpassword = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <img
                                        src="resetLogo.png"
                                        className="w-12 h-12 object-contain"
                                        alt="Reset Password"
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Reset Password
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Enter your email to receive a password reset link
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
                                        <Mail size={20} className="text-gray-400 z-99 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        className="input outline-0 input-bordered w-full pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button className="btn w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Reset Link
                                <ArrowRight size={16} />
                            </button>

                            {/* Back to Login */}
                            <div className="text-center pt-4">
                                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                                    <span>Remember your password?</span>
                                    <Link
                                        to='/login'
                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} />
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <p className="text-center text-gray-500 text-xs">
                            We'll send you a link to reset your password
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword;