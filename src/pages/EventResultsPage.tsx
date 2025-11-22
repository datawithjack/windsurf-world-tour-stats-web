import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import FeatureCard from '../components/FeatureCard';
import ResultsTable from '../components/ResultsTable';
import StatsSummaryCards from '../components/StatsSummaryCards';
import EventStatsChart from '../components/EventStatsChart';
import TopScoresTable from '../components/TopScoresTable';
import AthleteStatsTab from '../components/AthleteStatsTab';

const EventResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'results' | 'event-stats' | 'athlete-stats'>('results');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('women');
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null);
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

  // Fetch event stats with gender filter
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['eventStats', id, genderFilter],
    queryFn: () => apiService.getEventStats(
      Number(id),
      genderFilter === 'men' ? 'Men' : 'Women'
    ),
    enabled: !!id && genderFilter !== 'all',
    retry: 1,
  });

  // Fetch athlete list for event
  const { data: athleteListData, isLoading: athleteListLoading, error: athleteListError } = useQuery({
    queryKey: ['eventAthletes', event?.id, genderFilter],
    queryFn: () => apiService.getEventAthletes(
      event!.id,
      genderFilter === 'men' ? 'Men' : 'Women'
    ),
    enabled: !!event?.id && genderFilter !== 'all' && activeTab === 'athlete-stats',
    retry: 1,
  });

  // Set default gender filter and selected athlete based on available results
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

  // Reset selected athlete when gender filter or tab changes
  useEffect(() => {
    setSelectedAthleteId(null);
  }, [genderFilter, activeTab]);

  // Set default selected athlete when athlete list loads
  useEffect(() => {
    if (athleteListData?.athletes && athleteListData.athletes.length > 0 && selectedAthleteId === null) {
      // Default to first athlete (winner)
      setSelectedAthleteId(athleteListData.athletes[0].athlete_id);
    }
  }, [athleteListData, selectedAthleteId]);

  // Transform API response to component props format
  const transformedStatsData = statsData ? {
    summaryCards: {
      bestHeatScore: statsData.summary_stats?.best_heat_score ? {
        score: statsData.summary_stats.best_heat_score.score,
        athlete: statsData.summary_stats.best_heat_score.athlete_name,
        heat: `Heat ${statsData.summary_stats.best_heat_score.heat_number}`,
      } : null,
      bestJumpScore: statsData.summary_stats?.best_jump_score ? {
        score: statsData.summary_stats.best_jump_score.score,
        athlete: statsData.summary_stats.best_jump_score.athlete_name,
        heat: `Heat ${statsData.summary_stats.best_jump_score.heat_number}`,
        move: statsData.summary_stats.best_jump_score.move_type || 'Unknown',
      } : null,
      bestWaveScore: statsData.summary_stats?.best_wave_score ? {
        score: statsData.summary_stats.best_wave_score.score,
        athlete: statsData.summary_stats.best_wave_score.athlete_name,
        heat: `Heat ${statsData.summary_stats.best_wave_score.heat_number}`,
      } : null,
    },
    chartData: statsData.move_type_stats?.map(stat => ({
      type: stat.move_type,
      best: stat.best_score,
      average: stat.average_score,
      bestBy: stat.best_by ? {
        athlete: stat.best_by.athlete_name,
        heat: stat.best_by.heat_number.toString(),
        score: stat.best_by.score,
      } : { athlete: '', heat: '', score: 0 },
    })) || [],
    topHeatScores: [], // Not available in API yet
    topJumpScores: statsData.top_jump_scores?.slice(0, 10).map(score => ({
      rider: score.athlete_name,
      score: score.score,
      move: score.move_type || 'Unknown',
      heatNo: score.heat_number.toString(),
    })) || [],
    topWaveScores: statsData.top_wave_scores?.slice(0, 10).map(score => ({
      rider: score.athlete_name,
      score: score.score,
      heatNo: score.heat_number.toString(),
    })) || [],
  } : null;

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
                      <span className="font-semibold">{event.stars}</span>
                    </div>
                  </>
                )}
                {(event.total_men || event.total_women) && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-3">
                      {event.total_men !== null && event.total_men > 0 && (
                        <div className="flex items-center gap-1">
                          <User className="text-blue-400" size={16} />
                          <span className="font-semibold">{event.total_men}</span>
                        </div>
                      )}
                      {event.total_women !== null && event.total_women > 0 && (
                        <div className="flex items-center gap-1">
                          <User className="text-pink-400" size={16} />
                          <span className="font-semibold">{event.total_women}</span>
                        </div>
                      )}
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
          <div className="flex items-center gap-4 flex-wrap">
            <label className="text-sm font-medium text-gray-400">Filter by:</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as 'all' | 'men' | 'women')}
              className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>

            {/* Athlete Filter - only show on Athlete Stats tab */}
            {activeTab === 'athlete-stats' && (
              <>
                <span className="text-gray-600">|</span>
                <label className="text-sm font-medium text-gray-400">Athlete:</label>
                <select
                  value={selectedAthleteId || ''}
                  onChange={(e) => setSelectedAthleteId(Number(e.target.value))}
                  className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
                  disabled={athleteListLoading || !athleteListData?.athletes.length}
                >
                  {athleteListLoading ? (
                    <option>Loading athletes...</option>
                  ) : athleteListData?.athletes && athleteListData.athletes.length > 0 ? (
                    athleteListData.athletes.map((athlete) => (
                      <option key={athlete.athlete_id} value={athlete.athlete_id}>
                        {athlete.overall_position}. {athlete.name} ({athlete.country_code})
                      </option>
                    ))
                  ) : (
                    <option>No athletes found</option>
                  )}
                </select>
              </>
            )}
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
              {statsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-slate-700 rounded w-full"></div>
                    <div className="h-64 bg-slate-700 rounded w-full"></div>
                  </div>
                </div>
              ) : transformedStatsData ? (
                <>
                  {/* Summary Cards - only render if at least one card has data */}
                  {(transformedStatsData.summaryCards.bestHeatScore ||
                    transformedStatsData.summaryCards.bestJumpScore ||
                    transformedStatsData.summaryCards.bestWaveScore) && (
                    <StatsSummaryCards
                      bestHeatScore={transformedStatsData.summaryCards.bestHeatScore}
                      bestJumpScore={transformedStatsData.summaryCards.bestJumpScore}
                      bestWaveScore={transformedStatsData.summaryCards.bestWaveScore}
                    />
                  )}

                  {/* Bar Chart - only render if data exists */}
                  {transformedStatsData.chartData.length > 0 && (
                    <FeatureCard title="Best and Average Counting Score by Type" isLoading={false}>
                      <EventStatsChart data={transformedStatsData.chartData} />
                    </FeatureCard>
                  )}

                  {/* Top Scores Tables - only render if at least one table has data */}
                  {(transformedStatsData.topHeatScores.length > 0 ||
                    transformedStatsData.topJumpScores.length > 0 ||
                    transformedStatsData.topWaveScores.length > 0) && (
                    <TopScoresTable
                      topHeatScores={transformedStatsData.topHeatScores}
                      topJumpScores={transformedStatsData.topJumpScores}
                      topWaveScores={transformedStatsData.topWaveScores}
                      isLoading={false}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-12">
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Stats Available</h3>
                    <p className="text-gray-500">
                      Event statistics are not available for this event.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AthleteStatsTab
              eventId={event?.id || 0}
              selectedAthleteId={selectedAthleteId}
              sex={genderFilter === 'men' ? 'Men' : 'Women'}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default EventResultsPage;
