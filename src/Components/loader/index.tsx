import { Spin } from "antd";

const Loader = ({ message }: { message: string }) => {
  return (
    <div className="absolute inset-0 z-10 h-[85vh] grid place-items-center backdrop-blur-sm bg-white/30">
      <div className="flex flex-col items-center text-center text-green-700 font-bold text-xl">
        <Spin size="large" className="mb-4" />
        <div>{message} ...</div>
      </div>
    </div>
  );
};

export default Loader;


