const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-primary-dark mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-600">
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Information We Collect</h2>
              <p className="mb-4">The Chikane app collects the following information to provide our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>GPS location data during track sessions</li>
                <li>Device information for app functionality</li>
                <li>User profile information you provide</li>
                <li>Lap times and performance data</li>
              </ul>
            </section>
  
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate lap timing services</li>
                <li>Generate performance analytics</li>
                <li>Maintain leaderboards and event records</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>
  
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Data Security</h2>
              <p>We implement industry-standard security measures to protect your data. Your information is stored securely and is only accessed for the purposes outlined in this policy.</p>
            </section>
  
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt out of data collection</li>
                <li>Update your information</li>
              </ul>
            </section>
  
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <a href="mailto:ty@chikaneapp.com" className="text-accent hover:underline">
                ty@chikaneapp.com
              </a>
            </section>
  
            <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Updates to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              <p className="mt-4">Last updated: {new Date().toLocaleDateString()}</p>
            </section>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;