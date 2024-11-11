import { format, isPast, isFuture } from 'date-fns';

export const formatEventDate = (date) => {
  return format(new Date(date), 'PPP');
};

export const getEventStatus = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  if (event.status === 'draft') return 'draft';
  if (isPast(eventDate)) return 'completed';
  if (event.participants >= event.maxParticipants) return 'registration_closed';
  if (isFuture(eventDate) && event.status === 'published') return 'registration_open';
  
  return event.status;
};

export const calculateRegistrationProgress = (event) => {
  return (event.participants / event.maxParticipants) * 100;
};

export const sortEvents = (events, sortBy = 'date') => {
  return [...events].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'participants':
        return b.participants - a.participants;
      default:
        return 0;
    }
  });
};

export const filterEvents = (events, filters) => {
  return events.filter(event => {
    const matchesStatus = filters.status === 'all' || event.status === filters.status;
    const matchesDate = filters.date === 'all' || 
      (filters.date === 'upcoming' && isFuture(new Date(event.date))) ||
      (filters.date === 'past' && isPast(new Date(event.date)));
    
    return matchesStatus && matchesDate;
  });
};

export const groupEventsByMonth = (events) => {
  return events.reduce((groups, event) => {
    const month = format(new Date(event.date), 'MMMM yyyy');
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(event);
    return groups;
  }, {});
};