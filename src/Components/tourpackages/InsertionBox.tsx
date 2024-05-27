import { Button, Input, Modal, Space, Switch, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import {
  handlePackageImageUpload,
  handlePackagePDFUpload,
} from "../../config/firebasemethods";
import { getTourPackagesTypes } from "../../apifunctions/packageTypes";
import { getTourPackagesDestination } from "../../apifunctions/packageDestination";

interface InsertionBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
  updatePackages: () => void;
  editingItem: any;
  setEditingItem: (editingItem: any) => void;
  setInsertionDataLoader: (value: boolean) => void;
}

interface PackageTypeStructure {
  package_type_id: number;
  package_type_name: string;
  package_type_value: string;
}

interface PackageDestinationStructure {
  destination_id: number;
  destination_name: string;
}

interface TripDetails {
  TripDetailsAndCostSummary: {
    CostIncludes: string[];
    CostExcludes: string[];
    Itinerary: {
      day: string;
      event: string;
      description: string;
    }[];
    Highlights: string[];
    Images: string[];
    PDFUrl: string;
  };
}

const InsertionBox: React.FC<InsertionBoxProps> = ({
  BoxState,
  BoxStateChange,
  updatePackages,
  editingItem,
  setEditingItem,
  setInsertionDataLoader,
}) => {
  const columns = [
    {
      title: "Days",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Event Title",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleDeleteRow(record)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];
  const [packageName, setPackageName] = useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  // const [packageCategoryId, setPackageCategoryId] = useState<string>("");
  const [packageTypeId, setPackageTypeId] = useState<string>("");
  // const [packageRegionId, setPackageRegionId] = useState<string>("");
  const [packageDuration, setPackageDuration] = useState<string>("");
  const [packageRateNormal, setPackageRateNormal] = useState<string>("");
  const [packageRateDeluxe, setPackageRateDeluxe] = useState<string>("");
  const [packageTotalPersons, setPackageTotalPersons] = useState<string>("");
  const [packageIsFeatured, setPackageIsFeatured] = useState<boolean>(false);
  const [packageDestinationId, setPackageDestinationId] = useState<string>("");
  const [packageIsBestSeller, setPackageIsBestSeller] =
    useState<boolean>(false);
  const [Itinerary, setItinerary] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [CostIncludes, setCostIncludes] = useState<string[]>([]);
  const [CostExcludes, setCostExcludes] = useState<string[]>([]);
  const [Highlights, setHighlights] = useState<string[]>([]);
  const [tabledataIncludepackages, setTabledataIncludepackages] = useState<
    string[]
  >([]);
  const [tabledataCostExcludes, setTabledataCostExcludes] = useState<string[]>(
    []
  );
  const [tabledataHighlights, setTabledataHighlights] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPDFFile, setSelectedPDFFile] = useState<File>();
  const [packageType, setPackageType] = useState<PackageTypeStructure[]>([]);
  // const [packageRegion, setPackageRegion] = useState<PackageRegionStructure[]>([]);
  const [packageDestination, setPackageDestination] = useState<
    PackageDestinationStructure[]
  >([]);

  useEffect(() => {
    if (Object.keys(editingItem).length < 1) {
      return;
    } else {
      setPackageName(editingItem.package_name);
      setPackageDescription(editingItem.package_description);
      // setPackageCategoryId(editingItem.package_category_id);
      setPackageTypeId(editingItem.package_type_id);
      // setPackageRegionId(editingItem.package_region_id);
      setPackageDuration(editingItem.package_duration);
      setPackageRateNormal(editingItem.package_rate_normal);
      setPackageRateDeluxe(editingItem.package_rate_deluxe);
      setPackageTotalPersons(editingItem.package_total_persons);
      setPackageIsFeatured(editingItem.package_isfeatured);
      setPackageIsBestSeller(editingItem.package_bestseller);
      setPackageDestinationId(editingItem.package_destination_id);

      const tripDetails: TripDetails = JSON.parse(editingItem.package_details);
      console.log("tripDetails", tripDetails);

      setTableData(tripDetails.TripDetailsAndCostSummary.Itinerary);
      setTabledataIncludepackages(
        tripDetails.TripDetailsAndCostSummary.CostIncludes
      );
      setTabledataCostExcludes(
        tripDetails.TripDetailsAndCostSummary.CostExcludes
      );
      setTabledataHighlights(tripDetails.TripDetailsAndCostSummary.Highlights);
    }
  }, [editingItem]);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const types = await getTourPackagesTypes();
        // console.log("types==>", types.data);
        setPackageType(types.data);
      } catch (error) {
        // console.error("Error fetching PackagesTypes:", error);
      }
    }

    fetchTypes();
  }, []);

  const handleDailogClose = () => {
    // Clear input fields after successful submission
    setPackageName("");
    setPackageDescription("");
    setPackageTypeId("");
    setPackageDuration("");
    setPackageRateNormal("");
    setPackageRateDeluxe("");
    setPackageTotalPersons("");
    setPackageIsBestSeller(false);
    setPackageIsFeatured(false);
    setPackageDestinationId("");

    setTableData([]);
    setCostExcludes([]);
    setCostIncludes([]);
    setHighlights([]);
    setEditingItem({});

    BoxStateChange(false);
  };

  useEffect(() => {
    async function fetchDestination() {
      try {
        const destination = await getTourPackagesDestination();
        // console.log("region 3==>", destination.data);
        setPackageDestination(destination.data);
      } catch (error) {
        console.error("Error fetching Destination:", error);
      }
    }

    fetchDestination();
  }, []);

  const handleAddPackage = () => {
    setCostIncludes([...CostIncludes, ""]);
  };

  const handleAddCostExclude = () => {
    setCostExcludes([...CostExcludes, ""]);
  };
  const handleAddHighlights = () => {
    setHighlights([...Highlights, ""]);
  };
  const handleDoneHighlights = (index: number) => {
    const newTableData = [...tabledataHighlights];
    newTableData.push(Highlights[index]);
    setTabledataHighlights(newTableData);

    const updatedPackages = [...Highlights];
    updatedPackages.splice(index, 1);
    setHighlights(updatedPackages);
  };

  const handleDoneCostExcludes = (index: number) => {
    const newTableData = [...tabledataCostExcludes];
    newTableData.push(CostExcludes[index]);
    setTabledataCostExcludes(newTableData);

    const updatedPackages = [...CostExcludes];
    updatedPackages.splice(index, 1);
    setCostExcludes(updatedPackages);
  };

  const handleDeletePackage = (indexToDelete: number) => {
    const updatedTableData = tabledataIncludepackages.filter(
      (_, index) => index !== indexToDelete
    );
    setTabledataIncludepackages(updatedTableData);
  };

  const handleDeleteCostExcludes = (indexToDelete: number) => {
    const updatedTableData = tabledataCostExcludes.filter(
      (_, index) => index !== indexToDelete
    );
    setTabledataCostExcludes(updatedTableData);
  };

  const handleDeleteHighlights = (indexToDelete: number) => {
    const updatedTableData = tabledataHighlights.filter(
      (_, index) => index !== indexToDelete
    );
    setTabledataHighlights(updatedTableData);
  };

  const handleDoneIncludePackages = (index: number) => {
    const newTableData = [...tabledataIncludepackages];
    newTableData.push(CostIncludes[index]);
    setTabledataIncludepackages(newTableData);

    const updatedPackages = [...CostIncludes];
    updatedPackages.splice(index, 1);
    setCostIncludes(updatedPackages);
  };

  const handleAddItinerary = () => {
    setItinerary([...Itinerary, { day: "", event: "", description: "" }]);
  };

  const handleDeleteRow = (record: any) => {
    const newTableData = tableData.filter((item) => item !== record);
    setTableData(newTableData);
  };

  const handleFileChange = async (info: any): Promise<void> => {
    // const files = info?.target.files;
    setSelectedFiles(Array.from(info?.target.files));
  };

  const handleFilePDFChange = async (info: any): Promise<void> => {
    setSelectedPDFFile(info?.target.files[0]);
  };

  const handleDone = (index: number) => {
    const newTableData = [...tableData];
    console.log("Item added", newTableData);
    newTableData.push({
      key: newTableData.length + 1,
      day: "Day " + Itinerary[index].day,
      event: Itinerary[index].event,
      description: Itinerary[index].description,
    });
    setTableData(newTableData);
    // Remove the itinerary from the list
    const updatedItinerary = [...Itinerary];
    updatedItinerary.splice(index, 1);
    setItinerary(updatedItinerary);
  };

  const uploadImages = async (imagesList: File[]) => {
    let updatedImages = null;
    updatedImages = await Promise.all(
      imagesList?.map(async (imageFile) => {
        return await handlePackageImageUpload(imageFile);
      })
    );
    return updatedImages;
  };

  const uploadPDF = async (pdfFile?: File) => {
    let updatedPDF = await handlePackagePDFUpload(pdfFile);
    return updatedPDF;
  };

  const handleSubmit = async (event: any) => {
    BoxStateChange(false);
    setInsertionDataLoader(true);
    event.preventDefault();

    const imageUrls =
      Object.keys(editingItem).length < 1
        ? await uploadImages(selectedFiles)
        : JSON.parse(editingItem.package_details).TripDetailsAndCostSummary
            .Images;

    const pdfUrl =
      Object.keys(editingItem).length < 1
        ? await uploadPDF(selectedPDFFile)
        : JSON.parse(editingItem.package_details).TripDetailsAndCostSummary
            .PDFUrl;

    // console.log("both urls", imageUrls, pdfUrl);

    const formData = new FormData();
    formData.append("package_id", editingItem?.package_id);
    formData.append("package_name", packageName);
    formData.append("package_total_persons", packageTotalPersons);
    // formData.append("package_category_id", packageCategoryId);
    formData.append("package_type_id", packageTypeId);
    // formData.append("package_region_id", packageRegionId);
    formData.append("package_description", packageDescription);
    formData.append("package_rate_normal", packageRateNormal);
    formData.append("package_rate_deluxe", packageRateDeluxe);
    formData.append("package_duration", packageDuration);
    formData.append(
      "package_isfeatured",
      packageIsFeatured.toString() === "false" ? "" : "true"
    );
    formData.append(
      "package_bestseller",
      packageIsBestSeller.toString() === "false" ? "" : "true"
    );
    formData.append("package_description", packageDescription);
    formData.append("package_destination_id", packageDestinationId.toString());

    formData.append(
      "package_details",
      JSON.stringify({
        TripDetailsAndCostSummary: {
          Itinerary: tableData,
          CostIncludes: tabledataIncludepackages,
          CostExcludes: tabledataCostExcludes,
          Highlights: tabledataHighlights,
          Images: imageUrls,
          PDFUrl: pdfUrl,
        },
      })
    );

    // console.log("Submit time package_details", formData);

    try {
      if (Object.keys(editingItem).length > 0) {
        const response = await axios.put(
          process.env.REACT_APP_SERVER_URL + "/tourpackages",
          formData
        );
        console.log("Package updated successfully:", response.data);
      } else {
        const response = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/tourpackages",
          formData
        );
        console.log("Package added successfully:", response.data);
      }
      //Clear input fields after success
      updatePackages();
      setPackageName("");
      setPackageDescription("");
      setPackageTypeId("");
      setPackageDuration("");
      setPackageRateNormal("");
      setPackageRateDeluxe("");
      setPackageTotalPersons("");
      setPackageIsBestSeller(false);
      setPackageIsFeatured(false);
      setPackageDestinationId("");
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  useEffect(() => {
    // console.log("p.t==>", packageType);
  }, [packageType]);

  return (
    <>
      <Modal
        title="Add Package"
        centered
        open={BoxState}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={handleDailogClose}
        width={1000}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          method="post"
          encType="multipart/form-data">
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
                onChange={(e) => setPackageTotalPersons(e.target.value)}
                value={packageTotalPersons}
                required
              />
            </label>

            {/* <label className="font-semibold w-44">
              Package Category
              <select
                style={{
                  marginTop: 5,
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  padding: "6px 7px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setPackageCategoryId(e.target.value)}
                value={packageCategoryId}
                required>
                <option value="">Select</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </label> */}

            <label className="font-semibold w-44">
              Package Type
              <select
                style={{
                  marginTop: 5,
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  padding: "6px 7px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setPackageTypeId(e.target.value)}
                value={packageTypeId}
                required>
                <option value="">Select</option>
                {packageType?.map((type, index) => (
                  <option key={index} value={type.package_type_id}>
                    {type.package_type_value.charAt(0).toUpperCase() +
                      type.package_type_value.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            {/* <label className="font-semibold w-44">
              Package Region
              <select
                style={{
                  marginTop: 5,
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  padding: "6px 7px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setPackageTypeId(e.target.value)}
                value={packageRegion}
                required>
                <option value="">Select</option>
                {packageRegion?.map((region, index) => (
                  <option key={index} value={region.region_id}>
                    {region.region_name.charAt(0).toUpperCase() +
                      region.region_name.slice(1)}
                  </option>
                ))}
              </select>
            </label> */}

            <label className="font-semibold w-44">
              Package Rates Normal
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageRateNormal(e.target.value)}
                value={packageRateNormal}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Rates Deluxe
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageRateDeluxe(e.target.value)}
                value={packageRateDeluxe}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Duration
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageDuration(e.target.value)}
                value={packageDuration}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Destination
              <select
                style={{
                  marginTop: 5,
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  padding: "6px 7px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setPackageDestinationId(e.target.value)}
                value={packageDestinationId}
                required>
                <option value="">Select</option>
                {packageDestination.map((destination, index) => (
                  <option key={index} value={destination.destination_id}>
                    {destination.destination_name}
                  </option>
                ))}
              </select>
            </label>

            <br />
            <label className="font-semibold w-44 flex flex-col">
              Package Featured
              <Switch
                className="w-3 mt-2"
                onChange={(e) => setPackageIsFeatured(e.valueOf())}
                value={packageIsFeatured}
              />
            </label>
            <label className="font-semibold w-44 flex flex-col">
              Package Best Seller
              <Switch
                className="w-3 mt-2"
                onChange={(e) => setPackageIsBestSeller(e.valueOf())}
                value={packageIsBestSeller}
              />
            </label>

            <label className="font-semibold w-full">
              Package Description
              <TextArea
                style={{ marginTop: 5 }}
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) => setPackageDescription(e.target.value)}
                value={packageDescription}
                required
              />
            </label>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Package Itineraries</h2>
            <Button type="primary" onClick={handleAddItinerary}>
              Add Itinerary
            </Button>
            {Itinerary.map((itinerary, index) => (
              <div className="" key={index}>
                <h2 className="text-lg font-semibold">
                  Itinerary {tableData.length + index + 1}
                </h2>
                <label className="font-semibold flex px-5 flex-col pt-5">
                  Day
                  <Input
                    style={{ width: 144, marginTop: 5 }}
                    type="number"
                    onChange={(e) => {
                      const newItinerary = [...Itinerary];
                      newItinerary[index].day = e.target.value;
                      setItinerary(newItinerary);
                    }}
                    value={itinerary.day}
                    required
                  />
                </label>
                <div className="flex gap-48 px-5 mt-5">
                  <label className="font-semibold w-44">
                    Event Title
                    <TextArea
                      style={{
                        height: 100,
                        width: 320,
                        marginRight: 10,
                        marginTop: 5,
                      }}
                      autoSize={{ minRows: 1, maxRows: 5 }}
                      onChange={(e) => {
                        const newItinerary = [...Itinerary];
                        newItinerary[index].event = e.target.value;
                        setItinerary(newItinerary);
                      }}
                      value={itinerary.event}
                      required
                    />
                  </label>
                  <div className=" flex justify-center items-center gap-4">
                    <div className="flex flex-col   ">
                      <label className="font-semibold  w-44">Description</label>
                      <TextArea
                        style={{ height: 100, width: 320, marginTop: 5 }}
                        autoSize={{ minRows: 4, maxRows: 5 }}
                        onChange={(e) => {
                          const newItinerary = [...Itinerary];
                          newItinerary[index].description = e.target.value;
                          setItinerary(newItinerary);
                        }}
                        value={itinerary.description}
                        required
                      />
                    </div>
                    <Button
                      className="bg-yellow-400 "
                      onClick={() => handleDone(index)}>
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {tableData.length > 0 && (
              <Table columns={columns} dataSource={tableData} />
            )}
            <div>
              <div>
                <h2 className="text-lg font-semibold">Cost Include</h2>
                <Button type="primary" onClick={handleAddPackage}>
                  Add Cost Include
                </Button>
                {CostIncludes.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">
                      Package {tabledataIncludepackages.length + index + 1}
                    </label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedPackages = [...CostIncludes];
                        updatedPackages[index] = e.target.value;
                        setCostIncludes(updatedPackages);
                      }}
                      required
                    />
                    <Button
                      className="bg-yellow-400 w-20 mx-auto"
                      onClick={() => handleDoneIncludePackages(index)}>
                      Done
                    </Button>
                  </div>
                ))}
              </div>
              {tabledataIncludepackages.length > 0 && (
                <Table
                  dataSource={tabledataIncludepackages.map((item) => ({
                    package: item,
                  }))}
                  columns={[
                    {
                      title: "Package",
                      dataIndex: "package",
                      key: "package",
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, _: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeletePackage(index)}
                        />
                      ),
                    },
                  ]}
                />
              )}

              <div>
                <h2 className="text-lg font-semibold mt-5">Cost Exclude</h2>
                <Button type="primary" onClick={handleAddCostExclude}>
                  Add Cost Exclude
                </Button>
                {CostExcludes.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">
                      Package {tabledataCostExcludes.length + index + 1}
                    </label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedCost = [...CostExcludes];
                        updatedCost[index] = e.target.value;
                        setCostExcludes(updatedCost);
                      }}
                      required
                    />
                    <Button
                      className="bg-yellow-400 w-20 mx-auto"
                      onClick={() => handleDoneCostExcludes(index)}>
                      Done
                    </Button>
                  </div>
                ))}
              </div>
              {tabledataCostExcludes.length > 0 && (
                <Table
                  dataSource={tabledataCostExcludes.map((item) => ({
                    package: item,
                  }))}
                  columns={[
                    {
                      title: "Cost Exclude",
                      dataIndex: "package",
                      key: "package",
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, _: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteCostExcludes(index)}
                        />
                      ),
                    },
                  ]}
                />
              )}

              <div>
                <h2 className="text-lg font-semibold mt-5">Highlights</h2>
                <Button type="primary" onClick={handleAddHighlights}>
                  Add Highlights
                </Button>
                {Highlights.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">
                      Package {tabledataHighlights.length + index + 1}
                    </label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedHighlight = [...Highlights];
                        updatedHighlight[index] = e.target.value;
                        setHighlights(updatedHighlight);
                      }}
                      required
                    />
                    <Button
                      className="bg-yellow-400 w-20 mx-auto"
                      onClick={() => handleDoneHighlights(index)}>
                      Done
                    </Button>
                  </div>
                ))}
              </div>
              {tabledataHighlights.length > 0 && (
                <Table
                  dataSource={tabledataHighlights.map((item) => ({
                    package: item,
                  }))}
                  columns={[
                    {
                      title: "Highlights",
                      dataIndex: "package",
                      key: "package",
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, _: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteHighlights(index)}
                        />
                      ),
                    },
                  ]}
                />
              )}
              {Object.keys(editingItem).length < 1 && (
                <div>
                  <h2 className="text-lg font-semibold mt-5">Package Images</h2>
                  <label className="font-semibold px-5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple={true}
                    />
                  </label>
                </div>
              )}
              {/* {console.log("editingItem",editingItem)} */}
              {Object.keys(editingItem).length < 1 && (
                <div>
                  <h2 className="text-lg font-semibold mt-5">Upload PDF</h2>
                  <label className="font-semibold px-5">
                    <input
                      type="file"
                      accept=".docx,application/pdf"
                      onChange={handleFilePDFChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InsertionBox;
