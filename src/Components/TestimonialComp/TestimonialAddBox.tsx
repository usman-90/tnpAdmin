import axios from "axios";
import { useState, useEffect } from "react";
import { DownOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Modal, DatePicker, Input } from "antd";
import { Toast } from "../SideToast";

interface Package {
  package_id: number;
  package_name: string;
}

interface TestimonialProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
  fetchData: () => void;
}

const TestimonialAddBox: React.FC<TestimonialProps> = ({
  BoxState,
  BoxStateChange,
  fetchData,
}) => {
  const [data, setData] = useState<Package[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/admin/getPackagesName`
        );
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  const handleSubmit = async () => {
    console.log("user name", userName);
    console.log("user email", userEmail);
    console.log("description", description);
    if (!userName || !userEmail || !description) {
      console.error("Please enter all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/getTestimonials`,
        {
          userName: userName,
          userEmail: userEmail,
          description: description,
        }
      );
      Toast.fire({
        icon: "success",
        title: "Testimonial created successfully",
      });

      console.log("Submission response:", response.data);
      BoxStateChange(false);
      fetchData();
      setUserName("");
      setUserEmail("");
      setDescription("");
    } catch (error) {
      console.error("Error creating testimonial:", error);
    }
  };

  return (
    <Modal
      title="Add Testimonial"
      centered
      visible={BoxState}
      width={700}
      onOk={handleSubmit}
      onCancel={() => BoxStateChange(false)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-wrap px-5 gap-2">
          {/* ----Testimonial User Name ------ */}
          <label className="font-semibold w-44">
              User Name
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </label>

          {/* ------Testimonial User email-------- */}
          <label className="font-semibold w-44">
              User Email
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                required
              />
            </label>
             {/* ------Testimonial Description -------- */}
          <label className="font-semibold w-44">
              Testimonial's Description
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </label>
        </div>
      </form>
    </Modal>
  );
};

export default TestimonialAddBox;
