import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, Bell, Mail, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const EventsSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      // Check for existing email
      const emailsRef = collection(db, 'emailSubscribers');
      const q = query(emailsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatus('error');
        setMessage('This email is already subscribed!');
        return;
      }

      // Add new subscriber
      await addDoc(emailsRef, {
        email,
        source: 'events_section',
        type: 'waitlist',
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
      setMessage('Successfully joined the waitlist!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing email:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Be among the first to experience our revolutionary track day platform
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">Early Access Benefits</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Calendar, text: "Priority Event Registration" },
                    { icon: Trophy, text: "Exclusive Member Rates" },
                    { icon: Users, text: "Community Access" },
                    { icon: Bell, text: "Launch Notifications" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <item.icon className="w-5 h-5 mr-2 text-accent" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-lg mb-2">Join the Waitlist</h4>
                  <p className="text-gray-600 text-sm">
                    Be first in line for upcoming track days
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        status === 'error' ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:border-accent`}
                      disabled={status === 'loading' || status === 'success'}
                    />
                    {message && (
                      <p className={`mt-2 text-sm ${
                        status === 'success' ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"/>
                        Joining...
                      </span>
                    ) : status === 'success' ? (
                      'Successfully Joined!'
                    ) : (
                      <span className="flex items-center">
                        Join Waitlist
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary-dark rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-accent" />
                Create Your Own Event
              </h3>
              <p className="text-gray-300">
                Organize and manage your own track days with our comprehensive event management tools.
                Set up registrations, manage participants, and track results all in one place.
              </p>
              <button className="mt-6 px-6 py-2 bg-accent rounded-lg hover:bg-accent/90 transition-colors">
                Start Planning
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Easy Setup</h4>
                <p className="text-sm text-gray-300">Create and customize your event in minutes</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Registration</h4>
                <p className="text-sm text-gray-300">Handle participant signups effortlessly</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Live Timing</h4>
                <p className="text-sm text-gray-300">Real-time results and leaderboards</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Analytics</h4>
                <p className="text-sm text-gray-300">Comprehensive event statistics</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;