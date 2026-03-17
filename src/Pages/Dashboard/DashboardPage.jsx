import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";


export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex  bg-gray-100">
     {/* Your Sidebar */}
     <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} /> 
      <div className="flex-1 flex flex-col">
      {/* Your Header */}
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} /> 
        <div className="p-6 flex-1 ">
          <Outlet /> {/* Render nested routes here */}
        </div>
        
      </div>
    </div>
  );
}

