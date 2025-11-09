import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import FeatureCard from '../components/FeatureCard';
import ResultsTable from '../components/ResultsTable';
import StatsSummaryCards from '../components/StatsSummaryCards';
import EventStatsChart from '../components/EventStatsChart';
import TopScoresTable from '../components/TopScoresTable';

const EventResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'results' | 'event-stats' | 'athlete-stats'>('results');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('women');
  const [defaultSet, setDefaultSet] = useState(false);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => apiService.getEvent(Number(id)),
    enabled: !!id,
    retry: 1,
  });

  // Fetch athlete results with gender filter
  const { data: resultsData, isLoading: resultsLoading } = useQuery({
    queryKey: ['athleteResults', event?.event_id, genderFilter],
    queryFn: () => apiService.getAthleteResults({
      event_id: event?.event_id,
      sex: genderFilter === 'all' ? undefined : genderFilter === 'men' ? 'Men' : 'Women',
      page_size: 100,
    }),
    enabled: !!event?.event_id,
    retry: 1,
  });

  // Set default gender filter based on available results (only on first load)
  useEffect(() => {
    if (!defaultSet && resultsData?.results !== undefined && event?.event_id) {
      // If no results for women, check if men's results exist
      if (resultsData.results.length === 0 && genderFilter === 'women') {
        // Try to fetch men's results to see if we should switch default
        setGenderFilter('men');
      }
      setDefaultSet(true);
    }
  }, [resultsData, event?.event_id, defaultSet, genderFilter]);

  // Dummy data for Event Stats (from screenshot)
  const dummyStatsData = {
    summaryCards: {
      bestHeatScore: {
        score: 24.50,
        athlete: 'Degrieck',
        heat: 'Heat 21a',
      },
      bestJumpScore: {
        score: 7.10,
        athlete: 'Ruano Moreno',
        heat: 'Heat 19a',
        move: 'Forward Loop',
      },
      bestWaveScore: {
        score: 7.50,
        athlete: 'Degrieck',
        heat: 'Heat 21a',
      },
    },
    chartData: [
      {
        type: 'Wave',
        best: 7.50,
        average: 2.95,
        bestBy: { athlete: 'Degrieck', heat: '21a', score: 7.50 },
      },
      {
        type: 'Forward Loop',
        best: 7.10,
        average: 2.82,
        bestBy: { athlete: 'Ruano Moreno', heat: '19a', score: 7.10 },
      },
      {
        type: 'Backloop',
        best: 6.95,
        average: 4.82,
        bestBy: { athlete: 'Offringa', heat: '49a', score: 6.95 },
      },
      {
        type: 'Pushloop',
        best: 6.88,
        average: 4.29,
        bestBy: { athlete: 'Ruano Moreno', heat: '23a', score: 6.88 },
      },
      {
        type: 'Tabletop',
        best: 2.12,
        average: 1.08,
        bestBy: { athlete: 'Snady', heat: '45a', score: 2.12 },
      },
    ],
    topHeatScores: [
      { rider: 'Degrieck', score: 24.5, heatNo: '21a' },
      { rider: 'Offringa', score: 23.95, heatNo: '49a' },
      { rider: 'Offringa', score: 23.63, heatNo: '20a' },
      { rider: 'Ruano Moreno', score: 23.58, heatNo: '23a' },
      { rider: 'Offringa', score: 21.69, heatNo: '48a' },
    ],
    topJumpScores: [
      { rider: 'Ruano Moreno', score: 7.10, move: 'Forward Loop', heatNo: '19a' },
      { rider: 'Offringa', score: 6.95, move: 'Backloop', heatNo: '49a' },
      { rider: 'Offringa', score: 6.88, move: 'Backloop', heatNo: '20a' },
      { rider: 'Offringa', score: 6.88, move: 'Backloop', heatNo: '23a' },
      { rider: 'Ruano Moreno', score: 6.75, move: 'Backloop', heatNo: '19a' },
    ],
    topWaveScores: [
      { rider: 'Degrieck', score: 7.50, heatNo: '21a' },
      { rider: 'Ruano Moreno', score: 6.75, heatNo: '23a' },
      { rider: 'Offringa', score: 6.12, heatNo: '20a' },
      { rider: 'Offringa', score: 6.12, heatNo: '49a' },
      { rider: 'Ruano Moreno', score: 6.00, heatNo: '22a' },
    ],
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Back Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Back to Events</span>
          </Link>
        </div>
      </section>

      {/* Page Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-12 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Event</h3>
              <p className="text-gray-300">Unable to fetch event details. Please try again.</p>
            </div>
          ) : event ? (
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight leading-none uppercase">
                {event.event_name}
              </h1>
              <div className="flex items-center gap-3 text-sm md:text-base text-gray-400">
                <span>{event.country_flag}</span>
                <span>•</span>
                <span>{event.event_date}</span>
                {event.stars && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-yellow-400 font-semibold">{event.stars}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('results')}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
                activeTab === 'results'
                  ? 'text-white border-b-2 border-cyan-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setActiveTab('event-stats')}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
                activeTab === 'event-stats'
                  ? 'text-white border-b-2 border-cyan-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Event Stats
            </button>
            <button
              onClick={() => setActiveTab('athlete-stats')}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
                activeTab === 'athlete-stats'
                  ? 'text-white border-b-2 border-cyan-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Athlete Stats
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-400">Filter by:</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as 'all' | 'men' | 'women')}
              className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'results' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Final Rankings Card */}
              <FeatureCard title="Final Rankings" isLoading={resultsLoading}>
                <ResultsTable
                  results={resultsData?.results || []}
                  isLoading={resultsLoading}
                />
              </FeatureCard>

              {/* Elimination Ladder Card */}
              <FeatureCard title="Elimination Ladder" isLoading={false}>
                <div className="text-gray-400 text-center py-12">
                  <p className="text-lg mb-2">TBC</p>
                  <p className="text-sm text-gray-500">Elimination bracket will be displayed here</p>
                </div>
              </FeatureCard>
            </div>
          ) : activeTab === 'event-stats' ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <StatsSummaryCards
                bestHeatScore={dummyStatsData.summaryCards.bestHeatScore}
                bestJumpScore={dummyStatsData.summaryCards.bestJumpScore}
                bestWaveScore={dummyStatsData.summaryCards.bestWaveScore}
              />

              {/* Bar Chart */}
              <FeatureCard title="Best and Average Counting Score by Type" isLoading={false}>
                <EventStatsChart data={dummyStatsData.chartData} />
              </FeatureCard>

              {/* Top Scores Tables */}
              <TopScoresTable
                topHeatScores={dummyStatsData.topHeatScores}
                topJumpScores={dummyStatsData.topJumpScores}
                topWaveScores={dummyStatsData.topWaveScores}
                isLoading={false}
              />
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Coming Soon</h3>
                <p className="text-gray-500">
                  Athlete statistics will be available here
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventResultsPage;
