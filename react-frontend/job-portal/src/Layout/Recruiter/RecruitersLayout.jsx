import React from 'react';
import { Outlet } from 'react-router-dom';
import RecruiterSidebar from './RecruiterSidebar';


const RecruitersLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-10">
      <Outlet />
      </div>
    </div>
  );
};

export default RecruitersLayout;
