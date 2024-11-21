import { ChevronRight, Timer, BarChart2, Flag, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate(); 
  return (
    <div className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light to-white"/>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"/>
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-highlight/10 rounded-full blur-3xl"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Professional 
              <span className="text-gradient block">Lap Timing</span>
              In Your Pocket
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Experience unmatched precision and analytics with our advanced GPS-based lap timer. Join the next generation of motorsport technology.
            </p>



  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
    {/* Join the Waitlist Button */}
    <button
      className="group flex items-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all"
      onClick={() => navigate('/events')}
    >
      <span>Join the waitlist</span>
      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </button>

    {/* Learn More Button */}
    <button className="px-8 py-4 border-2 border-accent text-accent rounded-xl hover:bg-accent hover:text-white transition-all">
      Learn More
    </button>
  </div>



            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              {[
                { value: "50+", label: "Supported Tracks" },
                { value: "99.9%", label: "Timing Accuracy" },
                { value: "0ms", label: "Input Lag" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-primary-dark">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Multi-Screen App Preview */}
          <div className="relative h-[600px] perspective-1000">
            {/* Main Screen */}
            <div className="relative z-30 transform translate-y-8">
              <div className="bg-[#0A1828] p-8 rounded-[2.5rem] shadow-2xl mx-auto max-w-[280px]">
                {/* Minimal Timer Display */}
                <div className="text-center space-y-4">
                  <div className="text-[48px] font-mono text-white tracking-wider animate-pulse">
                  <img 
                   src="/images/app-screen-1.png" 
                   alt="Chikane App Interface"
                  className="rounded-[2.5rem] w-full"
                  />
                  </div>
                  <div className="text-accent text-sm uppercase tracking-widest">
                   
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -right-20 top-12 z-40">
                <div className="glassmorphism p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="text-accent"/>
                    <div>
                      <p className="font-semibold">Precision Timing</p>
                      <p className="text-sm text-gray-600">±0.001s accuracy</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-20 top-32 z-40">
                <div className="glassmorphism p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <BarChart2 className="text-highlight"/>
                    <div>
                      <p className="font-semibold">Analytics</p>
                      <p className="text-sm text-gray-600">Real-time insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Screens */}
            <div className="absolute z-20 -left-16 top-20 transform -rotate-6">
              <div className="bg-[#0A1828] p-6 rounded-[2.5rem] opacity-80 max-w-[280px]">
                {/* Analytics Screen */}
                <div className="h-[500px] w-full flex items-center justify-center">
                <img 
                src="/images/app-screen-2.png" 
              alt="Chikane App Interface"
               className="rounded-[2.5rem] w-full"
                />
                </div>
              </div>
            </div>

            <div className="absolute z-10 -right-16 top-20 transform rotate-6">
              <div className="bg-[#0A1828] p-6 rounded-[2.5rem] opacity-80 max-w-[280px]">
                {/* Leaderboard Screen */}
                <div className="h-[500px] w-full flex items-center justify-center">
                <img 
  src="/images/app-screen-3.png" 
  alt="Chikane App Interface"
  className="rounded-[2.5rem] w-full"
/>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"/>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-highlight/10 rounded-full blur-xl"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;