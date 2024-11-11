import React from 'react';
import { validateEvent, getAvailableTimeSlots } from '@/utils/eventValidation';
import { generateEventPDF, generateWaiverPDF } from '@/utils/pdfGenerator';

const EventTesting = () => {
  // Test invalid event data
  const invalidEventData = {
    basics: {
      name: "", // Invalid: empty name
      participantLimit: 0 // Invalid: zero limit
    },
    groups: [], // Invalid: no groups
    schedule: {
      sessions: [
        {
          startTime: "2024-07-14T09:00:00",
          duration: 30
        },
        {
          startTime: "2024-07-14T09:15:00", // Invalid: overlapping sessions
          duration: 30
        }
      ]
    }
  };

  const runTests = () => {
    console.group('Event Validation Tests');
    
    // Test 1: Invalid Event
    const invalidResult = validateEvent(invalidEventData);
    console.log('Invalid Event Test:', invalidResult);

    // Test 2: Valid Event (using sample data)
    const validResult = validateEvent(sampleEventData);
    console.log('Valid Event Test:', validResult);

    // Test 3: Available Time Slots
    const slots = getAvailableTimeSlots(sampleEventData.schedule, 30);
    console.log('Available Time Slots:', slots);

    console.groupEnd();

    // Test PDF Generation
    const eventPDF = generateEventPDF(sampleEventData);
    eventPDF.save('test-event.pdf');

    // Test Waiver Generation
    const waiverPDF = generateWaiverPDF(sampleEventData, { name: 'Test Participant' });
    waiverPDF.save('test-waiver.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Event Utilities Testing</h1>
      <button
        onClick={runTests}
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
      >
        Run All Tests
      </button>
      <div className="mt-4">
        <p>Check the console for test results</p>
        <p>PDFs will be downloaded automatically</p>
      </div>
    </div>
  );
};

export default EventTesting;