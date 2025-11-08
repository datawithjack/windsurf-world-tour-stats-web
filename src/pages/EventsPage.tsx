import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Calendar, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const { data: eventsData, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => apiService.getEvents(1, 50, true),
    retry: 1,
  });

  // Sort events by start_date descending (latest first)
  const events = eventsData?.events.sort((a, b) =>
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  const getStatusBadge = (event_section: string) => {
    switch (event_section) {
      case 'Upcoming events':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/50';
      case 'Completed events':
        return 'bg-green-500/20 text-green-400 border border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-none">
              EVENTS
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              Browse all windsurf wave competition events from around the world
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 animate-pulse"
                >
                  <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Events</h3>
                <p className="text-gray-300">
                  Unable to fetch events from the API. Please check your connection and try again.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Make sure your FastAPI backend is running and the API URL is configured correctly.
                </p>
              </div>
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden hover:bg-slate-800/60 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                >
                  {event.event_image_url && (
                    <div className="relative">
                      <img
                        src={event.event_image_url}
                        alt={event.event_name}
                        className="w-full h-48 object-cover"
                      />
                      {event.stars && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                          <Star className="text-yellow-400 fill-yellow-400" size={14} />
                          <span className="text-xs text-white font-semibold">{event.stars}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-sm md:text-base font-extrabold text-white line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                        {event.event_name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold uppercase whitespace-nowrap ${getStatusBadge(
                          event.event_section
                        )}`}
                      >
                        {event.event_section.replace(' events', '')}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-cyan-400 flex-shrink-0" size={16} />
                        <span className="text-sm">{event.country_flag}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-cyan-400 flex-shrink-0" size={16} />
                        <span className="text-sm">{event.event_date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12 max-w-md mx-auto">
                <Calendar className="text-gray-600 mx-auto mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Events Found</h3>
                <p className="text-gray-500">
                  There are no events available at the moment. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
