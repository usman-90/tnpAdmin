import { Spin } from "antd";

const Loader = ({ message }: { message: string }) => {
  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      <div className="backdrop-blur-sm flex items-center justify-center flex-col text-green-700 font-bold text-xl">
        {message} ...
        <Spin size="large" className="mt-4" />
      </div>
    </div>
  );
};

export default Loader;
