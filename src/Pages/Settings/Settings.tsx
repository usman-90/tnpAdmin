import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex justify-between">
      Settings
      <div
        className="cursor-pointer bg-red-700 py-1 px-4 rounded-md"
        onClick={() => {
          window.localStorage.removeItem("userData");
          navigate("/");
          window.location.assign("/");
        }}>
        <p
          className={`${
            isCollapsed ? "w-0" : "ms-3"
          }overflow-hidden text-white items-center flex justify-center text-base px-3`}>
          Logout
        </p>
      </div>
    </div>
  );
}
