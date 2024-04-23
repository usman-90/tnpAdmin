// import React from 'react';

import { Button } from "antd";
import InsertionBox from "../../Components/tourpackages/InsertionBox";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";

export default function TourPackages() {
  const [openBox, setOpenBox] = useState(false);
  return (
    <div>
      <div className="w-full px-4 flex justify-end">
        <Button
          className="bg-orange-500 h-10 w-24 text-white font-semibold flex items-center justify-center pb-2"
          icon={<RiAddLine size={23} className="pt-0.5" />}
          onClick={() => setOpenBox(true)}
        >
          Insert
        </Button>
        <InsertionBox BoxState={openBox} BoxStateChange={setOpenBox} />
      </div>
    </div>
  );
}
