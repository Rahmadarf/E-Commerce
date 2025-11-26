import React, { useState, useEffect } from "react"
import { LogOutIcon, HomeIcon, Settings2, ShoppingBasket, ChevronRight, UserRoundCog } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'

const Sidebar = ({ setActivePage }) => {
    const navigate = useNavigate()
    const [logged, setLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    if (isAdmin !== (Cookies.get('isAdmin') === 'true')) {
        setIsAdmin(Cookies.get('isAdmin') === 'true')
    }

    useEffect(() => {
        const status = Cookies.get('isLoggedIn')
        setLogged(status === 'true')
    }, [])

    const handleOut = () => {
        Swal.fire({
            icon: 'question',
            title: 'Are You Sure Want To Log Out?',
            showCancelButton: true,
            confirmButtonColor: '#1447e6',
            width: '400px'
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.set('isLoggedIn', false)
                localStorage.clear()
                Cookies.remove('Token')
                Cookies.remove('email')
                Cookies.remove('userId')
                setLogged(false)
                navigate('/login')
            }
        })
    }

    const closeDrawer = () => {
        const drawer = document.getElementById("my-drawer-4")
        if (drawer) drawer.checked = false
    }

    return (
        <div className="drawer-side is-drawer-close:overflow-visible">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

            {/* FIX WIDTH */}
            <div className="
                flex min-h-full flex-col items-start bg-white border-r border-gray-200 shadow-xl
                w-64 transition-all duration-300
            ">
                {/* Header */}
                <div className="w-full px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">K</span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-sm">Kumar Store</h2>
                            <p className="text-xs text-gray-500">Navigation</p>
                        </div>
                    </div>
                </div>

                <ul className="menu w-full grow p-4 space-y-1">
                    <li>
                        <button
                            onClick={() => { setActivePage('home'); closeDrawer() }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition group"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100">
                                <HomeIcon size={18} />
                            </div>
                            <span className="font-medium">Homepage</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => { setActivePage('setting'); closeDrawer() }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition group"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100">
                                <Settings2 size={18} />
                            </div>
                            <span className="font-medium">Settings</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </button>
                    </li>

                    {isAdmin && <li>
                        <button
                            onClick={() => { setActivePage('admin'); closeDrawer() }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition group"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100">
                                <UserRoundCog size={18} />
                            </div>
                            <span className="font-medium">Admin Page</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </button>
                    </li>}

                    {logged ? (<li className="mt-auto pt-4 border-t border-gray-100">
                        <button
                            onClick={() => { handleOut(); closeDrawer() }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition group"
                        >
                            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200">
                                <LogOutIcon size={18} />
                            </div>
                            <span className="font-medium">Log Out</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </button>
                    </li>) : <li className="mt-auto pt-4 border-t border-gray-100">
                        <Link
                            to='/login'
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 transition group"
                        >
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                                <LogOutIcon size={18} />
                            </div>
                            <span className="font-medium">Sign In</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </Link>
                    </li>}
                </ul>

                <div className="w-full px-6 py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">Version 1.0.0</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
