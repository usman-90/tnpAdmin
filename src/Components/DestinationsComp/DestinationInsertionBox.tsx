import axios from "axios";
import { useState, useEffect } from "react";
import { DownOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Modal, Input } from "antd";
import { Toast } from "../SideToast";

interface Region {
  region_id: number;
  region_name: string;
}

interface Category {
    package_category_id: number;
    package_category_name: string;
}

interface DestinationBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
  fetchData: () => void;
}

const DestinationInsertionBox: React.FC<DestinationBoxProps> = ({
  BoxState,
  BoxStateChange,
  fetchData,
}) => {
  const [data, setData] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [destinationName, setDestinationName] = useState<string>("");
  const [destinationDays, setDestinationDays] = useState<string>("");
  

  useEffect(() => {
    // ------forRegions-----
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/admin/getRegions`
        );
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // ------forCategories------
    const fetchCategoryData = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/admin/getCategories`
          );
          setCategoryData(res.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    fetchData();
    fetchCategoryData();
  }, []);

  
    // --------for DropDown of Region------
  const handleMenuClick = (e: any) => {
    const selectedRegion = data.find(
      (item) => item.region_id === Number(e.key)
    );
    if (selectedRegion) {
      setSelectedRegion(selectedRegion);
      message.info(`Selected Region: ${selectedRegion.region_name}`);
    } else {
      console.error("Selected region not found.");
    }
  };

  const menuItems = data.map((item) => ({
    label: item.region_name,
    key: item.region_id.toString(),
    icon: <CarOutlined />,
  }));

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

//   ------for DropDown of Category-----

const handleMenuClickCategory = (e: any) => {
    const selectedCategory = categoryData.find(
      (item) => item.package_category_id === Number(e.key)
    );
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
      message.info(`Selected Category: ${selectedCategory.package_category_name}`);
    } else {
      console.error("Selected category not found.");
    }
  };

  const menuItemsCategory = categoryData.map((item) => ({
    label: item.package_category_name,
    key: item.package_category_id.toString(),
    icon: <CarOutlined />,
  }));

  const menuPropsCategory = {
    items: menuItemsCategory,
    onClick: handleMenuClickCategory,
  };

  const handleSubmit = async () => {
    console.log("region", selectedRegion?.region_id);
    console.log("category", selectedCategory?.package_category_id);
    console.log("destination name", destinationName);
    console.log("destination days", destinationDays);

    if (!selectedRegion?.region_id || !selectedCategory?.package_category_id || !destinationName || !destinationDays  ){
        console.error("Please select.");
      return;
    }
    
    try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/admin/getDestinations`,
          {
            destination_category_id: selectedCategory.package_category_id,
            destination_region_id: selectedRegion.region_id,
            destination_name: destinationName,
            destination_minimum_tour_days: destinationDays,
          }
        );
        Toast.fire({
          icon: "success",
          title: "Destination Added successfully",
        });
  
        console.log("Submission response:", response.data);
        BoxStateChange(false);
        fetchData();
      } catch (error) {
        console.error("Error creating destination:", error);
      }
  };


  return (
    <Modal
      title="Add Destination"
      centered
      visible={BoxState}
      width={700}
      onOk={handleSubmit}
      onCancel={() => BoxStateChange(false)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-wrap px-5 gap-2">
          {/* ----DROPDOWN FOR DESTINATION NAME------ */}
          <Dropdown menu={menuProps} className="px-5 ">
            <Button>
              <Space className="text-black text-lg">
                {selectedRegion ? selectedRegion.region_name : "Select Region Name"}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          {/* ----DROPDOWN FOR REGION NAME------ */}
          <Dropdown menu={menuPropsCategory} className="px-5 ">
            <Button>
              <Space className="text-black text-lg">
                {selectedCategory ? selectedCategory.package_category_name : "Select Category Name"}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          {/* ----Destination Name ------ */}
          <label className="font-semibold w-44">
              Destination Name
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setDestinationName(e.target.value)}
                value={destinationName}
                required
              />
            </label>

          {/* ------Destination Days-------- */}
          <label className="font-semibold w-44">
              Destination Days
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setDestinationDays(e.target.value)}
                value={destinationDays}
                required
              />
            </label>

          
        </div>
      </form>

    </Modal>
  );
};

export default DestinationInsertionBox;
