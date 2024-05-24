import { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
import { RiAddLine } from "react-icons/ri";
import TripInsertionBox from "../../Components/TripComp/TripInsertionBox";

const LastTrips: React.FC = () => {
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
      `${process.env.REACT_APP_SERVER_URL}/admin/getTrips?page=${currentPage}&limit=${pageSize}`
    );
    setData(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <div className="h-auto bg-white w-[95%] relative m-4 rounded-lg">
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
