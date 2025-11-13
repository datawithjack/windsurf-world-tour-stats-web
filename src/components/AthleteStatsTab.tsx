import { dummyAthleteStats } from '../data/athleteStatsDummy';
import AthleteDetailPanel from './AthleteDetailPanel';
import { User, Trophy } from 'lucide-react';

interface AthleteStatsTabProps {
  selectedAthleteId: number;
}

const AthleteStatsTab = ({ selectedAthleteId }: AthleteStatsTabProps) => {
  const selectedData = dummyAthleteStats[selectedAthleteId];

  return (
    <div className="space-y-6">
      {/* Athlete Profile Card */}
      {selectedData && (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 relative">
          <div className="flex items-start gap-6">
            {/* Profile Photo Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/50">
                <User className="text-gray-500" size={40} />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white mb-1">{selectedData.profile.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{selectedData.profile.country}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Sponsors:</span>
                  <p className="text-sm text-gray-300">{selectedData.profile.sponsors || 'N/A'}</p>
                </div>
                {selectedData.profile.sailNumber && (
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Sail No:</span>
                    <p className="text-sm text-gray-300">{selectedData.profile.sailNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Overall Position Stat Box - Top Right */}
            <div className="absolute top-6 right-6 text-right">
              <div className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 backdrop-blur-sm border border-teal-500/50 rounded-lg px-6 py-4 min-w-[120px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {selectedData.summaryStats.overallPosition <= 3 && (
                    <Trophy
                      className={`${
                        selectedData.summaryStats.overallPosition === 1 ? 'text-yellow-400' :
                        selectedData.summaryStats.overallPosition === 2 ? 'text-gray-300' :
                        'text-orange-400'
                      }`}
                      size={20}
                    />
                  )}
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Position</span>
                </div>
                <p className="text-4xl font-bold text-white">
                  {selectedData.summaryStats.overallPosition === 1 ? '1st' :
                   selectedData.summaryStats.overallPosition === 2 ? '2nd' :
                   selectedData.summaryStats.overallPosition === 3 ? '3rd' :
                   `${selectedData.summaryStats.overallPosition}th`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Athlete Stats Detail */}
      {selectedData ? (
        <AthleteDetailPanel data={selectedData} />
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Data Available</h3>
            <p className="text-gray-500">
              Statistics for this athlete are not available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthleteStatsTab;
