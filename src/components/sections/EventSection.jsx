import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';

const EventsSection = () => {
  const upcomingEvents = [
    {
      title: "Track Day Championship",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Silverstone Circuit",
      participants: 24,
      image: "/images/track-1.jpg" // Add appropriate image
    },
    {
      title: "Endurance Racing Event",
      date: "April 2, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Spa-Francorchamps",
      participants: 32,
      image: "/images/track-2.jpg" // Add appropriate image
    },
    {
      title: "Sprint Series Final",
      date: "April 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Nürburgring",
      participants: 18,
      image: "/images/track-3.jpg" // Add appropriate image
    }
  ];

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
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our upcoming track days and racing events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {/* Add actual event image here */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{event.participants} Participants</span>
                </div>
                <button className="w-full px-6 py-2 mt-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center">
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
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