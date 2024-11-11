import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, AlertCircle, Calendar, MapPin,
  Users, Clock, FileText, ChevronDown, ChevronUp,
  Shield, Wrench, Map, Loader
} from 'lucide-react';
import { createEvent, updateEvent } from '@/services/eventService';
import PropTypes from 'prop-types';

// Helper function for date formatting
const formatDate = (date) => {
  if (!date) return 'Not set';
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

// Default data structure
const defaultData = {
  basics: {
    name: '',
    eventType: '',
    track: '',
    trackConfiguration: '',
    participantLimit: 0
  },
  requirements: {
    insurance: { required: false, details: '' },
    sound: { required: false, limit: '', details: '' },
    equipment: []
  },
  groups: [],
  registration: {
    openDate: null,
    closeDate: null,
    pricing: { regular: '', earlyBird: '' }
  },
  schedule: {
    sessions: []
  },
  documents: {
    supplementaryRules: [],
    trackMaps: [],
    waivers: [],
    techForms: []
  }
};

const ReviewPublish = ({ data = defaultData, onUpdate, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState(['basics']);
  const [publishStatus, setPublishStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      const eventData = {
        ...data,
        status: publishStatus,
        organizerId: 'current-user-id', // Replace with actual user ID from auth context
        updatedAt: new Date().toISOString()
      };

      if (data.id) {
        result = await updateEvent(data.id, eventData);
      } else {
        result = await createEvent(eventData);
      }

      switch (publishStatus) {
        case 'published':
          navigate(`/dashboard/events/${result.id}`);
          break;
        case 'draft':
          navigate('/dashboard/events/drafts');
          break;
        case 'scheduled':
          navigate('/dashboard/events/scheduled');
          break;
        default:
          navigate('/dashboard/events');
      }
    } catch (err) {
      setError(err.message || 'Failed to publish event');
      console.error('Publish error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Section component for each expandable section
  const Section = ({ title, id, icon: Icon, children }) => {
    const isExpanded = expandedSections.includes(id);
    
    return (
      <div className="border rounded-lg bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isExpanded && (
          <div className="px-6 pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handlePublish} className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Review & Publish</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review your event details and publish when ready
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={publishStatus}
              onChange={(e) => setPublishStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
              disabled={loading}
            >
              <option value="draft">Save as Draft</option>
              <option value="scheduled">Schedule Publish</option>
              <option value="published">Publish Now</option>
            </select>
          </div>
        </div>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {/* Basic Details */}
        <Section title="Basic Details" id="basics" icon={Calendar}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <p className="mt-1 text-sm text-gray-900">{data.basics.name || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <p className="mt-1 text-sm text-gray-900">{data.basics.eventType || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="mt-1 text-sm text-gray-900">
                {data.basics.track} {data.basics.trackConfiguration ? `- ${data.basics.trackConfiguration}` : ''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Participant Limit</label>
              <p className="mt-1 text-sm text-gray-900">
                {data.basics.participantLimit ? `${data.basics.participantLimit} participants` : 'Not set'}
              </p>
            </div>
          </div>
        </Section>

        {/* Requirements & Limits */}
        <Section title="Requirements & Limits" id="requirements" icon={Shield}>
          <div className="space-y-4">
            {data.requirements.insurance.required && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance Requirements</label>
                <p className="mt-1 text-sm text-gray-900">{data.requirements.insurance.details}</p>
              </div>
            )}
            {data.requirements.sound.required && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Sound Limit</label>
                <p className="mt-1 text-sm text-gray-900">{data.requirements.sound.limit} dB</p>
              </div>
            )}
            {data.requirements.equipment.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Required Equipment</label>
                <ul className="mt-1 space-y-1">
                  {data.requirements.equipment.map((item, index) => (
                    <li key={index} className="text-sm text-gray-900">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {!data.requirements.insurance.required && 
             !data.requirements.sound.required && 
             data.requirements.equipment.length === 0 && (
              <p className="text-sm text-gray-500">No requirements set</p>
            )}
          </div>
        </Section>

        {/* Run Groups */}
        <Section title="Run Groups" id="groups" icon={Users}>
          <div className="space-y-4">
            {data.groups.length > 0 ? (
              data.groups.map(group => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{group.name}</p>
                      <p className="text-xs text-gray-500">
                        {group.maxParticipants} participants • {group.sessionDuration} min sessions
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No run groups defined</p>
            )}
          </div>
        </Section>

        {/* Registration */}
        <Section title="Registration Settings" id="registration" icon={Clock}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Period</label>
              <p className="mt-1 text-sm text-gray-900">
                Opens: {formatDate(data.registration.openDate)}<br />
                Closes: {formatDate(data.registration.closeDate)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pricing</label>
              <p className="mt-1 text-sm text-gray-900">
                Regular: ${data.registration.pricing.regular || '0'}<br />
                {data.registration.pricing.earlyBird && 
                  `Early Bird: $${data.registration.pricing.earlyBird}`
                }
              </p>
            </div>
          </div>
        </Section>

        {/* Schedule */}
        <Section title="Schedule" id="schedule" icon={Clock}>
          <div className="space-y-4">
            {data.schedule.sessions.length > 0 ? (
              data.schedule.sessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(session.startTime)} • {session.duration} minutes
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.groups?.map(groupId => {
                      const group = data.groups.find(g => g.id === groupId);
                      return group ? (
                        <span
                          key={groupId}
                          className="inline-flex items-center px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: `${group.color}20`,
                            color: group.color
                          }}
                        >
                          {group.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sessions scheduled</p>
            )}
          </div>
        </Section>

        {/* Documents */}
        <Section title="Documents" id="documents" icon={FileText}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplementary Rules</label>
                <p className="mt-1 text-sm text-gray-900">
                  {data.documents.supplementaryRules.length} documents uploaded
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Track Maps</label>
                <p className="mt-1 text-sm text-gray-900">
                  {data.documents.trackMaps.length} maps uploaded
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Waivers</label>
                <p className="mt-1 text-sm text-gray-900">
                  {data.documents.waivers.length} documents uploaded
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tech Forms</label>
                <p className="mt-1 text-sm text-gray-900">
                  {data.documents.techForms.length} forms uploaded
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => {
              setPublishStatus('draft');
              handlePublish();
            }}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                {publishStatus === 'draft' ? 'Saving...' : 
                 publishStatus === 'scheduled' ? 'Scheduling...' : 'Publishing...'}
              </>
            ) : (
              <>
                {publishStatus === 'draft' ? 'Save Draft' : 
                 publishStatus === 'scheduled' ? 'Schedule' : 'Publish Now'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

ReviewPublish.propTypes = {
    data: PropTypes.shape({
      basics: PropTypes.shape({
        name: PropTypes.string.isRequired,
        eventType: PropTypes.string.isRequired,
        track: PropTypes.string.isRequired,
        trackConfiguration: PropTypes.string,
        participantLimit: PropTypes.number.isRequired
      }).isRequired,
      requirements: PropTypes.shape({
        insurance: PropTypes.shape({
          required: PropTypes.bool.isRequired,
          details: PropTypes.string
        }).isRequired,
        sound: PropTypes.shape({
          required: PropTypes.bool.isRequired,
          limit: PropTypes.string,
          details: PropTypes.string
        }).isRequired,
        equipment: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired,
      groups: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        maxParticipants: PropTypes.number.isRequired,
        sessionDuration: PropTypes.number.isRequired
      })).isRequired,
      registration: PropTypes.shape({
        openDate: PropTypes.string,
        closeDate: PropTypes.string,
        pricing: PropTypes.shape({
          regular: PropTypes.string.isRequired,
          earlyBird: PropTypes.string
        }).isRequired
      }).isRequired,
      schedule: PropTypes.shape({
        sessions: PropTypes.arrayOf(PropTypes.shape({
          title: PropTypes.string.isRequired,
          startTime: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          groups: PropTypes.arrayOf(PropTypes.string).isRequired
        })).isRequired
      }).isRequired,
      documents: PropTypes.shape({
        supplementaryRules: PropTypes.array.isRequired,
        trackMaps: PropTypes.array.isRequired,
        waivers: PropTypes.array.isRequired,
        techForms: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
  };

export default ReviewPublish;