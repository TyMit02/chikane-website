import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, Plus, Trash2, ChevronUp, ChevronDown,
  AlertCircle, Edit2, Save, X, Info
} from 'lucide-react';

const RunGroups = ({ data, onUpdate, onNext, onBack }) => {
  const [editingGroup, setEditingGroup] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    experienceLevel: 'beginner',
    description: '',
    maxParticipants: '',
    sessionDuration: 20,
    color: '#2563eb'
  });

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'competition', label: 'Competition' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (data.length === 0) {
      newErrors.groups = 'At least one run group is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddGroup = () => {
    if (newGroup.name && newGroup.maxParticipants) {
      onUpdate([...data, { ...newGroup, id: Date.now() }]);
      setShowAddGroup(false);
      setNewGroup({
        name: '',
        experienceLevel: 'beginner',
        description: '',
        maxParticipants: '',
        sessionDuration: 20,
        color: '#2563eb'
      });
    }
  };

  const handleUpdateGroup = (index, updatedGroup) => {
    const newGroups = [...data];
    newGroups[index] = updatedGroup;
    onUpdate(newGroups);
  };

  const handleDeleteGroup = (index) => {
    const newGroups = [...data];
    newGroups.splice(index, 1);
    onUpdate(newGroups);
  };

  const handleMoveGroup = (index, direction) => {
    const newGroups = [...data];
    const temp = newGroups[index];
    newGroups[index] = newGroups[index + direction];
    newGroups[index + direction] = temp;
    onUpdate(newGroups);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Run Groups</h2>
            <p className="mt-1 text-sm text-gray-500">
              Create and manage your event's run groups
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddGroup(true)}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            disabled={showAddGroup}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Group
          </button>
        </div>

        {errors.groups && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.groups}
          </p>
        )}
      </div>

      {/* Add/Edit Group Form */}
      <AnimatePresence>
        {showAddGroup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg p-6 border border-accent/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Group</h3>
              <button
                type="button"
                onClick={() => setShowAddGroup(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="e.g., Novice Group"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  value={newGroup.experienceLevel}
                  onChange={(e) => setNewGroup({ ...newGroup, experienceLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {experienceLevels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={newGroup.maxParticipants}
                  onChange={(e) => setNewGroup({ ...newGroup, maxParticipants: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Maximum number of participants"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Session Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newGroup.sessionDuration}
                  onChange={(e) => setNewGroup({ ...newGroup, sessionDuration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Duration in minutes"
                  min="5"
                  step="5"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  rows={2}
                  placeholder="Group description and requirements..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Group Color
                </label>
                <input
                  type="color"
                  value={newGroup.color}
                  onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })}
                  className="w-full h-10 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddGroup(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddGroup}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
              >
                Add Group
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Groups List */}
      <div className="space-y-4">
        {data.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-4 h-12 rounded"
                  style={{ backgroundColor: group.color }}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {experienceLevels.find(l => l.id === group.experienceLevel)?.label} • {group.maxParticipants} participants
                  </p>
                  {group.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {group.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleMoveGroup(index, -1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveGroup(index, 1)}
                  disabled={index === data.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGroup(group.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteGroup(index)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default RunGroups;