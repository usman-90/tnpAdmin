import { useState } from "react";
import "../../App.css";

import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import Logo from "../../../public/logo.png";
import { FaMoon, FaRegImage, FaRegUser } from "react-icons/fa";
// import { IoWalletOutline } from "react-icons/io5";
import { LuCalendarDays, LuWallet2 } from "react-icons/lu";
// import { PiChartLineLight } from "react-icons/pi";
import { ImFileText } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { BsTree } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { MdOutlineAreaChart } from "react-icons/md";

function SideBar() {
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currOption, setCurrOption] = useState("dashboard");

    return (
        <>
            <div
                className={`flex flex-col justify-between py-5 rounded-xl m-3 ${isCollapsed ? "w-20" : "w-60"
                    } bg-primary animate-width`}
            >
                <div>
                    <Link to={"/auth/dashboard"}>
                        <div className="flex items-center justify-start px-5 cursor-pointer">
                            <div
                                className="flex justify-start w-10 h-10 items-center"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <img src={Logo} className="w-full h-full" />
                            </div>

                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } text-white font-bold overflow-hidden text-lg`}
                            >
                                Triply
                            </p>
                        </div>
                    </Link>

                    <Link to={"/auth/dashboard"}>
                        <div
                            onClick={() => setCurrOption("dashboard")}
                            className={`${isCollapsed && currOption === "dashboard"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start mt-10 text-3xl items-center cursor-pointer py-3 ${currOption === "dashboard" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "dashboard" ? "text-white" : ""}`}
                        >
                            <MdDashboard />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Dashboard
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/users"}>
                        <div
                            onClick={() => setCurrOption("users")}
                            className={`${isCollapsed && currOption === "users"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start text-3xl items-center cursor-pointer text- py-3 ${currOption === "users" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "users" ? "text-white" : ""}`}
                        >
                            <FaRegUser />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Users
                            </p>
                        </div>
                    </Link>
                    {/* <Link to={"/analytics"}>
            <div
              onClick={() => setCurrOption("analytics")}
              className={`${
                isCollapsed && currOption === "analytics"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${
                currOption === "analytics" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "analytics" ? "text-white" : ""}`}
            >
              <PiChartLineLight className="font-bold" />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Analytics
              </p>
            </div>
          </Link> */}
                    <Link to={"/auth/banners"}>
                        <div
                            onClick={() => setCurrOption("banners")}
                            className={`${isCollapsed && currOption === "banners"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${currOption === "banners" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "banners" ? "text-white" : ""}`}
                        >
                            <FaRegImage className="font-bold" />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Banners
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/packages"}>
                        <div
                            onClick={() => setCurrOption("packages")}
                            className={`${isCollapsed && currOption === "packages"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "packages" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "packages" ? "text-white" : ""}`}
                        >
                            <LuWallet2 />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Packages
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/trips"}>
                        <div
                            onClick={() => setCurrOption("trips")}
                            className={`${isCollapsed && currOption === "trips"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "trips" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "trips" ? "text-white" : ""}`}
                        >
                            <BsTree />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Trips
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/hotel"}>
                        <div
                            onClick={() => setCurrOption("hotel")}
                            className={`${isCollapsed && currOption === "hotel"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } cursor-pointer flex justify-start  text-3xl items-center text-whte py-3 ${currOption === "hotel" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "hotel" ? "text-white" : ""}`}
                        >
                            <LuCalendarDays />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Hotel
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/carRental"}>
                        <div
                            onClick={() => setCurrOption("cars")}
                            className={`${isCollapsed && currOption === "cars"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                }cursor-pointer ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start text-3xl items-center txt-white py-3 ${currOption === "cars" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "cars" ? "text-white" : ""}`}
                        >
                            <ImFileText />
                            <p
                                className={`${isCollapsed ? "w-0 hidden" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Cars
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/carbookings"}>
                        <div
                            onClick={() => setCurrOption("carbookings")}
                            className={`${isCollapsed && currOption === "carbookings"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "carbookings" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "carbookings" ? "text-white" : ""}`}
                        >
                            <BsTree />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Car Bookings
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/testimonials"}>
                        <div
                            onClick={() => setCurrOption("testimonials")}
                            className={`${isCollapsed && currOption === "testimonials"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "testimonials" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "testimonials" ? "text-white" : ""}`}
                        >
                            <MdRateReview />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Testimonials
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/destinations"}>
                        <div
                            onClick={() => setCurrOption("destinations")}
                            className={`${isCollapsed && currOption === "destinations"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${currOption === "destinations" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "destinations" ? "text-white" : ""}`}
                        >
                            <MdOutlineAreaChart />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Destinations
                            </p>
                        </div>
                    </Link>
                    <Link to={"/auth/settings"}>
                        <div
                            onClick={() => setCurrOption("settings")}
                            className={`${isCollapsed && currOption === "settings"
                                    ? "bg-white text-primary rounded-lg py-1 px-1"
                                    : ""
                                } cursor-pointer ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                                } flex justify-start text-3xl items-center tet-white py-3 ${currOption === "settings" && !isCollapsed
                                    ? "rounded-l-xl bg-white text-primary"
                                    : ""
                                } ${currOption !== "settings" ? "text-white" : ""}`}
                        >
                            <MdOutlineSettings />
                            <p
                                className={`${isCollapsed ? "w-0" : "ms-3"
                                    } font-old overflow-hidden text-base`}
                            >
                                Settings
                            </p>
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                            window.localStorage.removeItem("userData")
                            navigate("/")
                            window.location.assign("/")
                        }}
                        className={`${isCollapsed && currOption === "logout"
                                ? "bg-white text-primary rounded-lg py-1 px-1"
                                : ""
                            } cursor-pointer ${isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
                            } flex justify-start text-3xl items-center tet-white py-3 ${currOption === "logout" && !isCollapsed
                                ? "rounded-l-xl bg-white text-primary"
                                : ""
                            } ${currOption !== "logout" ? "text-white" : ""}`}
                    >
                        <MdOutlineSettings />
                        <p
                            className={`${isCollapsed ? "w-0" : "ms-3"
                                } font-old overflow-hidden text-base`}
                        >
                           Logout 
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg mx-2 py-2">
                    <div className="py-2">
                        <FaMoon className="text-2xl" />
                    </div>
                    <div
                        className={`${isCollapsed ? "w-0 hidden" : "w-full"
                            } text-center  animate-width py-2 text-sm text-white bg-secondary rounded px-12`}
                    >
                        Dark Mode
                    </div>
                    <div className={`py-2 text-sm ${isCollapsed ? "w-0 hidden" : ""}`}>
                        Light Mode
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
