import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Plus, Trash2, AlertCircle, Calendar,
  Coffee, Users, PauseCircle, MessageCircle,
  ChevronUp, ChevronDown, Save, X
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Schedule = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState('session');
  const [newItem, setNewItem] = useState({
    type: 'session',
    title: '',
    startTime: null,
    duration: 20,
    groups: [],
    description: ''
  });

  const eventTypes = [
    { id: 'session', label: 'Track Session', icon: Clock },
    { id: 'break', label: 'Break', icon: Coffee },
    { id: 'briefing', label: 'Briefing', icon: MessageCircle }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (data.sessions.length === 0) {
      newErrors.sessions = 'At least one track session is required';
    }

    // Check for time conflicts
    const allEvents = [
      ...data.sessions.map(s => ({ ...s, type: 'session' })),
      ...data.breaks.map(b => ({ ...b, type: 'break' })),
      ...data.briefings.map(b => ({ ...b, type: 'briefing' }))
    ].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    for (let i = 0; i < allEvents.length - 1; i++) {
      const current = allEvents[i];
      const next = allEvents[i + 1];
      const currentEnd = new Date(new Date(current.startTime).getTime() + current.duration * 60000);
      const nextStart = new Date(next.startTime);

      if (currentEnd > nextStart) {
        newErrors.timeConflict = 'There are time conflicts in the schedule';
        break;
      }
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddItem = () => {
    if (newItem.title && newItem.startTime) {
      const updatedData = { ...data };
      switch (newItem.type) {
        case 'session':
          updatedData.sessions = [...(updatedData.sessions || []), { ...newItem }];
          break;
        case 'break':
          updatedData.breaks = [...(updatedData.breaks || []), { ...newItem }];
          break;
        case 'briefing':
          updatedData.briefings = [...(updatedData.briefings || []), { ...newItem }];
          break;
      }
      onUpdate(updatedData);
      setShowAddForm(false);
      setNewItem({
        type: 'session',
        title: '',
        startTime: null,
        duration: 20,
        groups: [],
        description: ''
      });
    }
  };

  const handleDeleteItem = (type, index) => {
    const updatedData = { ...data };
    updatedData[`${type}s`].splice(index, 1);
    onUpdate(updatedData);
  };

  const handleMoveItem = (type, index, direction) => {
    const updatedData = { ...data };
    const items = updatedData[`${type}s`];
    const temp = items[index];
    items[index] = items[index + direction];
    items[index + direction] = temp;
    onUpdate(updatedData);
  };

  // Sort all events by start time
  const getAllEvents = () => {
    return [
      ...data.sessions.map(s => ({ ...s, type: 'session' })),
      ...data.breaks.map(b => ({ ...b, type: 'break' })),
      ...data.briefings.map(b => ({ ...b, type: 'briefing' }))
    ].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Event Schedule</h2>
            <p className="mt-1 text-sm text-gray-500">
              Plan your event schedule including track sessions, breaks, and briefings
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            disabled={showAddForm}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>

        {errors.timeConflict && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.timeConflict}
            </p>
          </div>
        )}
      </div>

      {/* Add Event Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg p-6 border border-accent/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add Schedule Event</h3>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Type Selection */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {eventTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setNewItem(prev => ({ ...prev, type: type.id }));
                      setFormType(type.id);
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      newItem.type === type.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      newItem.type === type.id ? 'text-accent' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      newItem.type === type.id ? 'text-accent' : 'text-gray-700'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Event Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder={`Enter ${formType} title`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <DatePicker
                  selected={newItem.startTime}
                  onChange={(date) => setNewItem({ ...newItem, startTime: date })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholderText="Select start time"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newItem.duration}
                  onChange={(e) => setNewItem({ ...newItem, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  min="5"
                  step="5"
                />
              </div>

              {formType === 'session' && (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Run Groups
    </label>
    <div className="border border-gray-300 rounded-lg divide-y">
      {data.groups?.map(group => (
        <label
          key={group.id}
          className="flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <input
            type="checkbox"
            checked={newItem.groups.includes(group.id)}
            onChange={(e) => {
              const updatedGroups = e.target.checked
                ? [...newItem.groups, group.id]
                : newItem.groups.filter(id => id !== group.id);
              setNewItem({ ...newItem, groups: updatedGroups });
            }}
            className="rounded border-gray-300 text-accent focus:ring-accent mr-3"
          />
          <div className="flex items-center space-x-3 flex-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: group.color }}
            />
            <span className="text-sm text-gray-900">{group.name}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
)}

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  rows={2}
                  placeholder="Add any additional details..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
              >
                Add to Schedule
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Timeline */}
      <div className="space-y-4">
        {getAllEvents().map((event, index) => {
          const Icon = eventTypes.find(t => t.id === event.type)?.icon || Clock;
          const endTime = new Date(new Date(event.startTime).getTime() + event.duration * 60000);
          
          return (
            <motion.div
              key={`${event.type}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                event.type === 'break' ? 'border-l-4 border-orange-400' :
                event.type === 'briefing' ? 'border-l-4 border-purple-400' :
                'border-l-4 border-accent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    event.type === 'break' ? 'bg-orange-100 text-orange-600' :
                    event.type === 'briefing' ? 'bg-purple-100 text-purple-600' :
                    'bg-accent/10 text-accent'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(event.startTime).toLocaleTimeString([], { 
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                        {' - '}
                        {endTime.toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </span>
                      <span>({event.duration} minutes)</span>
                    </div>
                    {event.type === 'session' && event.groups?.length > 0 && (
  <div className="mt-2 flex flex-wrap gap-2">
    {event.groups.map(groupId => {
      const group = data.groups?.find(g => g.id === groupId);
      if (!group) return null;
      
      return (
        <span
          key={groupId}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${group.color}20`,
            color: group.color
          }}
        >
          {group.name}
        </span>
      );
    })}
  </div>
)}
                    {event.description && (
                      <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleMoveItem(event.type, index, -1)}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveItem(event.type, index, 1)}
                      disabled={index === getAllEvents().length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(event.type, index)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
  
          {getAllEvents().length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Scheduled</h3>
              <p className="text-gray-500 mb-4">
                Start by adding track sessions, breaks, or briefings to your schedule
              </p>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Event
              </button>
            </div>
          )}
        </div>
  
        {/* Schedule Summary */}
        {getAllEvents().length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Track Sessions</p>
                <p className="text-2xl font-semibold text-accent">
                  {data.sessions.length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Total Track Time</p>
                <p className="text-2xl font-semibold text-accent">
                  {data.sessions.reduce((acc, session) => acc + session.duration, 0)} minutes
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Breaks & Briefings</p>
                <p className="text-2xl font-semibold text-accent">
                  {data.breaks.length + data.briefings.length}
                </p>
              </div>
            </div>
          </div>
        )}
  
        {/* Validation Errors */}
        {errors.sessions && (
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.sessions}
            </p>
          </div>
        )}
  
        {/* Form Actions */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <div className="space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  };
  
  export default Schedule;