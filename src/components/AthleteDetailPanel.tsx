import type { AthleteStatsData } from '../data/athleteStatsDummy';
import FeatureCard from './FeatureCard';
import EventStatsChart from './EventStatsChart';
import AthleteHeatScoresChart from './AthleteHeatScoresChart';

interface AthleteDetailPanelProps {
  data: AthleteStatsData;
}

const AthleteDetailPanel = ({ data }: AthleteDetailPanelProps) => {
  const { summaryStats, moveTypeScores, heatScores, jumpScores, waveScores } = data;

  // Transform move type scores for EventStatsChart
  const chartData = moveTypeScores.map(score => ({
    type: score.type,
    best: score.best,
    average: score.average,
    bestBy: {
      athlete: data.profile.name,
      heat: '', // We don't have this detail in dummy data
      score: score.best,
    },
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Position */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/60 transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Overall Position
          </h3>
          <p className="text-5xl font-bold text-white mb-2">
            {summaryStats.overallPosition === 1 ? '1st' :
             summaryStats.overallPosition === 2 ? '2nd' :
             summaryStats.overallPosition === 3 ? '3rd' :
             `${summaryStats.overallPosition}th`}
          </p>
        </div>

        {/* Best Heat Score */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/60 transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Best Heat Score
          </h3>
          <p className="text-5xl font-bold text-white mb-2">
            {summaryStats.bestHeatScore.score.toFixed(2)} <span className="text-2xl text-gray-400">pts</span>
          </p>
          <p className="text-xs text-gray-400">{summaryStats.bestHeatScore.heat}</p>
          {summaryStats.bestHeatScore.opponents && (
            <p className="text-xs text-gray-500 mt-1">{summaryStats.bestHeatScore.opponents}</p>
          )}
        </div>

        {/* Best Jump Score */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/60 transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Best Jump Score
          </h3>
          <p className="text-5xl font-bold text-white mb-2">
            {summaryStats.bestJumpScore.score.toFixed(2)} <span className="text-2xl text-gray-400">pts</span>
          </p>
          <p className="text-xs text-gray-400">{summaryStats.bestJumpScore.heat}</p>
          {summaryStats.bestJumpScore.opponents && (
            <p className="text-xs text-gray-500 mt-1">{summaryStats.bestJumpScore.opponents}</p>
          )}
          <p className="text-xs text-cyan-400 mt-1">{summaryStats.bestJumpScore.move}</p>
        </div>

        {/* Best Wave Score */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/60 transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Best Wave Score
          </h3>
          <p className="text-5xl font-bold text-white mb-2">
            {summaryStats.bestWaveScore.score.toFixed(2)} <span className="text-2xl text-gray-400">pts</span>
          </p>
          <p className="text-xs text-gray-400">{summaryStats.bestWaveScore.heat}</p>
          {summaryStats.bestWaveScore.opponents && (
            <p className="text-xs text-gray-500 mt-1">{summaryStats.bestWaveScore.opponents}</p>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best and Average Score by Type */}
        <FeatureCard title="Best and Average Counting Score by Type" isLoading={false}>
          <EventStatsChart data={chartData} />
        </FeatureCard>

        {/* Heat Scores */}
        <FeatureCard title="Heat Scores" isLoading={false}>
          <AthleteHeatScoresChart data={heatScores} />
        </FeatureCard>
      </div>

      {/* Score Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jump Scores Table */}
        <FeatureCard title="Jump Scores" isLoading={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Heat No
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Move
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Score
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Counting
                  </th>
                </tr>
              </thead>
              <tbody>
                {jumpScores.map((score, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-3 px-2 text-gray-300">{score.heatNo}</td>
                    <td className="py-3 px-2 text-gray-300">{score.move}</td>
                    <td className="py-3 px-2 text-right font-semibold text-white">
                      {score.score.toFixed(2)} pts
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          score.counting
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {score.counting ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FeatureCard>

        {/* Wave Scores Table */}
        <FeatureCard title="Wave Scores" isLoading={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Heat No
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Best Wave Score
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Counting
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Index
                  </th>
                </tr>
              </thead>
              <tbody>
                {waveScores.map((score, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-3 px-2 text-gray-300">{score.heatNo}</td>
                    <td className="py-3 px-2 text-right font-semibold text-white">
                      {score.score.toFixed(2)} pts
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          score.counting
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {score.counting ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-gray-400">
                      {score.index || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FeatureCard>
      </div>
    </div>
  );
};

export default AthleteDetailPanel;
