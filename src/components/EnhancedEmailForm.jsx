// src/components/EnhancedEmailForm.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
import { validateEmail } from '../utils/validation';
import { useWaitlist } from '../hooks/useWaitlist';
import { useAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from './LoadingSpinner';
import SuccessAnimation from './SuccessAnimation';

const EnhancedEmailForm = ({ 
  type = 'waitlist',
  source = 'website',
  buttonText = 'Join Waitlist',
  successMessage = 'Successfully joined the waitlist!'
}) => {
  const [email, setEmail] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [focusState, setFocusState] = useState(false);
  const { status, error, join } = useWaitlist({ type, source });
  const { trackSignup, trackEngagement } = useAnalytics();
  const [formStartTime] = useState(Date.now());

  useEffect(() => {
    // Track form view
    trackEngagement('form_view', { formType: type, source });

    // Track form interactions
    const form = document.querySelector('form');
    const trackFormFocus = () => trackEngagement('form_focus', { formType: type });
    form?.addEventListener('focus', trackFormFocus, true);
    
    return () => {
      form?.removeEventListener('focus', trackFormFocus, true);
      // Track time spent on form when unmounting
      const timeSpent = (Date.now() - formStartTime) / 1000;
      trackEngagement('form_time_spent', { 
        formType: type, 
        duration: timeSpent,
        completed: status === 'success'
      });
    };
  }, [trackEngagement, type, source, formStartTime, status]);

  useEffect(() => {
    let timeout;
    if (isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        // Track typing pause
        trackEngagement('form_typing_pause', { 
          formType: type,
          hasContent: email.length > 0
        });
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isTyping, email, type, trackEngagement]);

  useEffect(() => {
    if (error) {
      trackEngagement('form_error', {
        formType: type,
        errorType: error,
        fieldValue: email
      });
    }
  }, [error, type, email, trackEngagement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeToSubmit = (Date.now() - formStartTime) / 1000;
    
    trackEngagement('form_submit_attempt', { 
      formType: type, 
      source,
      timeToSubmit
    });
    
    const result = await join(email);
    
    if (result.success) {
      await trackSignup(email, source);
      setEmail('');
      trackEngagement('form_submit_success', {
        formType: type,
        timeToSubmit
      });
    } else {
      trackEngagement('form_submit_failure', {
        formType: type,
        error: result.message,
        timeToSubmit
      });
    }
  };

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsTyping(true);
    
    // Track significant input changes
    if (!isTyping) {
      trackEngagement('form_input_start', { 
        formType: type,
        fieldType: 'email'
      });
    }
    
    // Track email validity changes
    const { isValid } = validateEmail(newEmail);
    if (isValid) {
      trackEngagement('form_valid_email', { 
        formType: type
      });
    }
  };

  const handleFocus = () => {
    setFocusState(true);
    trackEngagement('form_field_focus', {
      formType: type,
      fieldType: 'email'
    });
  };

  const handleBlur = () => {
    setFocusState(false);
    trackEngagement('form_field_blur', {
      formType: type,
      fieldType: 'email',
      hasContent: email.length > 0,
      isValid: validateEmail(email).isValid
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <motion.div
          animate={focusState ? { scale: 0.98 } : { scale: 1 }}
          className="relative"
        >
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter your email"
            aria-label="Email address"
            disabled={status === 'loading' || status === 'success'}
            className={`
              w-full px-4 py-3 rounded-lg border transition-all duration-200
              ${error ? 'border-red-500' : focusState ? 'border-accent' : 'border-gray-300'}
              ${status === 'success' ? 'bg-green-50' : ''}
              focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
            `}
          />
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 flex items-center text-sm text-red-500"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full px-6 py-3 rounded-lg flex items-center justify-center
          transition-all duration-200 space-x-2
          ${status === 'success' 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-accent hover:bg-accent/90'
          }
          text-white disabled:opacity-50
        `}
        onMouseEnter={() => trackEngagement('form_button_hover', { formType: type })}
      >
        {status === 'loading' && <LoadingSpinner />}
        {status === 'success' && <SuccessAnimation />}
        <span>
          {status === 'loading' ? 'Joining...' 
           : status === 'success' ? successMessage 
           : buttonText}
        </span>
      </motion.button>

      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-center text-green-600"
          >
            Thank you for joining! We'll be in touch soon.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};

export default EnhancedEmailForm;