import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-none">
              WINDSURF WORLD TOUR STATS
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8">
              Track every heat, jump, and wave from qualification to finals from the challengers to the champions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Browse Events
                <ArrowRight size={18} />
              </Link>
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-cyan-500/50 text-cyan-400/70 font-semibold rounded-md cursor-not-allowed"
              >
                Coming Soon: Athletes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats Card */}
            <FeatureCard title="Quick Stats" isLoading={false}>
              <div className="text-gray-400 text-center py-8">
                Coming Soon
              </div>
            </FeatureCard>

            {/* Featured Rider Card */}
            <FeatureCard title="Featured Rider" isLoading={false}>
              <div className="text-gray-400 text-center py-8">
                Coming Soon
              </div>
            </FeatureCard>

            {/* Just Added Card */}
            <FeatureCard title="Just Added" isLoading={false}>
              <div className="text-gray-400 text-center py-8">
                Coming Soon
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
