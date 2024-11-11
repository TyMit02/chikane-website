import { 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    serverTimestamp,
    getDoc
  } from 'firebase/firestore';
  import { db, auth } from '../config/firebase';
  
  // Create new event
  export const createEvent = async (eventData, status = 'draft') => {
    try {

        const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('You must be logged in to create an event');
    }


      const eventsRef = collection(db, 'events');
      const newEvent = {
        ...eventData,
        status,
        organizerId: currentUser.uid,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: status === 'published' ? serverTimestamp() : null,
        scheduledPublishTime: status === 'scheduled' ? eventData.scheduledPublishTime : null,
        metadata: {
          lastModifiedBy: currentUser.uid,
          version: 1,
          isTemplate: false
        }
      };
  
      const docRef = await addDoc(eventsRef, newEvent);
    return { id: docRef.id, ...newEvent };
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
  
  // Update existing event
  export const updateEvent = async (eventId, eventData, status = 'draft') => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You must be logged in to update an event');
      }
  
      const eventRef = doc(db, 'events', eventId);
      const eventDoc = await getDoc(eventRef);
      
      if (!eventDoc.exists()) {
        throw new Error('Event not found');
      }
  
      // Check if user is the organizer
      if (eventDoc.data().organizerId !== currentUser.uid) {
        throw new Error('You do not have permission to update this event');
      }
  
      const updateData = {
        ...eventData,
        status,
        updatedAt: serverTimestamp(),
        'metadata.lastModifiedBy': currentUser.uid,
        'metadata.version': (eventDoc.data().metadata?.version || 0) + 1,
        publishedAt: status === 'published' ? serverTimestamp() : null,
        scheduledPublishTime: status === 'scheduled' ? eventData.scheduledPublishTime : null
      };
  
      await updateDoc(eventRef, updateData);
      return { id: eventId, ...updateData };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };
  
  // Get event by ID
  export const getEvent = async (eventId) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You must be logged in to view event details');
      }
  
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);
      
      if (!eventSnap.exists()) {
        throw new Error('Event not found');
      }
  
      return { id: eventSnap.id, ...eventSnap.data() };
    } catch (error) {
      console.error('Error getting event:', error);
      throw error;
    }
  };