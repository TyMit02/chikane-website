import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';


export class EmailService {
  static async subscribeEmail(email, source = 'events_page', type = 'waitlist') {
    try {
      // Input validation
      if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        };
      }

      // Check if email already exists
      const emailsRef = collection(db, 'emailSubscribers');
      const q = query(emailsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return {
          success: false,
          message: 'This email is already subscribed!'
        };
      }

      // Add new subscriber with additional metadata
      const docRef = await addDoc(emailsRef, {
        email,
        source,
        type,
        subscribed: true,
        subscribedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        metadata: {
          userAgent: window.navigator.userAgent,
          language: window.navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });

      return {
        success: true,
        message: 'Successfully subscribed!',
        id: docRef.id
      };
    } catch (error) {
      console.error('Error subscribing email:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again later.'
      };
    }
  }

  static async unsubscribeEmail(email) {
    try {
      const emailsRef = collection(db, 'emailSubscribers');
      const q = query(emailsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          success: false,
          message: 'Email not found in our system.'
        };
      }

      // Update the document to mark as unsubscribed
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        subscribed: false,
        unsubscribedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      });

      return {
        success: true,
        message: 'Successfully unsubscribed.'
      };
    } catch (error) {
      console.error('Error unsubscribing email:', error);
      return {
        success: false,
        message: 'An error occurred while unsubscribing.'
      };
    }
  }
}