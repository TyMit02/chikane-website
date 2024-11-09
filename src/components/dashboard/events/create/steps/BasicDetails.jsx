import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, AlertCircle, 
  Upload, X, Info
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const eventTypes = [
  { id: 'track_day', label: 'Track Day' },
  { id: 'time_attack', label: 'Time Attack' },
  { id: 'competition', label: 'Competition' },
  { id: 'training', label: 'Driver Training' }
];

const experienceLevels = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'all', label: 'All Levels' }
];

const tracks = [
  { id: 1, name: 'Silverstone', configurations: ['GP Circuit', 'National Circuit', 'International Circuit'] },
  { id: 2, name: 'Brands Hatch', configurations: ['GP Circuit', 'Indy Circuit'] },
  // Add more tracks as needed
];

const BasicDetails = ({ data, onUpdate, onNext }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        onUpdate({ ...data, logo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!data.name) newErrors.name = 'Event name is required';
    if (!startDate) newErrors.dates = 'Event dates are required';
    if (!selectedTrack) newErrors.track = 'Track selection is required';
    if (!data.eventType) newErrors.eventType = 'Event type is required';
    if (!data.participantLimit) newErrors.participantLimit = 'Participant limit is required';

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Event Logo Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Logo
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            {logoPreview ? (
              <div className="relative group">
                <img 
                  src={logoPreview} 
                  alt="Event logo preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    onUpdate({ ...data, logo: null });
                  }}
                  className="absolute inset-0 bg-black/50 items-center justify-center hidden group-hover:flex"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Recommended: 400x400px PNG or JPG
          </p>
        </div>
      </div>

      {/* Event Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ ...data, name: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Summer Track Day 2024"
        />
        {errors.name && (
          <p className="text-red-500 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Event Dates */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Dates *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              onUpdate({ ...data, dates: update });
            }}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
              errors.dates ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholderText="Select event date(s)"
          />
        </div>
        {errors.dates && (
          <p className="text-red-500 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.dates}
          </p>
        )}
      </div>

      {/* Track Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Track *
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <select
              value={selectedTrack}
              onChange={(e) => {
                setSelectedTrack(e.target.value);
                onUpdate({ ...data, track: e.target.value });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.track ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a track</option>
              {tracks.map(track => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={data.trackConfiguration}
              onChange={(e) => onUpdate({ ...data, trackConfiguration: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
              disabled={!selectedTrack}
            >
              <option value="">Select configuration</option>
              {selectedTrack && tracks
                .find(t => t.id.toString() === selectedTrack)
                ?.configurations.map(config => (
                  <option key={config} value={config}>
                    {config}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventTypes.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => onUpdate({ ...data, eventType: type.id })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.eventType === type.id
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-gray-300 hover:border-accent/50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Experience Level Required *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experienceLevels.map(level => (
            <button
              key={level.id}
              type="button"
              onClick={() => onUpdate({ ...data, experienceLevel: level.id })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.experienceLevel === level.id
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-gray-300 hover:border-accent/50'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Participant Limit */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Participant Limit *
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={data.participantLimit}
            onChange={(e) => onUpdate({ ...data, participantLimit: e.target.value })}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
              errors.participantLimit ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Maximum number of participants"
            min="1"
          />
        </div>
      </div>

      {/* Event Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ ...data, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="Describe your event..."
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
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
    </form>
  );
};

export default BasicDetails;