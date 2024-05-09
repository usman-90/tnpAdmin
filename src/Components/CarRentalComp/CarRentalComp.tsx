import { Button, Pagination } from "antd";
import { IoIosAdd } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import CarRentalInsertionBox from "./CarRentalInsetionBox";
import axios from "axios";

const data = [
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },
    { name: "Corolla", rent_date: "05 May 2024", client_name: "Maryam Khanzada", rate_per_day: "$5/day" },

];

const CarRentalComp: React.FC = () => {
    const [openBox, setOpenBox] = useState(false);
    const [cars, setCars] = useState([]);
    const [totalCars, setTotalCars] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrPage(page);
    }


    const fetchCars = async () => {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/car/all", {
            params: {
                page: currPage
            }
        })
        setCars(res?.data?.cars)
        setTotalCars(res?.data?.totalCars)
        console.log(res?.data)
    }

    console.log(cars)

    useEffect(() => {
        fetchCars()
    }, [currPage])


    const pageSize = 8;

    return (
        <div className="w-full  bg-white p-4 flex flex-col gap-4 rounded-xl">
            <div className="flex flex-row justify-between py-4">
                <p className="text-xl font-bold mb-4 pl-2">Cars</p>
                <Button
                    className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
                    icon={<RiAddLine size={23} className="pt-0.5" />}
                    onClick={() => setOpenBox(true)}>
                    Add
                </Button>
                <CarRentalInsertionBox BoxState={openBox} BoxStateChange={setOpenBox} />
            </div>
            <div className="h-[0.5px] w-full bg-gray-400"></div>
            <div className="relative overflow-x-auto  justify-center items-center  ">
                <table className="text-md  text-left   text-gray-500 dark:text-gray-400 m-auto   lg:w-full md:w-full h-full">
                    <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                        <tr className=" ">
                            <td scope="col" className="pl-6 px-4 py-4 font-medium ">
                                <div className="flex flex-row">
                                    Car Name<BiSortAlt2 size={17} />
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium ">
                                <div className="flex flex-row">
                                    Color
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Price Per Day
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Car Class
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium ">
                                <div className="flex flex-row">
                                    Engine
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Fuel Type
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Make
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Mileage
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Model
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Transmission
                                </div>
                            </td>
                            <td scope="col" className="px-4 py-4 font-medium">
                                <div className="flex flex-row">
                                    Year
                                </div>
                            </td>






                        </tr>
                    </thead>
                    <tbody>
                        {cars?.map((car) => (
                            <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td
                                    scope="row"
                                    className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg "
                                >
                                    <div className="flex flex-row gap-2"><div className="w-10 h-10 bg-gray-200 rounded-full"></div><div className="flex flex-col text-sm pt-3"><p className="  "> {car?.car_name}</p></div></div>

                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm text-black">
                                    <div className="flex flex-row ">{car?.color}</div>

                                </td>

                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.pricePerDay}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm ">
                                    {car?.tnp_car_class?.class_name}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.engine}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.fuelType}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.make}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.mileage}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.model}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.transmission}
                                </td>
                                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                                    {car?.year}
                                </td>









                            </tr>
                        ))}

                        {/* <tr colSpan={7} className="">
                  <td colSpan={7} className="flex flex-row gap-2">
                    {currentPage > 1 && (
                      <GrLinkPrevious
                        classNameName="mt-1 text-orange-500"
                        onClick={handlePreviousPage}
                      />
                    )}
                    {isMoreUsersAvailable ? (
                      <button
                        classNameName="text-center text-orange-500 w-full"
                        onClick={handleReadMore}
                      >
                        Read More
                      </button>
                    ) : (
                      <p className="text-center text-orange-500">
                        No More Users
                      </p>
                    )}
                  </td>
                </tr> */}
                    </tbody>
                </table>
            </div>
            <Pagination className={`${totalCars < pageSize ? "hidden" : "block"}`}
                current={currPage}
                onChange={handlePageChange}
                total={totalCars} // Total number of items
                pageSize={pageSize} // Number of items per page
                showSizeChanger={false} // Hide the size changer
            />

        </div>

    )

}
export default CarRentalComp;
