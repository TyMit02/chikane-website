import { useEffect, useState } from 'react';
import { AnalyticsService } from '../utils/analytics';

export const useAnalytics = () => {
  const [sessionStartTime] = useState(Date.now());
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Generate or retrieve session ID
    const sessionId = localStorage.getItem('sessionId') || 
      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);

    // Track visit count
    const currentCount = parseInt(localStorage.getItem('visitCount') || '0');
    localStorage.setItem('visitCount', (currentCount + 1).toString());
    setVisitCount(currentCount + 1);

    // Track page view
    AnalyticsService.trackEngagement('page_view', {
      sessionId,
      visitNumber: currentCount + 1
    });

    // Track time spent on page
    const trackTimeSpent = () => {
      const timeSpent = (Date.now() - sessionStartTime) / 1000; // in seconds
      AnalyticsService.trackEngagement('time_spent', {
        duration: timeSpent,
        sessionId
      });
    };

    window.addEventListener('beforeunload', trackTimeSpent);
    return () => window.removeEventListener('beforeunload', trackTimeSpent);
  }, [sessionStartTime]);

  return {
    trackSignup: (email, source) => {
      return AnalyticsService.trackWaitlistSignup(email, source, {
        timeSpentOnPage: (Date.now() - sessionStartTime) / 1000,
        visitNumber: visitCount
      });
    },
    trackEngagement: AnalyticsService.trackEngagement
  };
};
