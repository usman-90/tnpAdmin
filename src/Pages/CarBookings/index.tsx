import { Empty, Modal, Pagination, Spin } from "antd";
import { message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const CarBookings: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [bookings, setBookings] = useState<any[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const fetchBookings = async () => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/car/booking",
      {
        params: {
          page: currPage,
        },
      }
    );
    setBookings(res?.data?.bookings);
    setTotalBookings(res?.data?.totalBookings);
    console.log(res?.data);
  };

  console.log(bookings);

  useEffect(() => {
    setIsLoading(true);
    fetchBookings();
    setIsLoading(false);
  }, [currPage]);

  const handleDelete = async (bookingId: string) => {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/car/booking",
      {
        params: {
          bookingId,
        },
      }
    );

    if (res.data.message === "success") {
      return true;
    }
    return false;
  };

  const pageSize = 8;

  return (
    <div className="w-full relative  bg-white p-4 flex flex-col gap-4 rounded-xl">
      {contextHolder}
      <div className="flex flex-row justify-between py-4">
        <p className="text-xl font-bold mb-4 pl-2">Car Bookings</p>
      </div>
      <div className="h-[0.5px] w-full bg-gray-400"></div>
      <div className="relative overflow-x-auto  justify-center items-center  ">
        <table className="text-md relative  text-left  text-gray-500 dark:text-gray-400 m-auto   lg:w-full md:w-full h-full">
          {isLoading && (
            <div className="absolute w-full h-full flex justify-center items-center bg-white top-0 left-0">
              <Spin size="large" />
            </div>
          )}
          <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
            <tr className=" ">
              <td scope="col" className="pl-6 px-4 py-4 font-medium ">
                <div className="flex flex-row">Booking Id</div>
              </td>
              <td scope="col" className="pl-6 px-4 py-4 font-medium ">
                <div className="flex flex-row">Car Name</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium ">
                <div className="flex flex-row">Customer name</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Pick up date </div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Drop off date</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium ">
                <div className="flex flex-row">Pickup Location</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Drop off location</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {!bookings.length && (
              <tr className="w-[100vw]  flex justify-center">
                <td colSpan={7}>
                  <Empty />
                </td>
              </tr>
            )}
            {bookings?.map((b: any, i: number) => (
              <tr
                key={255 + i}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg "
                >
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col text-sm pt-3">
                      <p className="  "> {b?.car_booking_id}</p>
                    </div>
                  </div>
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm text-black">
                  <div className="flex flex-row ">{b?.tnp_cars?.car_name}</div>
                </td>

                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {b?.tnp_user?.name}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm ">
                  {new Date(b?.pickup_date).toDateString()}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {new Date(b?.dropoff_date).toDateString()}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {b?.pickup_location}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {b?.dropoff_location}
                </td>
                <td
                  onClick={() => {
                    setSelectedBooking(b?.car_booking_id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="  pl-4 md:pr-0 pr-4 text-md text-red-500 cursor-pointer "
                >
                  <MdDelete />
                </td>
              </tr>
            ))}
            <Modal
              title="Delete Car Booking"
              centered
              open={isDeleteModalOpen}
              onOk={async () => {
                setIsLoading(true);
                const res = await handleDelete(selectedBooking);
                if (res) {
                  setIsDeleteModalOpen(false);
                  messageApi.open({
                    type: "success",
                    content: "Car Booking deleted successfully!",
                  });
                  fetchBookings();
                  setIsLoading(false);
                  return;
                }
                messageApi.open({
                  type: "error",
                  content: "Ops! could not be deleted!",
                });
                setIsLoading(false);
              }}
              onCancel={() => setIsDeleteModalOpen(true)}
              width={1000}
            >
              <p className="text-red-500">Are you sure?</p>
            </Modal>

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
      <Pagination
        className={`${totalBookings < pageSize ? "hidden" : "block"}`}
        current={currPage}
        onChange={handlePageChange}
        total={totalBookings} // Total number of items
        pageSize={pageSize} // Number of items per page
        showSizeChanger={false} // Hide the size changer
      />
    </div>
  );
};
export default CarBookings;
