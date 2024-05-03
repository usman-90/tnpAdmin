import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";

const UserPage: React.FC = () => {
  const [currentPage, setCurrPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const [data, setData] = useState([]);
  const pageSize = 10;
  const totalItems = data?.length;
  const fetchData = async () => {
    console.log("hitting", process);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/getTrips?page=${currentPage}`
    );
    setData(res.data.data);
  };
  const DeleteTrip = async (id: number) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/getTrips?id=${id}`)
      .then((res) => {
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

    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-auto overflow-y-auto bg-white w-[95x%] relative m-4 rounded-lg  ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between  m-4  ">
          <h1 className="sm:text-xl text-lg font-semibold">Trips</h1>
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
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td
                    scope="row"
                    className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                  >
                    <p className="text-lg py-2 ">
                      {" "}
                      {item?.tnp_packages?.package_name}
                    </p>
                  </td>
                  <td
                    scope="row"
                    className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                  >
                    <p className="text-lg py-2 ">
                      {" "}
                      {item?.tnp_packages?.package_total_persons}
                    </p>
                  </td>

                  <td className="  pl-4 md:pr-0 pr-4 text-lg">
                    {item?.trip_date}
                  </td>
                  <td className="  pl-4 md:pr-0 pr-4 text-lg">
                    {item?.trip_booked_count}
                  </td>

                  <td className="  pl-4 py-2 md:pr-0 pr-4">
                    <button onClick={() => DeleteTrip(item.trip_id)}>
                      <ImCancelCircle className="text-red-700 hover:text-red-500 text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
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
