import { useState } from 'react'


import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import Logo from "../../../public/logo.png"
import { FaCar, FaChartArea, FaRegUser } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import { LuCalendarDays, LuWallet2 } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import { PiChartLineLight } from 'react-icons/pi';
import { ImFileText } from 'react-icons/im';


const Sidebar = () =>{

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [currOption, setCurrOption] = useState('dashboard')


    return (
        <>
        
            

                <div className={`h-full min-h-[100vh] py-5 rounded-xl m-3 ${isCollapsed ? "w-20" : "w-48"} bg-primary animate-width`}>
                    <div className='flex items-center justify-start px-5 cursor-pointer'>
                        <div className='flex  justify-start w-10 h-10 items-center' onClick={() => setIsCollapsed(!isCollapsed)}>
                            <img src={Logo} className='w-full h-full' />
                        </div>

                        <p className={`${isCollapsed ? "w-0" : "ms-3"} text-white font-bold overflow-hidden text-lg`}>
                            Triply
                        </p>
                    </div>

                    <div onClick={() => setCurrOption("dashboard")} className={`${isCollapsed && currOption === "dashboard" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex justify-start mt-10 text-3xl items-center cursor-pointer text-white py-3 ${currOption === 'dashboard' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <MdDashboard />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Dashboard
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("users")} className={`${isCollapsed && currOption === "users" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex justify-start text-3xl items-center cursor-pointer text-white py-3 ${currOption === 'users' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <FaRegUser />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Users
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("analytics")} className={`${isCollapsed && currOption === "analytics" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex justify-start cursor-pointer text-3xl items-center text-white py-3 ${currOption === 'analytics' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <PiChartLineLight className='font-bold' />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Analytics
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("packages")} className={`${isCollapsed && currOption === "packages" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex cursor-pointer justify-start  text-3xl items-center text-white py-3 ${currOption === 'packages' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <LuWallet2 />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Packages
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("hotel")} className={`${isCollapsed && currOption === "hotel" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} ${isCollapsed ? "mx-6" : "ms-5 ps-1"} cursor-pointer flex justify-start  text-3xl items-center text-white py-3 ${currOption === 'hotel' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <LuCalendarDays />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Hotel
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("carRental")} className={`${isCollapsed && currOption === "carRental" ? "bg-white text-primary rounded-lg py-1 px-1" : ""}cursor-pointer ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex justify-start text-3xl items-center text-white py-3 ${currOption === 'carRental' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <ImFileText />
                        <p className={`${isCollapsed ? "w-0 hidden" : "ms-3"} font-old overflow-hidden text-base`}>
                            Car Rental
                        </p>
                    </div>
                    <div onClick={() => setCurrOption("settings")} className={`${isCollapsed && currOption === "settings" ? "bg-white text-primary rounded-lg py-1 px-1" : ""} cursor-pointer ${isCollapsed ? "mx-6" : "ms-5 ps-1"} flex justify-start text-3xl items-center text-white py-3 ${currOption === 'settings' && !isCollapsed ? "rounded-l-xl bg-white text-primary" : "text-white"}`}>
                        <MdOutlineSettings />
                        <p className={`${isCollapsed ? "w-0" : "ms-3"} font-old overflow-hidden text-base`}>
                            Settings
                        </p>
                    </div>


                </div>





          
        </>
    )
}

export default Sidebar;
