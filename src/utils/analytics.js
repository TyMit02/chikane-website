import { getAnalytics, logEvent } from 'firebase/analytics';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

export class AnalyticsService {
  static async trackWaitlistSignup(email, source, metadata = {}) {
    try {
      const analytics = getAnalytics();
      const timestamp = Timestamp.now();

      // Log the signup event in Firebase Analytics
      logEvent(analytics, 'waitlist_signup', {
        source,
        timestamp: timestamp.toDate().toISOString(),
        ...metadata
      });

      // Store detailed analytics in Firestore
      const analyticsRef = collection(db, 'analytics');
      await addDoc(analyticsRef, {
        type: 'signup',
        email,
        source,
        timestamp,
        metadata: {
          ...metadata,
          device: {
            userAgent: window.navigator.userAgent,
            language: window.navigator.language,
            platform: window.navigator.platform,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          session: {
            referrer: document.referrer,
            landingPage: window.location.pathname,
            timeSpentBeforeSignup: metadata.timeSpentOnPage || 0,
            previousVisits: parseInt(localStorage.getItem('visitCount') || '0')
          }
        }
      });
    } catch (error) {
      console.error('Error tracking signup:', error);
    }
  }

  static async trackEngagement(action, details = {}) {
    try {
      const analytics = getAnalytics();
      const timestamp = Timestamp.now();

      logEvent(analytics, `engagement_${action}`, {
        timestamp: timestamp.toDate().toISOString(),
        ...details
      });

      const analyticsRef = collection(db, 'analytics');
      await addDoc(analyticsRef, {
        type: 'engagement',
        action,
        timestamp,
        details: {
          ...details,
          path: window.location.pathname,
          sessionId: localStorage.getItem('sessionId')
        }
      });
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  }

  // Get signup conversion rate for a specific time period
  static async getConversionRate(startDate, endDate) {
    try {
      const analyticsRef = collection(db, 'analytics');
      const q = query(
        analyticsRef,
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      const signups = querySnapshot.docs.filter(doc => doc.data().type === 'signup').length;
      const pageViews = querySnapshot.docs.filter(doc => 
        doc.data().type === 'engagement' && doc.data().action === 'page_view'
      ).length;

      return pageViews > 0 ? (signups / pageViews) * 100 : 0;
    } catch (error) {
      console.error('Error calculating conversion rate:', error);
      return 0;
    }
  }
}
