import { Button, Input, Modal, Select, Space, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";
import { useEffect, useState } from "react";
import { uploadImageAndGetURL } from "../../config/firebasemethods";

interface InsertionBoxProps {
    BoxState: boolean;
    BoxStateChange: (value: any) => void;
}



const CarRentalInsertionBox: React.FC<InsertionBoxProps> = ({
    BoxState,
    BoxStateChange,
}) => {

    const [carClasses, setCarClasses] = useState([])
    const [carImage, setCarimage] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const [carDetails, setCarDetails] = useState({
        car_name: "",
        make: "",
        model: "",
        year: "",
        color: "",
        engine: "",
        transmission: "",
        fuelType: "",
        pricePerDay: "",
        mileage: "",
        class_id: "",
        car_image: "",
        pricePerKm:""
    })
    const fetchCarClasses = async () => {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/car/class")
        console.log("CLLL", res.data)
        setCarClasses(res?.data?.data)
    }
    console.log("classes", carClasses)
    useEffect(() => {
        fetchCarClasses()
    }, [])

    const handleChange = (name: string, val: any) => {
        setCarDetails({
            ...carDetails,
            [name]: val
        })
    }

    console.log(carDetails)

    const handleSubmit = async () => {
        let temp : any = carDetails
        if (!(typeof carDetails === "string")) {
            let a = new Date();
            const num = Math.round(Math.random() * 10000 + a.getMilliseconds());
            const path = `/images/carImages/${carDetails?.car_name}${num}`
            const res = await uploadImageAndGetURL(path, carDetails?.car_image)
            temp = {
                ...temp,
                image_ref : path,
                car_image : res,
            }
            console.log(res)
        }
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/car/one", temp)
        console.log(res)

    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Add Car"
                centered
                visible={BoxState}
                onOk={() => {
//                    for (const key in carDetails) {
//                        console.log(key)
//                        if (!carDetails[key]) {
//                            messageApi.open({
//                                type: 'error',
//                                content: 'Fields can not be empty!',
//                            });
//                            return false;
//
//                        }
//                    }
                    handleSubmit();
                    return
                    BoxStateChange(false);
                }}
                onCancel={() => BoxStateChange(false)}
                width={1000}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-wrap px-5 gap-2">
                        <label className="font-semibold w-44">
                            Car Name
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("car_name", e.target.value)}
                                value={carDetails.car_name}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Color
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("color", e.target.value)}
                                value={carDetails.color}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Price Per Day
                            <Input
                                style={{ marginTop: 5 }}
                                type="number"
                                onChange={(e) => handleChange("pricePerDay", e.target.value)}

                                value={carDetails.pricePerDay}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Price Per Km 
                            <Input
                                style={{ marginTop: 5 }}
                                type="number"
                                onChange={(e) => handleChange("pricePerKm", e.target.value)}

                                value={carDetails.pricePerKm}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Engine
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("engine", e.target.value)}
                                value={carDetails.engine}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Fuel Type
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("fuelType", e.target.value)}
                                value={carDetails.fuelType}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Make
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("make", e.target.value)}
                                value={carDetails.make}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Mileage
                            <Input
                                style={{ marginTop: 5 }}
                                type="year"
                                onChange={(e) => handleChange("mileage", e.target.value)}
                                value={carDetails.mileage}
                                required
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Model
                            <Input
                                style={{ marginTop: 5 }}
                                type="text"
                                onChange={(e) => handleChange("model", e.target.value)}
                                value={carDetails.model}
                                required
                            />
                        </label>
                        <label className="font-semibold flex flex-col w-44">
                            Transmission
                            <Select
                                style={{ marginTop: 5 }}
                                defaultValue="Select"
                                onChange={(val) => handleChange("transmission", val)}
                                options={[
                                    {
                                        label: "Manual",
                                        value: "Manual"
                                    },
                                    {
                                        label: "Auto",
                                        value: "Auto"
                                    },

                                ]}
                            />
                        </label>
                        <label className="font-semibold w-44">
                            Year
                            <Input
                                style={{ marginTop: 5 }}
                                type="number"
                                onChange={(e) => handleChange("year", e.target.value)}
                                value={carDetails.year}
                                required
                            />
                        </label>
                        <label className="flex flex-col font-semibold w-44">
                            Car Class
                            <Select
                                style={{ marginTop: 5 }}
                                defaultValue="Select"
                                onChange={(val) => handleChange("class_id", val)}
                                options={carClasses?.map((cls) => {
                                    return {
                                        label: cls?.class_name,
                                        value: cls?.car_class_id
                                    }
                                })}
                            />
                        </label>
                        <label className=" flex flex-col font-semibold px-5">
                            Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleChange("car_image", e?.target?.files[0])}
                                multiple={true}
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

                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CarRentalInsertionBox;
