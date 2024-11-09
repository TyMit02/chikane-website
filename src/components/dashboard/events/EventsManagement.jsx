import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this line
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Calendar, Users, Clock, 
  ChevronDown, MoreHorizontal, Calendar as CalendarIcon,
  MapPin, GaugeCircle
} from 'lucide-react';

const EventsManagement = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Sample data
  const events = [
    {
      id: 1,
      name: "Summer Track Day",
      status: "registration_open",
      date: new Date("2024-07-15"),
      track: "Silverstone Circuit",
      participants: 24,
      maxParticipants: 30,
      runGroups: 3,
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      name: "Advanced Driver Training",
      status: "draft",
      date: new Date("2024-08-01"),
      track: "Spa-Francorchamps",
      participants: 0,
      maxParticipants: 20,
      runGroups: 2,
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      name: "Endurance Racing Event",
      status: "published",
      date: new Date("2024-08-15"),
      track: "Nürburgring",
      participants: 15,
      maxParticipants: 40,
      runGroups: 4,
      image: "/api/placeholder/400/200"
    }
  ];

  const statusStyles = {
    draft: 'bg-gray-100 text-gray-600',
    published: 'bg-blue-100 text-blue-600',
    registration_open: 'bg-green-100 text-green-600',
    registration_closed: 'bg-yellow-100 text-yellow-600',
    in_progress: 'bg-purple-100 text-purple-600',
    completed: 'bg-gray-100 text-gray-600'
  };

  const handleCreateEvent = () => {
    navigate('/dashboard/events/create');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-500">Manage your track day events</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/events/create')}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </motion.button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 min-w-[200px]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-md transition-colors ${
              view === 'grid' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-md transition-colors ${
              view === 'list' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative h-48 bg-gray-100">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[event.status]}`}>
                  {event.status.replace('_', ' ').charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{event.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.track}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.participants} / {event.maxParticipants} Participants</span>
                </div>
                <div className="flex items-center">
                  <GaugeCircle className="w-4 h-4 mr-2" />
                  <span>{event.runGroups} Run Groups</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                >
                  Manage Event
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsManagement;