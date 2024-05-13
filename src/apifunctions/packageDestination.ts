import axios from "axios";

interface PackageDestinationStructure {
  destination_id: number;
  destination_name: string;
}

const HOST_URL = process.env.REACT_APP_SERVER_URL;

export async function getTourPackagesDestination(
  extededRoute = "/destinations"
): Promise<{
  data: PackageDestinationStructure[];
  status: number;
  message: string;
}> {
  try {
    const response = await axios.get(HOST_URL + extededRoute);
    // console.log("res 4==>", response.data);
    return {
      data: response.data.destinations,
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
