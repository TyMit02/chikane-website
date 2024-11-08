import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import EventCard from './EventCard';

const DashboardHome = () => {
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  // Placeholder events data
  const events = [
    {
      id: 1,
      name: "Summer Track Day",
      status: "registration_open",
      date: { start: new Date("2024-07-15") },
      participants: new Array(15),
      limits: { totalParticipants: 30 },
      runGroups: new Array(3),
    },
  ];

  return (
    <div className="p-6">
      {/* Event Management Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
              <p className="text-gray-600">Manage your track day events</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </motion.button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;