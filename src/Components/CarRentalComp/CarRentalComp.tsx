import { Button, Empty, Modal, Pagination, Spin } from "antd";
import { message } from "antd";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import CarRentalInsertionBox from "./CarRentalInsetionBox";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../loader";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const CarRentalComp: React.FC = () => {
  const [openBox, setOpenBox] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [cars, setCars] = useState<any[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [editingItem, setEditingItem] = useState<any>({});
  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const fetchCars = async () => {
    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/car/all", {
      params: {
        page: currPage,
      },
    });
    setCars(res?.data?.cars);
    setTotalCars(res?.data?.totalCars);
    console.log(res?.data);
  };

  console.log(cars);

  console.log("LLLLLLLLLL", isLoading);
  useEffect(() => {
    setIsLoading(true);
    fetchCars();
    setIsLoading(false);
  }, [currPage]);

  const handleDelete = async (carId: string) => {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/car/one",
      {
        params: {
          carId,
        },
      }
    );

    if (res.data.message === "success") {
      return true;
    }
    return false;
  };

  const pageSize = 8;

  const EditCar =(value: number)=>{
    const index = cars.findIndex((e)=>e.car_id === value);
    // const car = cars.find((e)=>e.car_id === value);
    console.log("This car will be edited", index );
    setEditingItem(cars[index]);
    setOpenBox(true);
  }

  return (
    <div className="w-full relative bg-white p-4 flex flex-col gap-4 rounded-xl">
      {contextHolder}
      <div className="flex flex-row justify-between py-4">
        <p className="text-xl font-bold mb-4 pl-2">Cars</p>
        <Button
          className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
          icon={<RiAddLine size={23} className="pt-0.5" />}
          onClick={() => setOpenBox(true)}
        >
          Add
        </Button>
        <CarRentalInsertionBox
          setIsLoading={setIsLoading}
          fetchCars={fetchCars}
          BoxState={openBox}
          BoxStateChange={setOpenBox}
          setEditingItem={setEditingItem}
          editingItem={editingItem}
        />
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
                <div className="flex flex-row">Image</div>
              </td>
              <td scope="col" className="pl-6 px-4 py-4 font-medium ">
                <div className="flex flex-row">Car Name</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium ">
                <div className="flex flex-row">Color</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Price Per Day</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Car Class</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium ">
                <div className="flex flex-row">Engine</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Fuel Type</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Make</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Mileage</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Model</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Transmission</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Year</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Price per km</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Car rooms</div>
              </td>
              <td scope="col" className="px-4 py-4 font-medium">
                <div className="flex flex-row">Actions</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {!cars.length && (
              <tr className="w-[100vw]  flex justify-center">
                <td colSpan={7}>
                  <Empty />
                </td>
              </tr>
            )}
            {cars?.map((car: any, i: number) => (
              <tr
                key={255 + i}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="  pl-4 md:pr-0 pr-4 text-sm text-black">
                  <Link to={car?.car_image} target="_blank">
                    <img
                      className="w-10 h-10 bg-gray-200 rounded-full"
                      src={car?.car_image}
                    ></img>
                  </Link>
                </td>
                <td
                  scope="row"
                  className=" text-gray-900 whitespace-nowrap dark:text-white pl-6 py-2 md:pr-0 pr-4 text-lg "
                >
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col text-sm pt-3">
                      <p> {car?.car_name}</p>
                    </div>
                  </div>
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
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.engine}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.fuelType}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.make}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.mileage}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.model}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {car?.transmission}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.year}</td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">
                  {car?.pricePerKm}
                </td>
                <td className="  pl-4 md:pr-0 pr-4 text-sm">{car?.carRoom}</td>
                {/* <td
                  onClick={() => {
                    setSelectedCar(car?.car_id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="  pl-4 md:pr-0 pr-4 text-md text-red-500 cursor-pointer "
                >
                  <MdDelete />
                </td> */}
                 <div className="flex justify-center items-center">
                        <FaEdit
                          color="green"
                          onClick={()=>EditCar(car?.car_id)}
                        />{" "}
                        |{" "}
                        <AiOutlineDelete
                          color="red"
                          onClick={() => {
                            setSelectedCar(car?.car_id);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </div>
              </tr>
            ))}
            <Modal
              title="Delete Car"
              centered
              open={isDeleteModalOpen}
              onOk={async () => {
                setIsLoading(true);
                const res = await handleDelete(selectedCar);
                if (res) {
                  setIsDeleteModalOpen(false);
                  messageApi.open({
                    type: "success",
                    content: "Car deleted successfully!",
                  });
                  fetchCars();
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
              <p className="text-red-500">
                Are you sure? All the bookings of this car will also be deleted.
              </p>
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
        className={`${totalCars < pageSize ? "hidden" : "block"}`}
        current={currPage}
        onChange={handlePageChange}
        total={totalCars} // Total number of items
        pageSize={pageSize} // Number of items per page
        showSizeChanger={false} // Hide the size changer
      />
    </div>
  );
};
export default CarRentalComp;
