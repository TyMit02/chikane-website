import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, Clock, Settings, Bell, Filter,
  Plus, Search, ChevronLeft, ChevronRight, Timer,
  BarChart2, Camera
} from 'lucide-react';

const EventStatusBadge = ({ status }) => {
  const statusStyles = {
    draft: 'bg-gray-100 text-gray-600',
    published: 'bg-blue-100 text-blue-600',
    registration_open: 'bg-green-100 text-green-600',
    registration_closed: 'bg-yellow-100 text-yellow-600',
    in_progress: 'bg-purple-100 text-purple-600',
    completed: 'bg-gray-100 text-gray-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const EventCard = ({ event }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <EventStatusBadge status={event.status} />
    </div>
    <div className="space-y-2 text-gray-600">
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        <span>{new Date(event.date.start).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center">
        <Users className="w-5 h-5 mr-2" />
        <span>{event.participants.length} / {event.limits.totalParticipants} Participants</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        <span>{event.runGroups.length} Run Groups</span>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t flex justify-end">
      <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
        Manage Event
      </button>
    </div>
  </motion.div>
);

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  const menuItems = [
    { icon: Calendar, label: 'Events', path: '/dashboard/events' },
    { icon: Users, label: 'Participants', path: '/dashboard/participants' },
    { icon: Timer, label: 'Timing', path: '/dashboard/timing' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Camera, label: 'Media', path: '/dashboard/media' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

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
    // Add more sample events as needed
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!sidebarCollapsed && (
            <span className="text-xl font-bold text-gray-800">Chikane</span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            >
              <item.icon size={20} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Event Management Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
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

          {/* Event List/Grid Section */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Filters and Search */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg ${view === 'grid' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg ${view === 'list' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2">Page 1 of 1</span>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;