import React from 'react';
import { Progress } from 'antd';

interface GradientProgressBarProps {
  text: string;
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({ text }) => (
 
   
    <div className='mt-3 ' style={{ position: 'relative', marginBottom: '1rem' }}>
      <Progress
        type="circle"
        width={270} // Set the size of the progress bar
        strokeWidth={20} // Set the width of the progress bar stroke
        strokeColor={{
          '0%': '#FFC107', // Yellow color at 0%
          '50%': '#2196F3', // Blue color at 50%
          '100%': '#E91E63', // Pink color at 100%
        }}
        percent={100}
        format={() => null} // Remove the numeric value from the center
      />
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black text-2xl font-bold">
        <div>{text}</div>
        <div>No of Tours</div>
      </div>
    </div>
  
);

export default GradientProgressBar;
