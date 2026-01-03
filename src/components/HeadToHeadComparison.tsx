import React, { useState } from 'react';
import { User } from 'lucide-react';

// Dummy data for athletes
const dummyAthletes = {
  women: [
    {
      id: 1,
      name: 'Daida Ruano Moreno',
      country: 'Spain',
      countryCode: 'ESP',
      placement: 1,
      bestHeatScore: 31.0,
      avgHeatScore: 24.5,
      bestJumpScore: 10.0,
      avgJumpScore: 7.8,
      bestWaveScore: 7.0,
      avgWaveScore: 5.89,
      heatWins: 5
    },
    {
      id: 2,
      name: 'Sarah-Quita Offringa',
      country: 'Aruba',
      countryCode: 'ARU',
      placement: 2,
      bestHeatScore: 28.5,
      avgHeatScore: 22.3,
      bestJumpScore: 9.5,
      avgJumpScore: 7.2,
      bestWaveScore: 6.8,
      avgWaveScore: 5.5,
      heatWins: 4
    },
    {
      id: 3,
      name: 'Iballa Ruano Moreno',
      country: 'Spain',
      countryCode: 'ESP',
      placement: 3,
      bestHeatScore: 27.8,
      avgHeatScore: 21.5,
      bestJumpScore: 9.2,
      avgJumpScore: 6.9,
      bestWaveScore: 6.5,
      avgWaveScore: 5.2,
      heatWins: 3
    }
  ],
  men: [
    {
      id: 4,
      name: 'Ricardo Campello',
      country: 'Venezuela',
      countryCode: 'VEN',
      placement: 1,
      bestHeatScore: 33.5,
      avgHeatScore: 26.8,
      bestJumpScore: 11.5,
      avgJumpScore: 8.9,
      bestWaveScore: 8.2,
      avgWaveScore: 6.5,
      heatWins: 6
    },
    {
      id: 5,
      name: 'Philip Köster',
      country: 'Germany',
      countryCode: 'GER',
      placement: 2,
      bestHeatScore: 32.0,
      avgHeatScore: 25.5,
      bestJumpScore: 11.0,
      avgJumpScore: 8.5,
      bestWaveScore: 7.8,
      avgWaveScore: 6.2,
      heatWins: 5
    },
    {
      id: 6,
      name: 'Marcilio Browne',
      country: 'Brazil',
      countryCode: 'BRA',
      placement: 3,
      bestHeatScore: 30.5,
      avgHeatScore: 24.2,
      bestJumpScore: 10.5,
      avgJumpScore: 8.0,
      bestWaveScore: 7.5,
      avgWaveScore: 5.9,
      heatWins: 4
    }
  ]
};

const HeadToHeadComparison: React.FC = () => {
  const [gender, setGender] = useState<'men' | 'women'>('women');
  const [athlete1Id, setAthlete1Id] = useState<number | null>(null);
  const [athlete2Id, setAthlete2Id] = useState<number | null>(null);

  const athletes = dummyAthletes[gender];
  const athlete1 = athletes.find(a => a.id === athlete1Id);
  const athlete2 = athletes.find(a => a.id === athlete2Id);

  const getPlacementSuffix = (placement: number) => {
    if (placement === 1) return 'st';
    if (placement === 2) return 'nd';
    if (placement === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value as 'men' | 'women');
            setAthlete1Id(null);
            setAthlete2Id(null);
          }}
          aria-label="Filter by gender"
          className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>

        <select
          value={athlete1Id || ''}
          onChange={(e) => setAthlete1Id(e.target.value ? Number(e.target.value) : null)}
          aria-label="Select first athlete to compare"
          className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm min-w-[250px]"
        >
          <option value="">Select first athlete</option>
          {athletes.map((athlete) => (
            <option
              key={athlete.id}
              value={athlete.id}
              disabled={athlete.id === athlete2Id}
            >
              {athlete.name} ({athlete.countryCode})
            </option>
          ))}
        </select>

        <select
          value={athlete2Id || ''}
          onChange={(e) => setAthlete2Id(e.target.value ? Number(e.target.value) : null)}
          aria-label="Select second athlete to compare"
          className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm min-w-[250px]"
        >
          <option value="">Select second athlete</option>
          {athletes.map((athlete) => (
            <option
              key={athlete.id}
              value={athlete.id}
              disabled={athlete.id === athlete1Id}
            >
              {athlete.name} ({athlete.countryCode})
            </option>
          ))}
        </select>
      </div>

      {/* Comparison Container */}
      {!athlete1 || !athlete2 ? (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">
            Select two athletes to compare
          </p>
        </div>
      ) : (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
          {/* Avatar Row */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mb-3">
                <User className="text-gray-400" size={40} />
              </div>
              <p className="text-sm text-gray-400">Athlete 1</p>
            </div>
            <div></div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mb-3">
                <User className="text-gray-400" size={40} />
              </div>
              <p className="text-sm text-gray-400">Athlete 2</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="space-y-0">
            {/* Name Row */}
            <div className="grid grid-cols-3 gap-8 py-4 border-b border-slate-700/50">
              <div className="text-center">
                <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-bebas)' }}>
                  {athlete1.name}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Name</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-bebas)' }}>
                  {athlete2.name}
                </p>
              </div>
            </div>

            {/* Place Row */}
            <div className="grid grid-cols-3 gap-8 py-4 border-b border-slate-700/50">
              <div className="text-center">
                <div className="inline-block bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-4 py-1 rounded-md">
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-bebas)' }}>
                    {athlete1.placement}{getPlacementSuffix(athlete1.placement)}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Place</p>
              </div>
              <div className="text-center">
                <div className="inline-block bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-4 py-1 rounded-md">
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-bebas)' }}>
                    {athlete2.placement}{getPlacementSuffix(athlete2.placement)}
                  </span>
                </div>
              </div>
            </div>

            {/* Heat Scores Section */}
            <div className="border-b border-slate-700/50 py-4">
              <p className="text-sm text-gray-400 uppercase tracking-wide text-center mb-4">Heat Scores</p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.bestHeatScore > athlete2.bestHeatScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.bestHeatScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Best</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.bestHeatScore > athlete1.bestHeatScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.bestHeatScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-2">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.avgHeatScore > athlete2.avgHeatScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.avgHeatScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Average</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.avgHeatScore > athlete1.avgHeatScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.avgHeatScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Jumps Section */}
            <div className="border-b border-slate-700/50 py-4">
              <p className="text-sm text-gray-400 uppercase tracking-wide text-center mb-4">Jumps</p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.bestJumpScore > athlete2.bestJumpScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.bestJumpScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Best</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.bestJumpScore > athlete1.bestJumpScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.bestJumpScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-2">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.avgJumpScore > athlete2.avgJumpScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.avgJumpScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Average Counting</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.avgJumpScore > athlete1.avgJumpScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.avgJumpScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Waves Section */}
            <div className="border-b border-slate-700/50 py-4">
              <p className="text-sm text-gray-400 uppercase tracking-wide text-center mb-4">Waves</p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.bestWaveScore > athlete2.bestWaveScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.bestWaveScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Best</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.bestWaveScore > athlete1.bestWaveScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.bestWaveScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-2">
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete1.avgWaveScore > athlete2.avgWaveScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete1.avgWaveScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 h-8 flex items-center justify-center">Average Counting</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold h-8 flex items-center justify-center ${
                    athlete2.avgWaveScore > athlete1.avgWaveScore ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {athlete2.avgWaveScore} <span className="text-sm text-gray-400 ml-1">pts</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Heat Wins */}
            <div className="grid grid-cols-3 gap-8 py-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${
                  athlete1.heatWins > athlete2.heatWins ? 'text-cyan-400' : 'text-white'
                }`}>{athlete1.heatWins}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Heat Wins</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${
                  athlete2.heatWins > athlete1.heatWins ? 'text-cyan-400' : 'text-white'
                }`}>{athlete2.heatWins}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadToHeadComparison;
