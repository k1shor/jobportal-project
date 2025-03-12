import React from 'react';
import { Outlet } from 'react-router-dom';
import RecruiterSidebar from './RecruiterSidebar';


const RecruitersLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Main Content */}
      <div className="mx-auto py-10">
      <Outlet />
      </div>
    </div>
  );
};

export default RecruitersLayout;
