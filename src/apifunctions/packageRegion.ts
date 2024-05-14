import axios from "axios";

interface PackageRegionStructure {
  region_id: number;
  region_name: string;
}

const HOST_URL = process.env.REACT_APP_SERVER_URL;

export async function getTourPackagesRegion(
  extededRoute = "/admin/getRegions"
): Promise<{
  data: PackageRegionStructure[];
  status: number;
  message: string;
}> {
  try {
    const response = await axios.get(HOST_URL + extededRoute);
    // console.log("res 2==>", response.data);
    return {
      data: response.data.data,
      message: "success",
      status: 200,
    };
  } catch (error) {
    return {
      data: [],
      status: 400,
      message: "failed",
    };
  }
}
