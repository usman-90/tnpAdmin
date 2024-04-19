import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex layout overflow-y-hidden sticky bg-gray-200 ">
    
        {/* <Sidebar/> */}
      

      <main className="p-4 w-full  h-screen bg-gray-200 overflow-y-auto flex flex-col">
        {/* <Header/> */}
        {children}
        </main>
    </div>
  );
};

export default Layout;