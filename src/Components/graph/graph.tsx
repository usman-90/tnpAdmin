import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineBarGraph = () => {
  // State to track the screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the width based on screen size
  const getWidth = () => {
    if (screenWidth < 450) {
      return 350; 
    } 
    else if (screenWidth >= 425 && screenWidth <= 768) {
      return 650;
    }
    else if (screenWidth >= 768 && screenWidth < 1024) {
      return 600;
    }
    else if ( screenWidth > 1030 && screenWidth <= 1205) {
      return 700;
    }
    else if ( screenWidth > 1024 && screenWidth <= 1440) {
      return 800; 
  
    }
  };

  const data = [
    { time: "1pm", BlueLine: 0, YellowLine: 20 },
    { time: "2pm", BlueLine: 20, YellowLine: 40 },
    { time: "3pm", BlueLine: 40, YellowLine: 60 },
    { time: "4pm", BlueLine: 60, YellowLine: 80 },
    { time: "5pm", BlueLine: 20, YellowLine: 20 },
    { time: "6pm", BlueLine: 80, YellowLine: 120 },
    { time: "7pm", BlueLine: 10, YellowLine: 80 },
    { time: "8pm", BlueLine: 140, YellowLine: 160 },
    { time: "9pm", BlueLine: 160, YellowLine: 180 },
    { time: "10pm", BlueLine: 180, YellowLine: 200 },
    { time: "11pm", BlueLine: 200, YellowLine: 220 },
    { time: "12pm", BlueLine: 220, YellowLine: 240 },
    { time: "1pm", BlueLine: 240, YellowLine: 260 },
  ];

  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Report</h2>
      <LineChart
   
        width={getWidth()} // Set width based on screen size
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BlueLine" stroke="#00ADEE" />
        <Line type="monotone" dataKey="YellowLine" stroke="#FBAD17" />
      </LineChart>
    </div>
  );
};

export default LineBarGraph;
