import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHome from '../components/dashboard/DashboardHome';
import EventCreation from '../components/dashboard/events/create/EventCreation';
import EventsManagement from '../components/dashboard/events/EventsManagement';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="events/create" element={<EventCreation />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;