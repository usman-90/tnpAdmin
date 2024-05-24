// import { Button, Pagination } from "antd";
// import { useState } from "react";

import { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
// import { Button } from "antd";
import { RiAddLine } from "react-icons/ri";
import TripInsertionBox from "../../Components/TripComp/TripInsertionBox";


// const data = [
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
//   {
//     name: "Asad",
//     email: "asad@gmail.com",
//     flight: "Qatar",
//     totalMembers: 16,
//     price: 10.62,
//   },
// ];

const LastTrips: React.FC = () => {
  // const [currPage, setCurrPage] = useState(1);
  // const handlePageChange = (page: number) => {
  //   setCurrPage(page);
  // };
  // const pageSize = 8;
  // const totalItems = data.length;
  // const startIndex = (currPage - 1) * pageSize;
  // const paginatedData = data.slice(startIndex, startIndex + pageSize);
  const [openBox, setOpenBox] = useState(false);
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<any>(null);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const pageSize = 10;
  const totalItems = data?.length;

  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/getTrips?page=${currentPage}&limit=${pageSize}`
    );
    setData(res.data.data);
    setLoading(false);
  };

  const onDeleteClick = (trip: any) => {
    setTripToDelete(trip);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (trip_id: any) => {
    setDeleting(true);
    await axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/admin/getTrips?id=${trip_id}`
      )
      .then((_) => {
        Toast.fire({
          icon: "success",
          title: "Trip Deleted successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
    setDeleting(false);
    setIsDeleteModalOpen(false);
    setTripToDelete(null);

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    // <div className="w-full  bg-white p-4 flex flex-col gap-4 rounded-xl">
    //   <div className="flex flex-row justify-between py-4">
    //     <p className="text-xl font-bold mb-4 pl-2">Last Trips</p>
    //     <Button className="flex flex-row bg-orange-400 text-white ">
    //       <IoIosAdd size={20} />
    //       <p>Add</p>
    //     </Button>
    //   </div>
    //   <div className="h-[0.5px] w-full bg-gray-400"></div>
    //   <div className="relative overflow-x-auto  justify-center items-center  ">
    //     <table className="text-md  text-left   text-gray-500 dark:text-gray-400 m-auto   lg:w-full md:w-full h-full">
    //       <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
    //         <tr className=" ">
    //           <td scope="col" className="pl-6 px-4 py-4 font-medium ">
    //             <div className="flex flex-row">
    //               Member
    //               <BiSortAlt2 size={17} />
    //             </div>
    //           </td>
    //           <td scope="col" className="px-4 py-4 font-medium ">
    //             <div className="flex flex-row">
    //               Flight <BiSortAlt2 size={17} />
    //             </div>
    //           </td>
    //           <td scope="col" className="px-4 py-4 font-medium ">
    //             <div className="flex flex-row">
    //               Total Members <BiSortAlt2 size={17} />
    //             </div>
    //           </td>
    //           <td scope="col" className="px-4 py-4 font-medium">
    //             <div className="flex flex-row">
    //               Price
    //               <BiSortAlt2 size={17} />
    //             </div>
    //           </td>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {paginatedData?.map((item) => (
    //           <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //             <td
    //               scope="row"
    //               className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg ">
    //               <div className="flex flex-row gap-2">
    //                 <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    //                 <div className="flex flex-col text-sm">
    //                   <p className="  "> {item?.name}</p>
    //                   <p className="text-gray-500">{item.email}</p>
    //                 </div>
    //               </div>
    //             </td>

    //             <td className="  pl-4 md:pr-0 pr-4 text-sm">{item.flight}</td>
    //             <td className="  pl-4 md:pr-0 pr-4 text-sm ">
    //               <div className="bg-sky-400 rounded-lg text-white w-10 py-2 text-center">
    //                 {item.totalMembers}
    //               </div>
    //             </td>
    //             <td className="  pl-4 md:pr-0 pr-4 text-sm text-black">
    //               <div className="flex flex-row ">${item.price}</div>
    //             </td>
    //           </tr>
    //         ))}

    //         {/* <tr colSpan={7} className="">
    //               <td colSpan={7} className="flex flex-row gap-2">
    //                 {currentPage > 1 && (
    //                   <GrLinkPrevious
    //                     classNameName="mt-1 text-orange-500"
    //                     onClick={handlePreviousPage}
    //                   />
    //                 )}
    //                 {isMoreUsersAvailable ? (
    //                   <button
    //                     classNameName="text-center text-orange-500 w-full"
    //                     onClick={handleReadMore}
    //                   >
    //                     Read More
    //                   </button>
    //                 ) : (
    //                   <p className="text-center text-orange-500">
    //                     No More Users
    //                   </p>
    //                 )}
    //               </td>
    //             </tr> */}
    //       </tbody>
    //     </table>
    //   </div>
    //   <Pagination
    //     className={`${totalItems < pageSize ? "hidden" : "block"}`}
    //     current={currPage}
    //     onChange={handlePageChange}
    //     total={totalItems} // Total number of items
    //     pageSize={pageSize} // Number of items per page
    //     showSizeChanger={false} // Hide the size changer
    //   />
    // </div>

    <div className="h-auto -y-auto bg-white w-[95%] relative m-4 rounded-lg">
      <div className="relative z-10 h-0 w-full">
        {loading && <Loader message="Fetching Data" />}
        {deleting && <Loader message="Deleting Data" />}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between m-4">
          <h1 className="sm:text-xl text-lg font-semibold">Trips</h1>
          <Button
            className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
            icon={<RiAddLine size={23} className="pt-0.5" />}
            onClick={() => setOpenBox(true)}>
            Add
          </Button>
          <TripInsertionBox
            BoxState={openBox}
            BoxStateChange={setOpenBox}
            fetchData={fetchData}
          />
        </div>
        <div className="w-full h-[0.8px] bg-gray-300"></div>
      </div>
      <div className="justify-center items-center w-full h-auto">
        <div className="relative overflow-x-auto justify-center items-center">
          <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
            <thead className="text-xs text-gray-700 uppercase">
              <tr className="border-b border-gray-300">
                <td scope="col" className="pl-6 px-4 py-4 text-lg">
                  Trip Package Name
                </td>
                <td scope="col" className="pl-6 px-4 py-4 text-lg">
                  Total Seats Limit
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Trip Date
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Seats Booked
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Remove
                </td>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={item.trip_id}>
                  <td
                    scope="row"
                    className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-xs">
                    <p className="text-sm py-2">
                      {item?.tnp_packages?.package_name}
                    </p>
                  </td>
                  <td
                    scope="row"
                    className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg">
                    <p className="text-sm py-2">
                      {item?.tnp_packages?.package_total_persons}
                    </p>
                  </td>
                  <td className="pl-4 md:pr-0 pr-4 text-sm">
                    {new Date(item?.trip_date)?.toString()}
                  </td>
                  <td className="pl-4 md:pr-0 pr-4 text-sm">
                    {item?.trip_booked_count}
                  </td>
                  <td className="pl-4 py-2 md:pr-0 pr-4">
                    <button onClick={() => onDeleteClick(item)}>
                      <ImCancelCircle className="text-red-700 hover:text-red-500 text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            total={totalItems}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};
export default LastTrips;
