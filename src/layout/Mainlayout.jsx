import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import Homepage from '../pages/Homepage'
import Settingspage from '../pages/Settings'
import Cart from '../pages/Cart'
import AdminDashboard from '../pages/Adminpage'

const Mainlayout = () => {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="drawer lg:drawer-open">

            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* CONTENT */}
            <div className="drawer-content min-h-screen">
                <div className="">
                    {activePage === "home" && <Homepage setActivePage={setActivePage}/>}
                    {activePage === "setting" && <Settingspage />}
                    {activePage === "cart" && <Cart  setActivePage={setActivePage}/>}
                    {activePage === "admin" && <AdminDashboard  setActivePage={setActivePage}/>}
                </div>
            </div>

            {/* SIDEBAR — HARUS SETELAH drawer-content */}
            <Sidebar setActivePage={setActivePage} />
        </div>
    )
}

export default Mainlayout
