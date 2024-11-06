import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Timer, Users, BarChart2, ArrowRight, Calendar, 
  Trophy, Gauge, Activity, MapPin, Clock
} from 'lucide-react';
import HeroSection from '../sections/HeroSection';

// Reusable preview card component
const PreviewCard = ({ title, description, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-accent mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Section header component
const SectionHeader = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-center mb-12"
  >
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      {description}
    </p>
  </motion.div>
);

// Explore more button component
const ExploreButton = ({ to, text }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center"
  >
    <Link 
      to={to}
      className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
    >
      {text}
      <ArrowRight className="ml-2 w-4 h-4" />
    </Link>
  </motion.div>
);

const Home = () => {
  const features = [
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Precision Timing",
      description: "GPS-based lap timing accurate to milliseconds"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Event Management",
      description: "Comprehensive tools for track day organization"
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Instant performance insights and statistics"
    }
  ];

  const analyticsMetrics = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "45% Improvement",
      description: "Average lap time enhancement"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Real-time Data",
      description: "Live performance tracking"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "10K+ Sessions",
      description: "Track days analyzed"
    }
  ];

  const upcomingEvents = [
    {
      title: "Track Day Championship",
      date: "March 15, 2024",
      location: "Silverstone Circuit",
      participants: 24
    },
    {
      title: "Endurance Racing Event",
      date: "April 2, 2024",
      location: "Spa-Francorchamps",
      participants: 32
    },
    {
      title: "Sprint Series Final",
      date: "April 20, 2024",
      location: "Nürburgring",
      participants: 18
    }
  ];

  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      {/* Features Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader 
            title="Key Features"
            description="Everything you need for professional track day management"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <PreviewCard 
                key={index}
                {...feature}
                delay={index * 0.2}
              />
            ))}
          </div>

          <ExploreButton to="/features" text="Explore All Features" />
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader 
            title="Performance Analytics"
            description="Track your progress with comprehensive data analysis"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {analyticsMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl shadow-lg text-center"
              >
                <div className="inline-block p-3 bg-accent/10 rounded-full text-accent mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{metric.title}</h3>
                <p className="text-gray-600">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          <ExploreButton to="/analytics" text="View Full Analytics" />
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader 
            title="Upcoming Events"
            description="Join our next track day events"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.participants} Participants</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <ExploreButton to="/events" text="View All Events" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Elevate Your Track Day Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of motorsport enthusiasts using Chikane for professional lap timing and event management.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Download Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;