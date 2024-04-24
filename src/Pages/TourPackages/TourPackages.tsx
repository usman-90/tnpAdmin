// import React from 'react';
import { Button } from "antd";
import InsertionBox from "../../Components/tourpackages/InsertionBox";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Pagination } from "antd";

const data = [
  {
    package_name: "All Girls Trip to Kashmir",
    duration: "15 days",
    nop: "12",
    category: "North",
    rate_delux: "35,000 PKR",
    rate_normal: "25,000 PKR",
  },
  {
    package_name: "Skardu & Bashu Valley",
    duration: "15 days",
    nop: "12",
    category: "North",
    rate_delux: "35,000 PKR",
    rate_normal: "25,000 PKR",
  },
  {
    package_name: "Hunza & Skardu",
    duration: "15 days",
    nop: "12",
    category: "North",
    rate_delux: "35,000 PKR",
    rate_normal: "25,000 PKR",
  },
  {
    package_name: "Hunza & Naltar",
    duration: "15 days",
    nop: "12",
    category: "North",
    rate_delux: "35,000 PKR",
    rate_normal: "25,000 PKR",
  },
];

export default function TourPackages() {
  const [currentPage, setCurrPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const [openBox, setOpenBox] = useState(false);
  const pageSize = 6;
  const totalItems = data.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  return (
    <div className=" bg-white rounded-xl h-svh py-4">
      <div className="w-full px-6 flex items-center justify-between border-b py-3 border-gray-300">
        <h2 className=" text-lg font-extrabold">Packages</h2>
        <Button
          className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
          icon={<RiAddLine size={23} className="pt-0.5" />}
          onClick={() => setOpenBox(true)}>
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
                  className="pl-6 px-4 py-4 text-md font-semibold">
                  Package Name
                </td>
                <td scope="col" className="px-4 py-4 text-md font-semibold">
                  Duration
                </td>
                <td scope="col" className="px-4 py-4 text-md font-semibold">
                  Person
                </td>
                <td scope="col" className="px-4 py-4 text-md font-semibold">
                  Category
                </td>
                <td scope="col" className="px-4 py-4 text-md font-semibold">
                  Rate-Deluxe
                </td>
                <td scope="col" className="px-4 py-4 text-md font-semibold">
                  Rate-Normal
                </td>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td
                    scope="row"
                    className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg ">
                    <div className="flex flex-row gap-2">
                      <p className="text-sm py-2 "> {item?.package_name}</p>
                    </div>
                  </td>

                  <td className="  pl-4 md:pr-0 pr-4 text-md">
                    {item.duration}
                  </td>
                  <td className="  pl-4 md:pr-0 pr-4 text-md">{item.nop}</td>
                  <td className="  pl-4 md:pr-0 pr-4 text-md">
                    {item.category}
                  </td>
                  <td className="  pl-4 md:pr-0 pr-4 text-md">
                    {item.rate_delux}
                  </td>
                  <td className="  pl-4 md:pr-0 pr-4 text-md">
                    {item.rate_normal}
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
}
