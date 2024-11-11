import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCreationStepper from './EventCreationStepper';
import BasicDetails from './steps/BasicDetails';
import RequirementsLimits from './steps/RequirementsLimits';
import { eventCreationSteps } from './eventCreationSteps';
import RunGroups from './steps/RunGroups';
import RegistrationSettings from './steps/RegistrationSettings';
import Schedule from './steps/Schedule';
import DocumentsRules from './steps/DocumentsRules';
import ReviewPublish from './steps/ReviewPublish';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '@/services/eventService';

const EventCreation = () => {
  const [currentStep, setCurrentStep] = useState('basics');
  const [completedSteps, setCompletedSteps] = useState([]);
  const { eventId } = useParams(); // For editing existing events
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = async () => {
    setLoading(true);
    try {
      const eventData = await getEvent(eventId);
      if (eventData) {
        setFormData(eventData);
        // Set completed steps based on filled data
        const completed = [];
        if (eventData.basics.name) completed.push('basics');
        if (eventData.requirements.insurance.required || eventData.requirements.equipment.length > 0) {
          completed.push('requirements');
        }
        // Add other step completions...
        setCompletedSteps(completed);
      }
    } catch (error) {
      console.error('Error loading event:', error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    basics: {
      name: '',
      dates: [],
      track: '',
      trackConfiguration: '',
      eventType: '',
      description: '',
      participantLimit: '',
      experienceLevel: '',
      logo: null
    },
    requirements: {
      insurance: {
        required: false,
        details: ''
      },
      sound: {
        required: false,
        limit: '',
        details: ''
      },
      techInspection: {
        required: false,
        details: ''
      },
      equipment: []
    },
    groups: [],
    registration: {
      openDate: null,
      closeDate: null,
      earlyBirdDate: null,
      pricing: {
        regular: '',
        earlyBird: ''
      },
      waitlist: {
        enabled: false,
        limit: ''
      },
      customQuestions: []
    },
    schedule: {
      template: null,
      sessions: [],
      breaks: [],
      briefings: []
    },
    documents: {
      supplementaryRules: [],
      trackMaps: [],
      waivers: [],
      techForms: []
    }
  });

  const handleStepComplete = (step) => {
    // Add current step to completed steps if not already included
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
    
    // Find the index of the current step and move to the next one
    const currentIndex = eventCreationSteps.findIndex(s => s.id === step);
    if (currentIndex < eventCreationSteps.length - 1) {
      setCurrentStep(eventCreationSteps[currentIndex + 1].id);
    }
  };

  const handleStepClick = (step) => {
    if (completedSteps.includes(step) || currentStep === step) {
      setCurrentStep(step);
    }
  };

  const handleUpdateBasics = (basicData) => {
    setFormData(prev => ({
      ...prev,
      basics: basicData
    }));
  };

  const handleBack = () => {
    // Find current step index and move to previous step
    const currentIndex = eventCreationSteps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(eventCreationSteps[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-500">Set up your track day event details</p>
          </div>
          <EventCreationStepper
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 'basics' && (
                <BasicDetails
                  data={formData.basics}
                  onUpdate={handleUpdateBasics}
                  onNext={() => handleStepComplete('basics')}
                />
              )}
              {currentStep === 'requirements' && (
                <RequirementsLimits
                  data={formData.requirements}
                  onUpdate={(requirementsData) => setFormData(prev => ({
                    ...prev,
                    requirements: requirementsData
                  }))}
                  onNext={() => handleStepComplete('requirements')}
                  onBack={handleBack}
                />
              )}
              {currentStep === 'groups' && (
  <RunGroups
    data={formData.groups}
    onUpdate={(groupsData) => setFormData(prev => ({
      ...prev,
      groups: groupsData
    }))}
    onNext={() => handleStepComplete('groups')}
    onBack={handleBack}
  />
)}
{currentStep === 'registration' && (
  <RegistrationSettings
    data={formData.registration}
    onUpdate={(registrationData) => setFormData(prev => ({
      ...prev,
      registration: registrationData
    }))}
    onNext={() => handleStepComplete('registration')}
    onBack={handleBack}
  />
)}
{currentStep === 'schedule' && (
  <Schedule
    data={{
      ...formData.schedule,
      groups: formData.groups // Pass the groups data here
    }}
    onUpdate={(scheduleData) => setFormData(prev => ({
      ...prev,
      schedule: {
        template: scheduleData.template,
        sessions: scheduleData.sessions,
        breaks: scheduleData.breaks,
        briefings: scheduleData.briefings
      }
    }))}
    onNext={() => handleStepComplete('schedule')}
    onBack={handleBack}
  />
)}
{currentStep === 'documents' && (
  <DocumentsRules
    data={formData.documents}
    onUpdate={(documentsData) => setFormData(prev => ({
      ...prev,
      documents: documentsData
    }))}
    onNext={() => handleStepComplete('documents')}
    onBack={handleBack}
  />
)}
{currentStep === 'review' && (
  <ReviewPublish
    data={formData}
    onUpdate={(updatedData) => setFormData(updatedData)}
    onNext={() => handleStepComplete('review')}
    onBack={handleBack}
  />
)}
              {/* Add other step components */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;