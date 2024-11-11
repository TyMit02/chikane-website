import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Calendar, Users, Clock, 
  ChevronDown, MoreHorizontal, Calendar as CalendarIcon,
  MapPin, GaugeCircle, AlertCircle
} from 'lucide-react';
import { validateEvent } from '@/utils/eventValidation';
import PropTypes from 'prop-types';


const EventsManagement = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'all'
  });
  
  // Sample data (replace with Firestore data when available)
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

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.track.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || event.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateEvent = () => {
    navigate('/dashboard/events/create');
  };

  const handleManageEvent = (eventId) => {
    navigate(`/dashboard/events/${eventId}`);
  };

  const handleQuickValidation = async (event) => {
    const { isValid, errors } = validateEvent(event);
    if (!isValid) {
      console.error('Validation errors:', errors);
      // You could show these errors in a toast or modal
      return false;
    }
    return true;
  };

  const FilterDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="registration_open">Registration Open</option>
            <option value="registration_closed">Registration Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <select
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

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
            onClick={handleCreateEvent}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
            {filterOpen && <FilterDropdown />}
          </div>
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

      {/* Events Grid/List */}
      {filteredEvents.length > 0 ? (
        <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                view === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${view === 'list' ? 'w-48' : 'h-48'} bg-gray-100`}>
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
              <div className="p-6 flex-1">
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
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleManageEvent(event.id)}
                    className="flex-1 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    Manage Event
                  </motion.button>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickValidation(event);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Validate
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // No Events Found State
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? `No events match your search "${searchTerm}"`
              : "You haven't created any events yet"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateEvent}
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Event
          </motion.button>
        </motion.div>
      )}

      {/* Quick Actions Menu (you can add this if needed) */}
      <div className="fixed bottom-6 right-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex space-x-4"
        >
          <button
            onClick={handleCreateEvent}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Quick Create
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Add event type validation
EventsManagement.propTypes = {
  onEventCreate: PropTypes.func,
  onEventSelect: PropTypes.func,
};

export default EventsManagement;