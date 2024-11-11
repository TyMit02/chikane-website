import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateEventPDF = (eventData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header
  doc.setFontSize(20);
  doc.text(eventData.basics.name, pageWidth / 2, 20, { align: 'center' });

  // Event Details
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(eventData.basics.date).toLocaleDateString()}`, 20, 40);
  doc.text(`Location: ${eventData.basics.track}`, 20, 50);
  doc.text(`Type: ${eventData.basics.eventType}`, 20, 60);

  // Run Groups Table
  if (eventData.groups?.length) {
    doc.autoTable({
      startY: 80,
      head: [['Group Name', 'Experience Level', 'Participants', 'Duration']],
      body: eventData.groups.map(group => [
        group.name,
        group.experienceLevel,
        `${group.maxParticipants}`,
        `${group.sessionDuration} min`
      ])
    });
  }

  // Schedule
  if (eventData.schedule?.sessions?.length) {
    const currentY = doc.previousAutoTable.finalY + 20;
    doc.text('Schedule', 20, currentY);
    
    doc.autoTable({
      startY: currentY + 10,
      head: [['Time', 'Session', 'Groups', 'Duration']],
      body: eventData.schedule.sessions.map(session => [
        new Date(session.startTime).toLocaleTimeString(),
        session.title,
        session.groups.join(', '),
        `${session.duration} min`
      ])
    });
  }

  return doc;
};

export const generateWaiverPDF = (eventData, participantData) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('WAIVER AND RELEASE OF LIABILITY', doc.internal.pageSize.width / 2, 20, { 
    align: 'center' 
  });

  doc.setFontSize(12);
  const text = `
    IN CONSIDERATION of being permitted to participate in ${eventData.basics.name} at ${eventData.basics.track}, 
    I acknowledge and agree to the following:

    1. I understand the risks involved in motorsport activities.
    2. I am physically fit and mentally capable of participating in this event.
    3. I will follow all safety instructions and track rules.
    4. I assume all risks associated with participation.

    Participant Name: ${participantData.name}
    Date: ${new Date().toLocaleDateString()}
    Event: ${eventData.basics.name}
    Location: ${eventData.basics.track}
    Date of Event: ${new Date(eventData.basics.date).toLocaleDateString()}
  `;

  doc.setFontSize(10);
  doc.text(text, 20, 40);

  // Signature field
  doc.line(20, 200, 100, 200);
  doc.text('Participant Signature', 20, 210);

  doc.line(120, 200, 190, 200);
  doc.text('Date', 120, 210);

  return doc;
};