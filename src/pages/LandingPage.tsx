import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import FeatureCard from '../components/FeatureCard';
import { TrendingUp, User, Calendar, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { data: quickStats, isLoading: statsLoading } = useQuery({
    queryKey: ['quickStats'],
    queryFn: apiService.getQuickStats,
    retry: 1,
  });

  const { data: featuredRider, isLoading: riderLoading } = useQuery({
    queryKey: ['featuredRider'],
    queryFn: apiService.getFeaturedRider,
    retry: 1,
  });

  const { data: recentEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['recentEvents'],
    queryFn: apiService.getRecentEvents,
    retry: 1,
  });

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
            <FeatureCard title="QUICK STATS" isLoading={statsLoading}>
              {quickStats ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-cyan-400" size={20} />
                      <span className="text-gray-300">Total Events</span>
                    </div>
                    <span className="text-2xl font-bold">{quickStats.totalEvents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="text-cyan-400" size={20} />
                      <span className="text-gray-300">Total Riders</span>
                    </div>
                    <span className="text-2xl font-bold">{quickStats.totalRiders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-cyan-400" size={20} />
                      <span className="text-gray-300">Total Heats</span>
                    </div>
                    <span className="text-2xl font-bold">{quickStats.totalHeats}</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  No stats available
                </div>
              )}
            </FeatureCard>

            {/* Featured Rider Card */}
            <FeatureCard title="FEATURED RIDER" isLoading={riderLoading}>
              {featuredRider ? (
                <div className="space-y-4">
                  <div className="text-center">
                    {featuredRider.profileImage && (
                      <img
                        src={featuredRider.profileImage}
                        alt={featuredRider.name}
                        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-cyan-400"
                      />
                    )}
                    <h4 className="text-2xl font-bold">{featuredRider.name}</h4>
                    <p className="text-gray-400">{featuredRider.country}</p>
                    {featuredRider.rank && (
                      <p className="text-cyan-400 font-semibold">Rank #{featuredRider.rank}</p>
                    )}
                  </div>
                  {featuredRider.stats && (
                    <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-700">
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">{featuredRider.stats.wins}</div>
                        <div className="text-xs text-gray-400">Wins</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">{featuredRider.stats.podiums}</div>
                        <div className="text-xs text-gray-400">Podiums</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">{featuredRider.stats.events}</div>
                        <div className="text-xs text-gray-400">Events</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  No featured rider
                </div>
              )}
            </FeatureCard>

            {/* Just Added Card */}
            <FeatureCard title="JUST ADDED" isLoading={eventsLoading}>
              {recentEvents && recentEvents.length > 0 ? (
                <div className="space-y-3">
                  {recentEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-slate-900/50 rounded border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                    >
                      <h5 className="font-semibold text-white">{event.name}</h5>
                      <p className="text-sm text-gray-400">{event.location}</p>
                      <p className="text-xs text-cyan-400 mt-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  No recent events
                </div>
              )}
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
