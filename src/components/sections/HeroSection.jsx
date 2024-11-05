import { ChevronRight, Timer, BarChart2, Flag } from 'lucide-react';

const HeroSection = () => {
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
              <button className="group flex items-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all">
                <span>Download Now</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
              </button>
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

          {/* Right Column - App Preview */}
          <div className="relative">
            <div className="animate-float">
              {/* Phone Mockup */}
              <div className="relative mx-auto max-w-sm">
                <div className="relative z-10 rounded-[3rem] p-2 bg-primary-dark shadow-2xl">
                  <img 
                    src="/app-screen-1.png" 
                    alt="Chikane App Interface"
                    className="rounded-[2.5rem] w-full"
                  />
                </div>
                
                {/* Feature Highlights */}
                <div className="absolute -right-16 top-20 glassmorphism p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="text-accent"/>
                    <div>
                      <p className="font-semibold">Precision Timing</p>
                      <p className="text-sm text-gray-600">±0.001s accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-16 bottom-20 glassmorphism p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <BarChart2 className="text-highlight"/>
                    <div>
                      <p className="font-semibold">Real-time Analytics</p>
                      <p className="text-sm text-gray-600">Deep insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;