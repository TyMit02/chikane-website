import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export class EmailService {
  static async subscribeEmail(email, source = 'events_page') {
    try {
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

      // Add new subscriber
      const docRef = await addDoc(emailsRef, {
        email,
        source,
        subscribed: true,
        subscribedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
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
}