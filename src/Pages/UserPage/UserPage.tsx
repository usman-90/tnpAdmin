import { CiEdit } from "react-icons/ci";
import correct from "../../../public/Correct.png";
import { useState } from "react";
import { Pagination } from "antd";

const data = [
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
];

const UserPage: React.FC = () => {
  const [currentPage, setCurrPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const pageSize = 6;
  const totalItems = data.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  return (
    <div className="h-auto overflow-y-auto bg-white w-[95x%] relative m-4 rounded-lg  ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between  m-4  ">
          <h1 className="sm:text-xl text-lg font-semibold">Users</h1>
          <button className="flex flex-row gap-2 border-0 decoration-none bg-transparent shadow-xs">
            <p className="sm:block hidden">Edit</p>
            <CiEdit color="orange" size={22} />
          </button>
        </div>
        <div className="w-full h-[0.8px] bg-gray-300"></div>
      </div>
      <div className="justify-center items-center w-full  h-auto">
        <div className="relative overflow-x-auto  justify-center items-center  ">
          <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr className="border-b  border-gray-300 ">
                <td scope="col" className="pl-6 px-4 py-4 text-lg">
                  Name
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Email
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Status
                </td>
                <td scope="col" className="px-4 py-4 text-lg">
                  Remove
                </td>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td
                    scope="row"
                    className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                  >
                    <div className="flex flex-row gap-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <p className="text-lg py-2 "> {item?.name}</p>
                    </div>
                  </td>

                  <td className="  pl-4 md:pr-0 pr-4 text-lg">{item.email}</td>

                  <td
                    className={` pl-4  py-2 md:pr-0 pr-4 text-lg ${
                      item.status == "active"
                        ? "text-green-500"
                        : "text-orange-400"
                    }`}
                  >
                    {item?.status == "active" ? "Active" : "Not Active"}
                  </td>
                  
                  <td className="  pl-4 py-2 md:pr-0 pr-4">
                    <img src={correct} height={25} width={25} />
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
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalItems} // Total number of items
            pageSize={pageSize} // Number of items per page
            showSizeChanger={false} // Hide the size changer
          />
        </div>
      </div>
    </div>
  );
};
export default UserPage;
