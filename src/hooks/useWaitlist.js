import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { validateEmail } from '../utils/validation';
import { trackEvent } from '../utils/analytics';

export const useWaitlist = (options = {}) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const join = async (email) => {
    const { isValid, message } = validateEmail(email);

    if (!isValid) {
      setError(message);
      setStatus('error');
      return { success: false, message };
    }

    setStatus('loading');
    setError('');

    try {
      // Check for existing email
      const emailsRef = collection(db, 'emailSubscribers');
      const q = query(emailsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const errorMessage = 'This email is already subscribed!';
        setStatus('error');
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      // Add new subscriber
      const docRef = await addDoc(emailsRef, {
        email,
        type: options.type || 'waitlist',
        source: options.source || 'website',
        subscribed: true,
        subscribedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        metadata: {
          userAgent: window.navigator.userAgent,
          language: window.navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });

      setStatus('success');
      return { 
        success: true, 
        message: 'Successfully joined the waitlist!',
        id: docRef.id 
      };
    } catch (err) {
      console.error('Error adding email to waitlist:', err);
      const errorMessage = 'Something went wrong. Please try again.';
      setStatus('error');
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return {
    status,
    error,
    join,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};
