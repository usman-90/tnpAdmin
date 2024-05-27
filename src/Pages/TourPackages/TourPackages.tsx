import { Button } from "antd";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Pagination } from "antd";
import axios from "axios";
import Loader from "../../Components/loader";
import InsertionBox from "../../Components/Tourpackages/InsertionBox";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { deletePackagePhoto } from "../../config/firebasemethods";
import DeleteModal from "../../Components/Tourpackages/DeleteModal";
import { Toast } from "../../Components/SideToast";

export default function TourPackages() {
  const [currentPage, setCurrPage] = useState(1);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [addingLoading, setAddingLoading] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>({});
  const [openBox, setOpenBox] = useState(false);
  const pageSize = 8;
  const [totalItems, setTotalItems] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchData = async () => {
    setFetchingLoading(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/tourpackages/filter?offset=${
        currentPage - 1
      }&limit=${pageSize}`
    );
    console.log("response getPackages", res);
    setTotalItems(res.data.totalCount);
    setData(res.data.data);
    setFetchingLoading(false);
  };

  useEffect(() => {
    console.log("Current page", currentPage);
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const onEditClick = (value: number) => {
    const index = data.findIndex((e) => e.package_id === value);
    console.log("edit got click", index);
    setEditingItem(data[index]);
    setOpenBox(true);
  };

  const onDeleteClick = (value: number) => {
    const index = data.findIndex((e) => e.package_id === value);
    setEditingItem(data[index]);
    setIsDeleteModalOpen(true);
  };

  const startDelete = async () => {
    console.log("startDelete");
    // setIsDeleteModalOpen(false);
    setDeletingLoading(true);

    let packageDetails;
    try {
      packageDetails = JSON.parse(editingItem.package_details);
    } catch (e) {
      packageDetails = editingItem.package_details;
    }

    if (packageDetails?.TripDetailsAndCostSummary?.Images) {
      const images = packageDetails.TripDetailsAndCostSummary.Images;
      if (images.length > 0) {
        try {
          await handleDeleteImages(images);
          console.log("Images deleted successfully.");
        } catch (error) {
          console.error("Error deleting images:", error);
        }
      } else {
        console.log("No images found in package details.");
      }
    } else {
      console.log("No images found in package details.");
    }

    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/tourpackages`,
      {
        params: { id: editingItem.package_id },
      }
    );

    if (response.status === 200) {
      console.log("Package deleted successfully.");
      Toast.fire({
        icon: "success",
        title: "Trip deleted successfully",
      });
      fetchData();
    } else {
      console.error("Failed to delete package:", response.data);
      Toast.fire({
        icon: "error",
        title: "Error in deleting package",
      });
    }

    setIsDeleteModalOpen(false);
    setDeletingLoading(false);
  };

  const handleDeleteImages = async (imagesList: string[]) => {
    let updatedImages = null;
    updatedImages = await Promise.all(
      imagesList?.map(async (imageFile) => {
        return await deletePackagePhoto(imageFile);
      })
    );
    return updatedImages;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInsertion = async () => {
    setAddingLoading(true);
    await fetchData();
    setAddingLoading(false);
  };

  return (
    <>
      <div className="relative z-10 h-0 w-full">
        {(fetchingLoading || addingLoading || deletingLoading) && (
          <Loader
            message={
              fetchingLoading
                ? "Fetching Data"
                : addingLoading
                ? "Adding"
                : deletingLoading
                ? "Deleting"
                : ""
            }
          />
        )}
      </div>
      <div className="bg-white rounded-xl w-full h-svh py-4">
        <div className="w-full px-6 flex items-center justify-between border-b py-3 border-gray-300">
          <h2 className="text-lg font-extrabold">Packages</h2>
          <Button
            className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
            icon={<RiAddLine size={23} className="pt-0.5" />}
            onClick={() => setOpenBox(true)}>
            Add
          </Button>
          <InsertionBox
            setInsertionDataLoader={setAddingLoading}
            BoxState={openBox}
            BoxStateChange={setOpenBox}
            updatePackages={handleInsertion}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        </div>
        <div className="justify-center items-center w-full">
          <div className="relative justify-center items-center overflow-x-auto overflow-y-hidden">
            <table className="text-md text-left text-gray-500 m-auto md:w-full">
              <thead className="text-xs text-gray-700 uppercase w-full">
                <tr>
                  <td
                    scope="col"
                    className="pl-6 px-4 py-4 font-semibold text-lg">
                    Package Name
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
                  <td scope="col" className="px-4 py-4 font-bold text-lg">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={item.package_id}>
                    <td
                      scope="row"
                      className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg">
                      <div className="flex flex-row gap-2">
                        <p className="text-sm py-2 text-md">
                          {item?.package_name}
                        </p>
                      </div>
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_total_persons}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_duration}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_package_types.package_type_name}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.destination_name}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {
                        item.tnp_destinations.tnp_package_categories
                          .package_category_name
                      }
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.tnp_package_regions.region_name}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_deluxe}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_normal}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_isfeatured ? "Yes" : "No"}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_bestseller ? "Yes" : "No"}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      <div className="flex justify-center items-center">
                        <FaEdit
                          color="green"
                          onClick={() => onEditClick(item.package_id)}
                        />{" "}
                        |{" "}
                        <AiOutlineDelete
                          color="red"
                          onClick={() => onDeleteClick(item.package_id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={totalItems}
              pageSize={pageSize}
              showSizeChanger={false}
            />
          </div>
          <DeleteModal
            onDeleteHandle={startDelete}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            packageItem={editingItem}
          />
        </div>
      </div>
    </>
  );
}
