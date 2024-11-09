import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Volume2, Wrench, AlertCircle, 
  Plus, Trash2, Info, ChevronDown
} from 'lucide-react';

const RequirementsLimits = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [showEquipmentInput, setShowEquipmentInput] = useState(false);
  const [newEquipment, setNewEquipment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (data.insurance.required && !data.insurance.details) {
      newErrors.insurance = 'Insurance details are required when enabled';
    }
    if (data.sound.required && !data.sound.limit) {
      newErrors.sound = 'Sound limit is required when enabled';
    }
    if (data.techInspection.required && !data.techInspection.details) {
      newErrors.techInspection = 'Tech inspection details are required when enabled';
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddEquipment = () => {
    if (newEquipment.trim()) {
      onUpdate({
        ...data,
        equipment: [...(data.equipment || []), newEquipment.trim()]
      });
      setNewEquipment('');
      setShowEquipmentInput(false);
    }
  };

  const handleRemoveEquipment = (index) => {
    const newEquipment = [...data.equipment];
    newEquipment.splice(index, 1);
    onUpdate({ ...data, equipment: newEquipment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Insurance Requirements */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Insurance Requirements</h3>
              <p className="text-sm text-gray-500">Specify insurance requirements for participants</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data.insurance.required}
              onChange={(e) => onUpdate({
                ...data,
                insurance: { ...data.insurance, required: e.target.checked }
              })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
        </div>

        {data.insurance.required && (
          <div className="mt-4 space-y-4">
            <textarea
              value={data.insurance.details}
              onChange={(e) => onUpdate({
                ...data,
                insurance: { ...data.insurance, details: e.target.value }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.insurance ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Specify insurance requirements..."
            />
            {errors.insurance && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.insurance}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sound Limits */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Sound Limits</h3>
              <p className="text-sm text-gray-500">Set sound level restrictions for the event</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data.sound.required}
              onChange={(e) => onUpdate({
                ...data,
                sound: { ...data.sound, required: e.target.checked }
              })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
        </div>

        {data.sound.required && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={data.sound.limit}
                  onChange={(e) => onUpdate({
                    ...data,
                    sound: { ...data.sound, limit: e.target.value }
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    errors.sound ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sound limit in dB"
                />
                {errors.sound && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.sound}
                  </p>
                )}
              </div>
              <textarea
                value={data.sound.details}
                onChange={(e) => onUpdate({
                  ...data,
                  sound: { ...data.sound, details: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                rows={1}
                placeholder="Additional sound limit details..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Tech Inspection */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Wrench className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Tech Inspection</h3>
              <p className="text-sm text-gray-500">Define technical inspection requirements</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data.techInspection.required}
              onChange={(e) => onUpdate({
                ...data,
                techInspection: { ...data.techInspection, required: e.target.checked }
              })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
        </div>

        {data.techInspection.required && (
          <div className="mt-4">
            <textarea
              value={data.techInspection.details}
              onChange={(e) => onUpdate({
                ...data,
                techInspection: { ...data.techInspection, details: e.target.value }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.techInspection ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Specify tech inspection requirements..."
            />
            {errors.techInspection && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.techInspection}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Required Equipment */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Required Equipment</h3>
              <p className="text-sm text-gray-500">List required safety equipment for participants</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {data.equipment?.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveEquipment(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {showEquipmentInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="Add equipment requirement..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEquipment();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddEquipment}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowEquipmentInput(true)}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Equipment Requirement
            </button>
          )}
        </div>
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

export default RequirementsLimits;