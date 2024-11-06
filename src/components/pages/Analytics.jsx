import { motion } from 'framer-motion';
import { 
  BarChart2, Timer, Flag, TrendingUp, 
  Users, Clock, Calendar, MapPin, Trophy 
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-6 shadow-lg"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-accent/10 rounded-lg text-accent">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
    </div>
    <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-primary-dark">{value}</p>
  </motion.div>
);

const PerformanceCard = ({ title, stats, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-6 shadow-lg"
  >
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index} className="relative">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">{stat.label}</span>
            <span className="font-semibold">{stat.value}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${stat.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-accent rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
    <p className="mt-4 text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const Analytics = () => {
  const stats = [
    { 
      title: "Average Lap Time",
      value: "1:24.356",
      change: -2.5,
      icon: Timer
    },
    {
      title: "Total Sessions",
      value: "1,234",
      change: 15.8,
      icon: Calendar
    },
    {
      title: "Active Users",
      value: "892",
      change: 12.3,
      icon: Users
    },
    {
      title: "Track Records",
      value: "47",
      change: 8.4,
      icon: Trophy
    }
  ];

  const lapTimeStats = {
    title: "Lap Time Distribution",
    stats: [
      { label: "Personal Best", value: "1:22.451", percentage: 95 },
      { label: "Average Time", value: "1:24.356", percentage: 85 },
      { label: "Consistency", value: "98.2%", percentage: 98 }
    ],
    description: "Your lap times show consistent improvement over the last 30 days."
  };

  const sectorStats = {
    title: "Sector Performance",
    stats: [
      { label: "Sector 1", value: "28.432s", percentage: 92 },
      { label: "Sector 2", value: "31.654s", percentage: 88 },
      { label: "Sector 3", value: "24.270s", percentage: 94 }
    ],
    description: "Sector 1 shows the most consistent performance with room for improvement in Sector 2."
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
              Performance Analytics
            </h1>
            <p className="text-xl text-gray-600">
              Track your progress and gain insights into your racing performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Analysis */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceCard {...lapTimeStats} />
            <PerformanceCard {...sectorStats} />
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                track: "Silverstone Circuit",
                date: "Today",
                time: "1:23.456",
                position: "1st"
              },
              {
                track: "Spa-Francorchamps",
                date: "Yesterday",
                time: "2:15.789",
                position: "2nd"
              },
              {
                track: "Nürburgring",
                date: "2 days ago",
                time: "1:54.321",
                position: "3rd"
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <MapPin className="text-accent" />
                  <div>
                    <h3 className="font-semibold">{activity.track}</h3>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{activity.time}</p>
                  <p className="text-sm text-accent">{activity.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;