import { Spin } from "antd";

const Loader = ({ message }: { message: string }) => {
  return (
    <div className="absolute w-screen h-screen  z-60">
      <div className="backdrop-blur-sm flex flex-col text-green-700 font-bold text-xl h-full w-full justify-center items-center">
        {message} ...
        <Spin size="large" className="my-20" />
      </div>
    </div>
  );
};

export default Loader;
