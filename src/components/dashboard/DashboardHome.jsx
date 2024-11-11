import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  console.log("DashboardHome rendering"); // Add this line

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your track day events and participants</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard/events/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Event
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Events', value: '12', change: '+2 this month' },
          { title: 'Active Participants', value: '145', change: '+15 this week' },
          { title: 'Upcoming Events', value: '3', change: 'Next 30 days' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">{stat.value}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">{stat.change}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;