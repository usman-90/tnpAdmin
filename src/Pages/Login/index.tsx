import { message } from "antd";
import BgImage from "../../../public/pic.png";
import Form from "../../Components/Login/Form";

const Login = () => {
  const [_, contextHolder] = message.useMessage();

  return (
    <div className="container overflow-[none] mx-auto">
      {contextHolder}
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <img
            className="w-[80%] h-[30rem] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            src={BgImage}
          />
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
