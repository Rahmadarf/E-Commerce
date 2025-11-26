import React from "react"
import { useState, useEffect } from "react"
import { PackageSearch, PanelRight, Search, LogIn, UserPlus, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

const Navbar = () => {
    const navigate = useNavigate()
    const [logged, setLogged] = useState(false)
    const status = Cookies.get('isLoggedIn')

    useEffect(() => {
        if (status === 'true') {
            setLogged(true)
        } else {
            setLogged(false)
        }
    })

    const loginHandle = () => {
        navigate('/login')
    }

    const registerHandle = () => {
        navigate('/register')
    }

    return (
        <nav className="navbar w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-end w-full px-6 py-3">

                {/* Right Section - Search or Auth Buttons */}
                <div className="flex items-center">
                    {logged ? (
                        /* Search Bar for Logged-in Users */
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="text-gray-400 z-99 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="input outline-0 input-bordered pl-10 pr-4 py-2 w-80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                />
                                <button className="btn btn-primary ml-2 bg-blue-600 hover:bg-blue-700 border-none text-white px-6 py-2 transition-all duration-200 transform hover:scale-105 shadow-sm">
                                    Search
                                </button>
                            </div>
                            {/* User Profile Indicator */}
                            <div className="flex items-center gap-2 ml-4 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
                                <User className="text-blue-600" size={18} />
                                <span className="text-sm font-medium text-blue-700">Welcome!</span>
                            </div>
                        </div>
                    ) : (
                        /* Auth Buttons for Logged-out Users */
                        <div className="flex items-center gap-3">
                            <button
                                onClick={loginHandle}
                                className="btn btn-outline border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-6 py-2 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                            >
                                <LogIn size={16} />
                                Sign In
                            </button>
                            <button
                                onClick={registerHandle}
                                className="btn bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none text-white px-6 py-2 transition-all duration-200 transform hover:scale-105 shadow-sm flex items-center gap-2"
                            >
                                <UserPlus size={16} />
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar