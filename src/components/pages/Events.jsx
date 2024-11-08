import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Users, 
  Star, Bell, Mail, ChevronRight,
  Zap, Shield, Settings, Trophy
} from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Events = () => {
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
      const emailsRef = collection(db, 'emailSubscribers');
      const q = query(emailsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatus('error');
        setMessage('This email is already subscribed!');
        return;
      }

      await addDoc(emailsRef, {
        email,
        source: 'events_page',
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Coming Soon
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be among the first to experience our revolutionary track day event platform
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      status === 'error' ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-accent`}
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                  </button>
                </div>
                {message && (
                  <p className={`text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {message}
                  </p>
                )}
              </form>
              <p className="text-sm text-gray-500 mt-2">
                Be notified when we launch events in your area
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rest of your existing Events.jsx content */}
      {/* Features Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What to Expect</h2>
            <p className="text-gray-600">Coming soon to revolutionize your track day experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Event Management",
                description: "Easy-to-use tools for organizing and managing track day events"
              },
              {
                icon: Zap,
                title: "Live Timing",
                description: "Real-time lap timing and leaderboards for all participants"
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with other motorsport enthusiasts in your area"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Host Preview */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Interested in Hosting Events?
                </h2>
                <p className="text-gray-300 mb-8">
                  Join our network of track day organizers. Get early access to our event management platform and help shape its features.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center"
                  onClick={() => {
                    document.querySelector('#host-signup')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Register Interest
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Track Validation",
                  description: "Verified track day organizer status"
                },
                {
                  icon: Settings,
                  title: "Tools & Support",
                  description: "Comprehensive event management suite"
                },
                {
                  icon: Bell,
                  title: "Early Access",
                  description: "Be the first to use new features"
                },
                {
                  icon: Trophy,
                  title: "Recognition",
                  description: "Build your reputation in the community"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <feature.icon className="w-6 h-6 text-accent mb-2" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="host-signup" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Be the first to know when we launch in your area and receive exclusive early access offers
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      status === 'error' ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-accent`}
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"/>
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {message && (
                  <p className={`text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;