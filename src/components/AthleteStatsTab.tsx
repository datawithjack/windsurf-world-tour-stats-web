import AthleteDetailPanel from './AthleteDetailPanel';
import { User, Trophy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

interface AthleteStatsTabProps {
  eventId: number;
  selectedAthleteId: number | null;
  sex: 'Men' | 'Women';
}

const AthleteStatsTab = ({ eventId, selectedAthleteId, sex }: AthleteStatsTabProps) => {
  // Fetch athlete stats from API
  const { data: athleteStats, isLoading, error } = useQuery({
    queryKey: ['athleteEventStats', eventId, selectedAthleteId, sex],
    queryFn: async () => {
      console.log('🔍 Fetching athlete stats:', { eventId, selectedAthleteId, sex });
      const data = await apiService.getAthleteEventStats(eventId, selectedAthleteId!, sex);
      console.log('📊 Athlete stats response:', data);
      console.log('📈 Summary stats:', data?.summary_stats);
      return data;
    },
    enabled: !!eventId && !!selectedAthleteId,
    retry: 1,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-slate-700 rounded w-full"></div>
          <div className="h-64 bg-slate-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-12">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Stats</h3>
          <p className="text-gray-300">Unable to fetch athlete statistics. Please try again.</p>
        </div>
      </div>
    );
  }

  // No athlete selected
  if (!selectedAthleteId || !athleteStats) {
    return (
      <div className="text-center py-12">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12">
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Athlete Selected</h3>
          <p className="text-gray-500">
            Please select an athlete from the dropdown above to view their statistics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Athlete Profile Card */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 relative">
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            {athleteStats.profile.profile_image ? (
              <img
                src={athleteStats.profile.profile_image}
                alt={athleteStats.profile.name}
                className="w-24 h-24 rounded-lg object-cover border border-slate-600/50"
              />
            ) : (
              <div className="w-24 h-24 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/50">
                <User className="text-gray-500" size={40} />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white mb-1">{athleteStats.profile.name}</h2>
            <p className="text-sm text-gray-300 mb-4">{athleteStats.profile.country}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {athleteStats.profile.sponsors && (
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Sponsors:</span>
                  <p className="text-sm text-gray-300">{athleteStats.profile.sponsors}</p>
                </div>
              )}
              {athleteStats.profile.sail_number && (
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Sail No:</span>
                  <p className="text-sm text-gray-300">{athleteStats.profile.sail_number}</p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Position Stat Box - Top Right */}
          <div className="absolute top-6 right-6 text-right">
            <div className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 backdrop-blur-sm border border-teal-500/50 rounded-lg px-6 py-4 min-w-[120px]">
              <div className="flex items-center justify-center gap-2 mb-1">
                {athleteStats.summary_stats.overall_position <= 3 && (
                  <Trophy
                    className={`${
                      athleteStats.summary_stats.overall_position === 1 ? 'text-yellow-400' :
                      athleteStats.summary_stats.overall_position === 2 ? 'text-gray-300' :
                      'text-orange-400'
                    }`}
                    size={20}
                  />
                )}
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Position</span>
              </div>
              <p className="text-4xl font-bold text-white">
                {athleteStats.summary_stats.overall_position === 1 ? '1st' :
                 athleteStats.summary_stats.overall_position === 2 ? '2nd' :
                 athleteStats.summary_stats.overall_position === 3 ? '3rd' :
                 `${athleteStats.summary_stats.overall_position}th`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Athlete Stats Detail */}
      <AthleteDetailPanel data={athleteStats} />
    </div>
  );
};

export default AthleteStatsTab;
