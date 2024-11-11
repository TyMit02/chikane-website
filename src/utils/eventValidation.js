// Event validation utilities
export const validateEvent = (eventData) => {
    const errors = {};
  
    // Basic Details Validation
    if (!eventData.basics?.name?.trim()) {
      errors.name = 'Event name is required';
    }
    
    if (!eventData.basics?.participantLimit || eventData.basics.participantLimit < 1) {
      errors.participantLimit = 'Valid participant limit is required';
    }
  
    // Registration Validation
    if (eventData.registration?.openDate && eventData.registration?.closeDate) {
      const openDate = new Date(eventData.registration.openDate);
      const closeDate = new Date(eventData.registration.closeDate);
      
      if (closeDate <= openDate) {
        errors.registration = 'Close date must be after open date';
      }
    }
  
    // Run Groups Validation
    if (!eventData.groups?.length) {
      errors.groups = 'At least one run group is required';
    }
  
    // Schedule Validation
    if (eventData.schedule?.sessions?.length > 0) {
      const sessions = eventData.schedule.sessions;
      for (let i = 0; i < sessions.length - 1; i++) {
        const currentEnd = new Date(sessions[i].startTime).getTime() + 
                          (sessions[i].duration * 60000);
        const nextStart = new Date(sessions[i + 1].startTime).getTime();
        
        if (currentEnd > nextStart) {
          errors.schedule = 'Schedule has time conflicts';
          break;
        }
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Session time slot availability checker
  export const getAvailableTimeSlots = (schedule, duration) => {
    const slots = [];
    const sessions = schedule.sessions || [];
    
    if (sessions.length === 0) {
      return [{ start: new Date().setHours(9, 0, 0, 0), available: true }];
    }
  
    sessions.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  
    // Check morning slots
    const firstSession = new Date(sessions[0].startTime);
    const morningStart = new Date(firstSession);
    morningStart.setHours(9, 0, 0, 0);
  
    if (firstSession.getTime() - morningStart.getTime() >= duration * 60000) {
      slots.push({ start: morningStart, available: true });
    }
  
    // Check between sessions
    for (let i = 0; i < sessions.length - 1; i++) {
      const currentEnd = new Date(sessions[i].startTime);
      currentEnd.setMinutes(currentEnd.getMinutes() + sessions[i].duration);
      
      const nextStart = new Date(sessions[i + 1].startTime);
      const gap = nextStart.getTime() - currentEnd.getTime();
      
      if (gap >= duration * 60000) {
        slots.push({ start: currentEnd, available: true });
      }
    }
  
    // Check afternoon slots
    const lastSession = sessions[sessions.length - 1];
    const lastEnd = new Date(lastSession.startTime);
    lastEnd.setMinutes(lastEnd.getMinutes() + lastSession.duration);
    
    const dayEnd = new Date(lastEnd);
    dayEnd.setHours(17, 0, 0, 0);
  
    if (dayEnd.getTime() - lastEnd.getTime() >= duration * 60000) {
      slots.push({ start: lastEnd, available: true });
    }
  
    return slots;
  };