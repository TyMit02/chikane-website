import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where,
    orderBy,
    limit 
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  // Get all tracks
  export const getAllTracks = async () => {
    try {
      const tracksRef = collection(db, 'tracks');
      const tracksSnap = await getDocs(tracksRef);
      return tracksSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting tracks:', error);
      throw error;
    }
  };
  
  // Get track details
  export const getTrackDetails = async (trackId) => {
    try {
      const trackDoc = await getDoc(doc(db, 'tracks', trackId));
      if (trackDoc.exists()) {
        return { id: trackDoc.id, ...trackDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting track details:', error);
      throw error;
    }
  };
  
  // Get track configurations
  export const getTrackConfigurations = async (trackId) => {
    try {
      const configsRef = collection(db, 'tracks', trackId, 'configurations');
      const configsSnap = await getDocs(configsRef);
      return configsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting track configurations:', error);
      throw error;
    }
  };
  
  // Get track records
  export const getTrackRecords = async (trackId, configurationId = null) => {
    try {
      let recordsQuery = query(
        collection(db, 'tracks', trackId, 'records'),
        orderBy('time', 'asc')
      );
  
      if (configurationId) {
        recordsQuery = query(recordsQuery, where('configurationId', '==', configurationId));
      }
  
      const recordsSnap = await getDocs(recordsQuery);
      return recordsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting track records:', error);
      throw error;
    }
  };
  
  // Get recent lap times for a track
  export const getRecentLapTimes = async (trackId, limit = 10) => {
    try {
      const laptimesQuery = query(
        collection(db, 'tracks', trackId, 'laptimes'),
        orderBy('timestamp', 'desc'),
        limit(limit)
      );
      const laptimesSnap = await getDocs(laptimesQuery);
      return laptimesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting recent lap times:', error);
      throw error;
    }
  };