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
          } font-old overflow-hidden text-white text-base`}>
          Logout
        </p>
      </div>
    </div>
  );
}
