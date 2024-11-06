import { motion } from 'framer-motion';
import { Timer, Users, Map, CalendarClock, Gauge, Wifi } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Precision Timing",
      description: "High-precision GPS-based lap timing with accuracy down to milliseconds."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Event Management",
      description: "Comprehensive tools for organizing, managing, and tracking track day events."
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Track Mapping",
      description: "Detailed track maps with sector timing and optimal line visualization."
    },
    {
      icon: <CalendarClock className="w-8 h-8" />,
      title: "Registration System",
      description: "Streamlined participant registration with automated confirmations."
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Live Timing",
      description: "Real-time leaderboards and timing displays for event spectators."
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Offline Support",
      description: "Full functionality even without internet connection at the track."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Comprehensive Event Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to organize and manage successful track day events
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;