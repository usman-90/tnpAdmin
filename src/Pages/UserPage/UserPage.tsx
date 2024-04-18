import { CiEdit } from "react-icons/ci";
import correct from "../../../public/Correct.png"

const data = [
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "not-active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
  { name: "Asad", email: "asad@gmail.com", status: "active", remove: true },
];

const UserPage: React.FC = () => {
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
            <table className="text-md  text-left   text-gray-500 dark:text-gray-400 m-auto   lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
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
                {data?.map((item) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                        <div className="flex flex-row gap-2"><p className="text-lg py-2 "> {item?.name}</p><div className="w-10 h-10 bg-gray-200 rounded-full"></div></div>
                     
                    </td>
                   
                    <td className="  pl-4 md:pr-0 pr-4 text-lg">
                      {item.email}
                    </td>
                    
                    <td
                      className={` pl-4  py-2 md:pr-0 pr-4 text-lg ${
                        item.status == "active"
                          ? "text-green-500"
                          : "text-orange-400"
                      }`}
                    >
                      {item?.status == "active" ? "Active" : "Not Active"}
                    </td>
                    <td className="  pl-4 py-2 md:pr-0 pr-4"><img src={correct} height={25} width={25}/></td>
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
        </div>
  
    
    </div>
  );
};
export default UserPage;
