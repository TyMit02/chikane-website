import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <Link 
        to={`/dashboard/events/${event.id}`}
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
      >
        Manage Event
      </Link>
    </div>
  </motion.div>
);

export default EventCard;