import { useEffect, useState } from "react";
import { Pagination } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
import { Button } from "antd";
import { RiAddLine } from "react-icons/ri";
import DestinationInsertionBox from "../../Components/DestinationsComp/DestinationInsertionBox";

const Destinations: React.FC = () => {
  const [openBox, setOpenBox] = useState(false);
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState([]);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const pageSize = 10;
  const totalItems = data?.length;
  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/getDestinations`
    );
    setData(res.data.data);
    setLoading(false);
  };
  const DeleteDestination = async (id: number) => {
    setDeleting(true);
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/admin/getDestinations?id=${id}`)
      .then((_) => {
        Toast.fire({
          icon: "success",
          title: "Destination Deleted successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
    setDeleting(false);

    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("destination here",data);

  return (
    <>
      <div className="h-auto overflow-y-auto bg-white w-[95x%] relative m-4 rounded-lg  ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between  m-4  ">
            <h1 className="sm:text-xl text-lg font-semibold">Destinations</h1>

            <Button
              className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
              icon={<RiAddLine size={23} className="pt-0.5" />}
              onClick={() => setOpenBox(true)}
            >
              Add
            </Button>
            <DestinationInsertionBox
              BoxState={openBox}
              BoxStateChange={setOpenBox}
              fetchData={fetchData}
            />
          </div>
          <div className="w-full h-[0.8px] bg-gray-300"></div>
        </div>
        <div className="justify-center items-center w-full  h-auto">
          <div className="relative overflow-x-auto  justify-center items-center  ">
            <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase ">
                <tr className="border-b  border-gray-300 ">
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Destination Category
                  </td>
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Destination Region
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Destination Name
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Destination Minimum Tour Days
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
                        {item?.destination_category_name}
                      </p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 ">
                        {" "}
                        {item?.destination_region_name}
                      </p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 ">
                        {" "}
                        {item?.destination_name}
                      </p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 ">
                        {" "}
                        {item?.destination_minimum_tour_days}
                      </p>
                    </td>
                    
                    <td className="  pl-4 py-2 md:pr-0 pr-4">
                      <button onClick={() => DeleteDestination(item.destination_id)}>
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
              pageSize={pageSize} // Number of items per page
              total={totalItems} // Total number of items
              showSizeChanger={false} // Hide the size changer
            />
          </div>
        </div>
      </div>
      {loading && <Loader message="Fetching Data" />}
      {deleting && <Loader message="Deleting Data" />}
    </>
  );
};
export default Destinations;
