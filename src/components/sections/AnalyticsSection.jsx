import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, Timer, Map, Activity } from 'lucide-react';

const AnalyticsSection = () => {
  const analytics = [
    {
      label: "Event Participation",
      value: "+45%",
      description: "Increase in monthly active participants",
      icon: <Users className="w-6 h-6" />
    },
    {
      label: "Lap Time Improvement",
      value: "12.3s",
      description: "Average improvement per driver",
      icon: <Timer className="w-6 h-6" />
    },
    {
      label: "Track Usage",
      value: "89%",
      description: "Track utilization rate",
      icon: <Map className="w-6 h-6" />
    },
    {
      label: "Performance Metrics",
      value: "10M+",
      description: "Data points collected",
      icon: <Activity className="w-6 h-6" />
    }
  ];

  return (
    <section id="analytics" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Data-Driven Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive analytics to track performance and event metrics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {analytics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-highlight/10 rounded-lg text-highlight">
                  {item.icon}
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-600">
                  {item.label}
                </h3>
                <p className="text-3xl font-bold text-primary-dark">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-primary-dark rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Real-Time Performance Tracking
              </h3>
              <p className="text-gray-300">
                Get instant insights into lap times, sector splits, and performance metrics.
                Track progress over time and identify areas for improvement.
              </p>
              <button className="mt-6 px-6 py-2 bg-accent rounded-lg hover:bg-accent/90 transition-colors">
                Learn More
              </button>
            </div>
            <div className="relative h-64">
              <BarChart2 className="w-full h-full text-accent/20" />
              {/* Add your actual chart component here */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsSection;