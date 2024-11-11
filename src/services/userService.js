import { 
    doc, 
    getDoc, 
    updateDoc, 
    collection, 
    query, 
    where, 
    getDocs,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  // Get user profile
  export const getUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };
  
  // Update user profile
  export const updateUserProfile = async (userId, userData) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  
  // Get user's vehicles
  export const getUserVehicles = async (userId) => {
    try {
      const vehiclesRef = collection(db, 'users', userId, 'vehicles');
      const vehiclesSnap = await getDocs(vehiclesRef);
      return vehiclesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user vehicles:', error);
      throw error;
    }
  };
  
  // Get user's registered events
  export const getUserEvents = async (userId) => {
    try {
      const eventsQuery = query(
        collection(db, 'events'),
        where('participants', 'array-contains', userId)
      );
      const eventsSnap = await getDocs(eventsQuery);
      return eventsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user events:', error);
      throw error;
    }
  };
  
  // Get user's lap times
  export const getUserLapTimes = async (userId) => {
    try {
      const laptimesRef = collection(db, 'users', userId, 'laptimes');
      const laptimesSnap = await getDocs(laptimesRef);
      return laptimesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user lap times:', error);
      throw error;
    }
  };