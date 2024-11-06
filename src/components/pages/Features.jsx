import { motion } from 'framer-motion';
import { 
  Timer, Users, Map, BarChart2, Gauge, Wifi, 
  Shield, Cloud, Zap, Settings, Smartphone, Share2
} from 'lucide-react';

const FeatureGroup = ({ title, description, features, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20"
  >
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
          <img 
            src={imageUrl || "/images/placeholder.jpg"} 
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const Features = () => {
  const featureGroups = [
    {
      title: "Precision Timing",
      description: "Professional-grade lap timing with unmatched accuracy",
      imageUrl: "/images/timing-feature.png",
      features: [
        {
          icon: <Timer className="w-6 h-6" />,
          title: "GPS Precision",
          description: "Millisecond accuracy with advanced GPS technology"
        },
        {
          icon: <Gauge className="w-6 h-6" />,
          title: "Real-time Updates",
          description: "Live timing data as you drive"
        },
        {
          icon: <Map className="w-6 h-6" />,
          title: "Track Detection",
          description: "Automatic track recognition and mapping"
        },
        {
          icon: <BarChart2 className="w-6 h-6" />,
          title: "Sector Times",
          description: "Detailed sector-by-sector analysis"
        }
      ]
    },
    {
      title: "Event Management",
      description: "Comprehensive tools for organizing successful track days",
      imageUrl: "/images/events-feature.png",
      features: [
        {
          icon: <Users className="w-6 h-6" />,
          title: "Registration System",
          description: "Simple participant management"
        },
        {
          icon: <Share2 className="w-6 h-6" />,
          title: "Live Results",
          description: "Real-time leaderboards and results"
        },
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "Cloud Sync",
          description: "Automatic data backup and syncing"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Secure Access",
          description: "Role-based permissions system"
        }
      ]
    },
    {
      title: "Technical Features",
      description: "Built with advanced technology for reliability",
      imageUrl: "/images/tech-feature.png",
      features: [
        {
          icon: <Wifi className="w-6 h-6" />,
          title: "Offline Mode",
          description: "Full functionality without internet"
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Cross-platform",
          description: "Available on iOS and Android"
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Low Latency",
          description: "Instant data processing"
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: "Customizable",
          description: "Flexible configuration options"
        }
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-primary-light to-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Professional Features for 
              <span className="text-accent block">Serious Racers</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-xl text-gray-600"
            >
              Everything you need to organize, manage, and analyze your track days
              with professional-grade precision.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Features Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {featureGroups.map((group, index) => (
            <FeatureGroup key={index} {...group} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-primary-dark text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Chikane?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of motorsport enthusiasts who trust Chikane for their track days.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Download Now
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Features;