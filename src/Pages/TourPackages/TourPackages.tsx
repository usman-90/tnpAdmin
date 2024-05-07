// import React from 'react';
import { Button } from "antd";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Pagination } from "antd";
import axios from "axios";
import Loader from "../../Components/loader";
import InsertionBox from "../../Components/tourpackages/InsertionBox";

export default function TourPackages() {
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState([]);
  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const [openBox, setOpenBox] = useState(false);
  const pageSize = 6;
  const totalItems = data.length;

  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/tourpackages/filter?offset=${
        currentPage - 1
      }&limit=${pageSize}`
    );
    setData(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className=" bg-white rounded-xl h-svh py-4">
        <div className="w-full px-6 flex items-center justify-between border-b py-3 border-gray-300">
          <h2 className=" text-lg font-extrabold">Packages</h2>
          <Button
            className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
            icon={<RiAddLine size={23} className="pt-0.5" />}
            onClick={() => setOpenBox(true)}
          >
            Add
          </Button>
          <InsertionBox BoxState={openBox} BoxStateChange={setOpenBox} />
        </div>
        <div className=" justify-center items-center w-full h-auto">
          <div className="relative justify-center items-center">
            <table className="text-md text-left text-gray-500 m-auto md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase ">
                <tr>
                  <td
                    scope="col"
                    className="pl-6 px-4 py-4 text-md font-semibold"
                  >
                    Package Name
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg ">
                    Description
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Max Persons
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Duration (Days)
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Package Type
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Name
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Category
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Region
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Deluxe Rate
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Normal Rate
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Is Featured
                  </td>
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Best Seller
                  </td>
                  {/* <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Package Details
                  </td> */}
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <div className="flex flex-row gap-2">
                        <p className="text-sm py-2 "> {item?.package_name}</p>
                      </div>
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_description.slice(0, 100) + "..."}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_total_persons}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_duration}
                    </td>

                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_package_types.package_type_name}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.destination_name}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {
                        item.tnp_destinations.tnp_package_categories
                          .package_category_name
                      }
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.tnp_package_regions.region_name}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_deluxe}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_normal}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_isfeatured ? "Yes" : "No"}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_bestseller ? "Yes" : "No"}
                    </td>
                    {/* <td className="  pl-4 md:pr-0 pr-4 text-md">
                      {item.package_details}
                    </td> */}
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
      {loading && <Loader message="Fetching Data" />}
      {/* {deleting && <Loader message="Deleting Data" />} */}
    </>
  );
}
