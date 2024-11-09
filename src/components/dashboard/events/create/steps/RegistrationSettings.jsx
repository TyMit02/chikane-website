import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, DollarSign, ClipboardList, Plus, 
  Trash2, GripVertical, AlertCircle, HelpCircle,
  Check, X
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const RegistrationSettings = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    type: 'text',
    label: '',
    required: false,
    options: ['']
  });

  const questionTypes = [
    { id: 'text', label: 'Text Input' },
    { id: 'textarea', label: 'Long Text' },
    { id: 'select', label: 'Dropdown' },
    { id: 'radio', label: 'Single Choice' },
    { id: 'checkbox', label: 'Multiple Choice' },
    { id: 'number', label: 'Number' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!data.openDate) newErrors.openDate = 'Registration open date is required';
    if (!data.closeDate) newErrors.closeDate = 'Registration close date is required';
    if (!data.pricing.regular) newErrors.pricing = 'Regular pricing is required';
    if (data.closeDate && data.openDate && new Date(data.closeDate) <= new Date(data.openDate)) {
      newErrors.dates = 'Close date must be after open date';
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.label) {
      onUpdate({
        ...data,
        customQuestions: [...data.customQuestions, { ...newQuestion, id: Date.now() }]
      });
      setNewQuestion({
        type: 'text',
        label: '',
        required: false,
        options: ['']
      });
      setShowQuestionForm(false);
    }
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...data.customQuestions];
    newQuestions.splice(index, 1);
    onUpdate({ ...data, customQuestions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...data.customQuestions];
    newQuestions[questionIndex].options[optionIndex] = value;
    onUpdate({ ...data, customQuestions: newQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...data.customQuestions];
    newQuestions[questionIndex].options.push('');
    onUpdate({ ...data, customQuestions: newQuestions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Registration Dates */}
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-medium text-gray-900">Registration Period</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Registration Opens *
            </label>
            <DatePicker
              selected={data.openDate ? new Date(data.openDate) : null}
              onChange={(date) => onUpdate({ ...data, openDate: date })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.openDate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholderText="Select opening date and time"
            />
            {errors.openDate && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.openDate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Registration Closes *
            </label>
            <DatePicker
              selected={data.closeDate ? new Date(data.closeDate) : null}
              onChange={(date) => onUpdate({ ...data, closeDate: date })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.closeDate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholderText="Select closing date and time"
              minDate={data.openDate ? new Date(data.openDate) : null}
            />
            {errors.closeDate && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.closeDate}
              </p>
            )}
          </div>
        </div>

        {/* Early Bird Settings */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-gray-900">Early Bird Pricing</h4>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {/* Add tooltip or modal explanation */}}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={data.earlyBirdDate !== null}
                onChange={(e) => onUpdate({
                  ...data,
                  earlyBirdDate: e.target.checked ? new Date() : null
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          {data.earlyBirdDate !== null && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Early Bird Deadline
                </label>
                <DatePicker
                  selected={data.earlyBirdDate ? new Date(data.earlyBirdDate) : null}
                  onChange={(date) => onUpdate({ ...data, earlyBirdDate: date })}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholderText="Select early bird deadline"
                  maxDate={data.closeDate ? new Date(data.closeDate) : null}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Early Bird Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={data.pricing.earlyBird}
                    onChange={(e) => onUpdate({
                      ...data,
                      pricing: { ...data.pricing, earlyBird: e.target.value }
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">Regular Pricing</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Regular Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={data.pricing.regular}
                onChange={(e) => onUpdate({
                  ...data,
                  pricing: { ...data.pricing, regular: e.target.value }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                  errors.pricing ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.pricing && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.pricing}
                </p>
              )}
            </div>
          </div>

          {/* Waitlist Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Enable Waitlist
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={data.waitlist.enabled}
                  onChange={(e) => onUpdate({
                    ...data,
                    waitlist: { ...data.waitlist, enabled: e.target.checked }
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            {data.waitlist.enabled && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waitlist Limit
                </label>
                <input
                  type="number"
                  value={data.waitlist.limit}
                  onChange={(e) => onUpdate({
                    ...data,
                    waitlist: { ...data.waitlist, limit: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Maximum waitlist spots"
                  min="1"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Questions */}
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ClipboardList className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-medium text-gray-900">Registration Questions</h3>
          </div>
          <button
            type="button"
            onClick={() => setShowQuestionForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors"
            disabled={showQuestionForm}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </button>
        </div>

        {/* Question Form */}
        <AnimatePresence>
          {showQuestionForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-accent/20 rounded-lg p-4 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">Add New Question</h4>
                <button
                  type="button"
                  onClick={() => setShowQuestionForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Question Type
                  </label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      {questionTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Question Label
                    </label>
                    <input
                      type="text"
                      value={newQuestion.label}
                      onChange={(e) => setNewQuestion({ ...newQuestion, label: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="Enter your question"
                    />
                  </div>
                </div>
  
                {/* Options for select, radio, or checkbox types */}
                {['select', 'radio', 'checkbox'].includes(newQuestion.type) && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <div className="space-y-2">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...newQuestion.options];
                              newOptions[index] = e.target.value;
                              setNewQuestion({ ...newQuestion, options: newOptions });
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                            placeholder={`Option ${index + 1}`}
                          />
                          {index === newQuestion.options.length - 1 && (
                            <button
                              type="button"
                              onClick={() => setNewQuestion({
                                ...newQuestion,
                                options: [...newQuestion.options, '']
                              })}
                              className="p-2 text-accent hover:bg-accent/10 rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                <div className="flex items-center justify-between pt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newQuestion.required}
                      onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        required: e.target.checked
                      })}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-gray-700">Required field</span>
                  </label>
  
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Questions List */}
          <div className="space-y-4">
            {data.customQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg group"
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {question.label}
                    </h4>
                    {question.required && (
                      <span className="text-xs text-accent">Required</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {questionTypes.find(t => t.id === question.type)?.label}
                  </p>
                  {['select', 'radio', 'checkbox'].includes(question.type) && (
                    <div className="mt-2 space-y-1">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="text-sm text-gray-600">
                          • {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
  
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => {
                      setNewQuestion({ ...question });
                      setShowQuestionForm(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
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
  
  export default RegistrationSettings;