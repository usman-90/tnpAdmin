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
        title="Add Package"
        centered
        visible={BoxState}
        onOk={() => {
          handleSubmit();
          BoxStateChange(false);
        }}
        onCancel={() => BoxStateChange(false)}
        width={1000}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-wrap px-5 gap-2">
            <label className="font-semibold w-44">
              Package Name
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Persons
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Category
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Type
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Region
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Rates Normal
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Rates Deluxe
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
          </div>
          {/* <label className="font-semibold">
            Package Description:
            <Input
              type="text"
              onChange={(e) => setPackageDescription(e.target.value)}
              value={packageDescription}
              required
            />
          </label> */}

          <div>
            <h2 className="text-lg font-semibold">Package itinerates</h2>
            <label className="font-semibold flex px-5 flex-col pt-5">
              Days
              <Input
                style={{ width: 144, marginTop: 5 }}
                type="number"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
                required
              />
            </label>
            <div className="flex gap-52 px-5 mt-5">
              <label className="font-semibold w-44">
                Event description
                <Input
                  style={{
                    height: 100,
                    width: 320,
                    marginRight: 10,
                    marginTop: 5,
                  }}
                  type="text"
                  onChange={(e) => setPackageName(e.target.value)}
                  value={packageName}
                  required
                />
              </label>
              <label className="font-semibold h-36 w-44">
                Description
                <Input
                  style={{ height: 100, width: 320, marginTop: 5 }}
                  type="text"
                  onChange={(e) => setPackageName(e.target.value)}
                  value={packageName}
                  required
                />
              </label>
            </div>
            <div>
              <div>
                <h2 className="text-lg font-semibold">Package include</h2>
                <label className="font-semibold px-5 py-2 flex flex-col">
                  Packages
                  <Input
                    style={{ width: 144, marginTop: 5 }}
                    type="text"
                    onChange={(e) => setPackageName(e.target.value)}
                    value={packageName}
                    required
                  />
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold mt-5">Package Exclude</h2>
                <label className="font-semibold px-5 py-2 flex flex-col">
                  Packages
                  <Input
                    style={{ width: 144, marginTop: 5 }}
                    type="text"
                    onChange={(e) => setPackageName(e.target.value)}
                    value={packageName}
                    required
                  />
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold mt-5">Package Images</h2>
                <label className="font-semibold px-5">
                  <Input
                    style={{
                      width: 240,
                      padding: "25px 10px",
                      marginTop: 10,
                    }}
                    type="file"
                    onChange={(e) => setPackageName(e.target.value)}
                    value={packageName}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InsertionBox;
