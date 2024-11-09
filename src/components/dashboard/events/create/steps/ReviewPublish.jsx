import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, AlertCircle, Calendar, MapPin,
  Users, Clock, FileText, ChevronDown, ChevronUp,
  Shield, Wrench, Map
} from 'lucide-react';

const ReviewPublish = ({ data, onUpdate, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState(['basics']);
  const [publishStatus, setPublishStatus] = useState('draft'); // draft, scheduled, published

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

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
    <form onSubmit={handleSubmit} className="space-y-8">
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
              <p className="mt-1 text-sm text-gray-900">{data.basics.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <p className="mt-1 text-sm text-gray-900">{data.basics.eventType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="mt-1 text-sm text-gray-900">
                {data.basics.track} - {data.basics.trackConfiguration}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Participant Limit</label>
              <p className="mt-1 text-sm text-gray-900">{data.basics.participantLimit} participants</p>
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
          </div>
        </Section>

        {/* Run Groups */}
        <Section title="Run Groups" id="groups" icon={Users}>
          <div className="space-y-4">
            {data.groups.map(group => (
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
            ))}
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
                Regular: ${data.registration.pricing.regular}<br />
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
            {data.schedule.sessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{session.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(session.startTime)} • {session.duration} minutes
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {session.groups.map(groupId => {
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
            ))}
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
            {publishStatus === 'draft' ? 'Save Draft' : 
             publishStatus === 'scheduled' ? 'Schedule' : 'Publish Now'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewPublish;