import { Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

interface InsertionBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
}

const InsertionBox: React.FC<InsertionBoxProps> = ({
  BoxState,
  BoxStateChange,
}) => {
  const [packageName, setPackageName] = useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [packageCategoryId, setPackageCategoryId] = useState<string>("");
  const [packageTypeId, setPackageTypeId] = useState<string>("");
  const [packageRegionId, setPackageRegionId] = useState<string>("");
  const [packageDuration, setPackageDuration] = useState<string>("");
  const [packageRateNormal, setPackageRateNormal] = useState<string>("");
  const [packageRateDeluxe, setPackageRateDeluxe] = useState<string>("");
  const [packageTotalPersons, setPackageTotalPersons] = useState<string>("");

  const handleSubmit = async () => {
    // Create package object
    const newPackage = {
      package_name: packageName,
      package_description: packageDescription,
      package_category_id: packageCategoryId,
      package_type_id: packageTypeId,
      package_region_id: packageRegionId,
      package_duration: packageDuration,
      package_rate_normal: packageRateNormal,
      package_rate_deluxe: packageRateDeluxe,
      package_total_persons: packageTotalPersons,
    };

    // Make axios call to add package data to the database
    try {
      const response = await axios.post("/api/packages", newPackage);
      console.log("Package added successfully:", response.data);
      // Clear input fields after successful submission
      setPackageName("");
      setPackageDescription("");
      setPackageCategoryId("");
      setPackageTypeId("");
      setPackageRegionId("");
      setPackageDuration("");
      setPackageRateNormal("");
      setPackageRateDeluxe("");
      setPackageTotalPersons("");
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <>
      <Modal
        title="Insert Package Details"
        centered
        visible={BoxState}
        onOk={() => {
          handleSubmit();
          BoxStateChange(false);
        }}
        onCancel={() => BoxStateChange(false)}
        width={1000}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="font-semibold">
            Package Name:
            <Input
              type="text"
              onChange={(e) => setPackageName(e.target.value)}
              value={packageName}
              required
            />
          </label>
          <label className="font-semibold">
            Package Description:
            <Input
              type="text"
              onChange={(e) => setPackageDescription(e.target.value)}
              value={packageDescription}
              required
            />
          </label>
          <label className="font-semibold">
            Package Category ID:{" "}
            <select
              value={packageCategoryId}
              onChange={(e) => setPackageCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category Type</option>
              {/* Add options for package types */}
            </select>
          </label>
          <label className="font-semibold">
            Package Type ID:{" "}
            <select
              value={packageTypeId}
              onChange={(e) => setPackageTypeId(e.target.value)}
              required
            >
              <option value="">Select Package Type</option>
              {/* Add options for package types */}
            </select>
          </label>
          <label className="font-semibold">
            Package Region ID:{" "}
            <select
              value={packageRegionId}
              onChange={(e) => setPackageRegionId(e.target.value)}
              required
            >
              <option value="">Select Package Region</option>
              {/* Add options for package regions */}
            </select>
          </label>
          <label className="font-semibold">
            Package Duration:
            <Input
              type="number"
              onChange={(e) => setPackageDuration(e.target.value)}
              value={packageDuration}
              required
            />
          </label>
          <label className="font-semibold">
            Package Rate Normal:
            <Input
              type="number"
              onChange={(e) => setPackageRateNormal(e.target.value)}
              value={packageRateNormal}
              required
            />
          </label>
          <label className="font-semibold">
            Package Rate Deluxe:
            <Input
              type="number"
              onChange={(e) => setPackageRateDeluxe(e.target.value)}
              value={packageRateDeluxe}
              required
            />
          </label>
          <label className="font-semibold">
            Package Total Persons:
            <Input
              type="number"
              onChange={(e) => setPackageTotalPersons(e.target.value)}
              value={packageTotalPersons}
              required
            />
          </label>
        </form>
      </Modal>
    </>
  );
};

export default InsertionBox;
