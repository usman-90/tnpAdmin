import { Button, Pagination } from "antd";
import { IoIosAdd } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import TripInsertionBox from "./TripInsertionBox";

const data = [
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    { name: "Hunza Trip", duration: "10 days", person_count:16 , start_date: "10 January 2024" },
    
  ];

const TripComp: React.FC = ()=>{
    const [openBox, setOpenBox] = useState(false);
    const [currPage , setCurrPage]= useState(1);
    const handlePageChange = (page: number) => {
        setCurrPage(page);
      }
      const pageSize = 8;
      const totalItems = data.length;
      const startIndex = (currPage - 1) * pageSize;
      const paginatedData = data.slice(startIndex, startIndex + pageSize);
    return(
        <div className="w-full  bg-white p-4 flex flex-col gap-4 rounded-xl">
            <div className="flex flex-row justify-between py-4">
                <p className="text-xl font-bold mb-4 pl-2">Trips</p>
                <Button
          className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
          icon={<RiAddLine size={23} className="pt-0.5" />}
          onClick={() => setOpenBox(true)}>
          Add
        </Button>
        <TripInsertionBox BoxState={openBox} BoxStateChange={setOpenBox} />
            </div>
            <div className="h-[0.5px] w-full bg-gray-400"></div>
            <div className="relative overflow-x-auto  justify-center items-center  ">
            <table className="text-md  text-left   text-gray-500 dark:text-gray-400 m-auto   lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                <tr className=" ">
                  <td scope="col" className="pl-6 px-4 py-4 font-medium ">
                    <div className="flex flex-row">
                    Trip Package Name<BiSortAlt2 size={17}/>
                    </div>
                  </td>
                  <td scope="col" className="px-4 py-4 font-medium ">
                    <div className="flex flex-row">
                    Trip Duration <BiSortAlt2 size={17}/>
                    </div>
                  </td>
                  <td scope="col" className="px-4 py-4 font-medium ">
                    <div className="flex flex-row">
                   Trip Person count <BiSortAlt2 size={17}/>
                    </div>
                  </td>
                  <td scope="col" className="px-4 py-4 font-medium">
                    <div className="flex flex-row">
                    Trip Start Date<BiSortAlt2 size={17}/>
                    </div>
                  </td>

                  
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((item) => (
                  <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                        <div className="flex flex-row gap-2"><div className="w-10 h-10 bg-gray-200 rounded-full"></div><div className="flex flex-col text-sm pt-3"><p className="  "> {item?.name}</p></div></div>
                     
                    </td>
                   
                    <td className="  pl-4 md:pr-0 pr-4 text-sm">
                      {item.duration}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-sm ">
                        <div className="bg-sky-400 rounded-lg text-white w-10 py-2 text-center">
                      {item.person_count}
                      </div>
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-sm text-black">
                        <div className="flex flex-row ">{item.start_date}</div>
                     
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
            <Pagination className={`${totalItems <pageSize ? "hidden" : "block"}`}
              current={currPage} 
              onChange={handlePageChange} 
              total={totalItems} // Total number of items
              pageSize={pageSize} // Number of items per page
              showSizeChanger={false} // Hide the size changer
            />
            
        </div>

    )

}
export default TripComp;