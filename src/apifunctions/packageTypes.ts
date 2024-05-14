import axios from "axios";

interface PackageTypeStructure {
  package_type_id: number;
  package_type_name: string;
  package_type_value: string;
}


const HOST_URL = process.env.REACT_APP_SERVER_URL;

export async function getTourPackagesTypes(
  extededRoute = "/packagetypes"
): Promise<{
  data: PackageTypeStructure[];
  status: number;
  message: string;
}> {
  try {
    const response = await axios.get(HOST_URL + extededRoute);
    // console.log("res==>", response.data.package_types);
    return {
      data: response.data.package_types,
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
