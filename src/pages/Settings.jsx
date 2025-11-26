import React, { useEffect, useState } from 'react';
import {
    Settings,
    Moon,
    Sun,
    User,
    Palette,
    Save,
    ChevronDown,
    Mail,
    Phone,
    MapPin,
    Edit3,
    Bell,
    Shield,
    CreditCard
} from 'lucide-react';
import supabase from '../supabaseClient';
import Cookies from 'js-cookie'

const SettingsPage = () => {
    const [userData, setUserData] = useState(null)
    const email = Cookies.get('email')
    const [dark, setDark] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

    useEffect(() => {
        const fetchUser = async () => {
            if (!email) return

            const { data, error } = await supabase
                .from("User")
                .select('*')
                .eq('email', email)
                .single()

            if (error) {
                console.error('Failed To Load User', error)
                return
            }

            setUserData(data)
        }

        fetchUser()
    }, [email])

    useEffect(() => {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    const handleSave = async () => {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single()

        if (error) {
            // Handle error
        }
    }

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 mb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <Settings className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                            <p className="text-gray-600 text-sm">Manage your account preferences</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDark(prev => !prev)}
                            className="btn bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2"
                        >
                            {dark ? <Moon size={18} /> : <Sun size={18} />}
                            <span>{dark ? 'Dark Mode' : 'Light Mode'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Profile Section */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                            <img
                                                src="https://i.pravatar.cc/150?img=12"
                                                alt="Profile"
                                                className="w-14 h-14 rounded-xl object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <Edit3 size={12} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-semibold text-gray-800 truncate">
                                            {userData?.name}
                                        </h2>
                                        <p className="text-gray-600 text-sm truncate">
                                            {userData?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="p-4 space-y-3">
                                {menuItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full border-0 flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 ${activeSection === item.id
                                                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-8">
                                {/* Section Header */}
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
                                        <p className="text-gray-600 mt-1">Update your personal information and preferences</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <User className="text-blue-600 " size={24} />
                                    </div>
                                </div>

                                {/* Profile Settings */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <User size={16} className="text-blue-600" />
                                            </div>
                                            Personal Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="form-control">
                                                <label className="label mb-2">
                                                    <span className="label-text font-semibold text-gray-700">Full Name</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={userData?.nama_lengkap}
                                                    className="input outline-0 input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white py-3"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label mb-2">
                                                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                                                </label>
                                                <div className="relative">
                                                    <Mail size={18} className="absolute z-99 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        value={userData?.email}
                                                        className="input outline-0 input-bordered w-full border-gray-300 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white py-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-control">
                                                <label className="label mb-2">
                                                    <span className="label-text font-semibold text-gray-700">Phone Number</span>
                                                </label>
                                                <div className="relative">
                                                    <Phone size={18} className="absolute z-99 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        className="input outline-0 input-bordered w-full border-gray-300 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white py-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-control">
                                                <label className="label mb-2">
                                                    <span className="label-text font-semibold text-gray-700">Location</span>
                                                </label>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute z-99 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        defaultValue="San Francisco, CA"
                                                        className="input outline-0 input-bordered w-full border-gray-300 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white py-3"
                                                        placeholder="Enter your location"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSave}
                                            className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-8 flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;