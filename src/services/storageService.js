import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject 
  } from 'firebase/storage';
  import { storage } from '../config/firebase';
  
  // Upload event document
  export const uploadEventDocument = async (eventId, file, type) => {
    try {
      const fileRef = ref(storage, `events/${eventId}/${type}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Error uploading event document:', error);
      throw error;
    }
  };
  
  // Upload user profile photo
  export const uploadProfilePhoto = async (userId, file) => {
    try {
      const fileRef = ref(storage, `users/${userId}/profile/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  };
  
  // Upload vehicle photo
  export const uploadVehiclePhoto = async (userId, vehicleId, file) => {
    try {
      const fileRef = ref(storage, `users/${userId}/vehicles/${vehicleId}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Error uploading vehicle photo:', error);
      throw error;
    }
  };
  
  // Upload track map
  export const uploadTrackMap = async (trackId, file) => {
    try {
      const fileRef = ref(storage, `tracks/${trackId}/maps/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Error uploading track map:', error);
      throw error;
    }
  };
  
  // Delete file from storage
  export const deleteFile = async (filePath) => {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };
  
  // Get file URL
  export const getFileURL = async (filePath) => {
    try {
      const fileRef = ref(storage, filePath);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  };