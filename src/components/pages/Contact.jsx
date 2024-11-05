import { Mail, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 text-accent">
                <Mail className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:ty@chikaneapp.com" className="text-gray-600 hover:text-accent">
                    contact@chikaneapp.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 text-accent">
                <MessageSquare className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Support</h3>
                  <a href="mailto:ty@chikaneapp.com" className="text-gray-600 hover:text-accent">
                    support@chikaneapp.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday</p>
              <p className="text-gray-600">9:00 AM - 5:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;