import { useState } from 'react';
import { dummyAthletes, dummyAthleteStats } from '../data/athleteStatsDummy';
import AthleteDetailPanel from './AthleteDetailPanel';
import { Info } from 'lucide-react';

const AthleteStatsTab = () => {
  const [selectedAthleteId, setSelectedAthleteId] = useState<number>(1);

  const selectedData = dummyAthleteStats[selectedAthleteId];

  return (
    <div className="space-y-6">
      {/* Info Notice */}
      <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Using Placeholder Data</h3>
            <p className="text-xs text-gray-300">
              This page is currently displaying dummy data from a template. Real athlete statistics will be
              displayed once API endpoints are implemented.
            </p>
          </div>
        </div>
      </div>

      {/* Athlete Selector and Profile */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Athlete Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Select Athlete:</label>
            <select
              value={selectedAthleteId}
              onChange={(e) => setSelectedAthleteId(Number(e.target.value))}
              className="w-full bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            >
              {dummyAthletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.name} ({athlete.country})
                </option>
              ))}
            </select>
          </div>

          {/* Athlete Profile Info */}
          {selectedData && (
            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-slate-700/50 pt-4 sm:pt-0 sm:pl-6">
              <div className="space-y-2">
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
          )}
        </div>
      </div>

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
