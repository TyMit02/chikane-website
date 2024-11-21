import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (type === 'signup' && token) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });

          if (error) throw error;
          setStatus('success');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      } catch (error) {
        console.error('Error confirming email:', error);
        setStatus('error');
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <Loader className="h-12 w-12 text-accent mx-auto animate-spin" />
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Verifying your email
              </h2>
              <p className="mt-2 text-gray-600">
                Please wait while we confirm your email address...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Email Verified!
              </h2>
              <p className="mt-2 text-gray-600">
                Your email has been successfully verified. You'll be redirected to the dashboard shortly.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Verification Failed
              </h2>
              <p className="mt-2 text-gray-600">
                We couldn't verify your email. The link might be expired or invalid.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 text-accent hover:text-accent/90"
              >
                Return to login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmation;