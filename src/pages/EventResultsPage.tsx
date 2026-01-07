import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import FeatureCard from '../components/FeatureCard';
import ResultsTable from '../components/ResultsTable';
import StatsSummaryCards from '../components/StatsSummaryCards';
import EventStatsChart from '../components/EventStatsChart';
import AthleteStatsTab from '../components/AthleteStatsTab';
import HeadToHeadComparison from '../components/HeadToHeadComparison';
import TableRowTooltip from '../components/TableRowTooltip';

const EventResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'results' | 'event-stats' | 'athlete-stats' | 'head-to-head'>('results');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('women');
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null);
  const [defaultSet, setDefaultSet] = useState(false);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => apiService.getEvent(Number(id)),
    enabled: !!id,
    retry: 1,
  });

  // Debug logging for event IDs
  console.log('🆔 EventResultsPage - URL param id:', id);
  console.log('📋 EventResultsPage - Event object:', event);
  console.log('🔑 EventResultsPage - event.id:', event?.id);
  console.log('🎯 EventResultsPage - event.event_id:', event?.event_id);

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
  const { data: athleteListData, isLoading: athleteListLoading } = useQuery({
    queryKey: ['eventAthletes', event?.event_id, genderFilter],
    queryFn: () => apiService.getEventAthletes(
      event!.event_id,
      genderFilter === 'men' ? 'Men' : 'Women'
    ),
    enabled: !!event?.event_id && genderFilter !== 'all' && activeTab === 'athlete-stats',
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
      bestHeatScore: statsData.summary_stats?.best_heat_score || null,
      bestJumpScore: statsData.summary_stats?.best_jump_score || null,
      bestWaveScore: statsData.summary_stats?.best_wave_score || null,
    },
    chartData: statsData.move_type_stats?.map(stat => ({
      type: stat.move_type,
      best: stat.best_score,
      average: stat.average_score,
      fleetAverage: stat.fleet_average,
      bestBy: stat.best_scored_by ? {
        athlete: stat.best_scored_by.athlete_name,
        heat: stat.best_scored_by.heat_number.toString(),
        score: stat.best_scored_by.score,
      } : null,
    })) || [],
    topHeatScores: statsData.top_heat_scores?.slice(0, 10).map((score: any) => ({
      rider: score.athlete_name,
      score: score.score,
      heatNo: score.heat_number.toString(),
    })) || [],
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
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
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
            <button
              onClick={() => setActiveTab('head-to-head')}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
                activeTab === 'head-to-head'
                  ? 'text-white border-b-2 border-cyan-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Head to Head
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as 'all' | 'men' | 'women')}
              aria-label="Filter by gender"
              className="bg-slate-800/60 border border-slate-700/50 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>

            {/* Athlete Filter - only show on Athlete Stats tab */}
            {activeTab === 'athlete-stats' && (
              <select
                value={selectedAthleteId || ''}
                onChange={(e) => setSelectedAthleteId(Number(e.target.value))}
                aria-label="Select athlete"
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
            )}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'results' ? (
            <div className="max-w-4xl">
              {/* Final Rankings Card */}
              <FeatureCard title="Final Rankings" isLoading={resultsLoading}>
                <ResultsTable
                  results={resultsData?.results || []}
                  isLoading={resultsLoading}
                />
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

                  {/* Bar Chart and Top Heat Scores side-by-side on desktop */}
                  {transformedStatsData.chartData.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Bar Chart */}
                      <FeatureCard title="Best and Average Counting Score by Type" isLoading={false}>
                        <EventStatsChart data={transformedStatsData.chartData} />
                      </FeatureCard>

                      {/* Top Heat Scores - Note: Empty until backend provides data */}
                      <FeatureCard title="Top Heat Scores (Top 10)" isLoading={false}>
                        {transformedStatsData.topHeatScores.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-slate-700/50">
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rider</th>
                                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Score</th>
                                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Heat No</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transformedStatsData.topHeatScores.slice(0, 10).map((entry: any, index: number) => (
                                  <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200">
                                    <td className="py-3 px-4 text-sm text-gray-400 font-semibold">{index + 1}</td>
                                    <td className="py-3 px-4 text-sm text-white">{entry.rider}</td>
                                    <td className="py-3 px-4 text-sm text-right text-white font-semibold">{entry.score.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm text-right text-gray-400">{entry.heatNo}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center py-12">
                            <p className="text-sm text-gray-500">Heat scores data not available from API</p>
                          </div>
                        )}
                      </FeatureCard>
                    </div>
                  )}

                  {/* Top Jump and Wave Scores - only render if data exists */}
                  {(transformedStatsData.topJumpScores.length > 0 ||
                    transformedStatsData.topWaveScores.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Top Jump Scores */}
                      {transformedStatsData.topJumpScores.length > 0 && (
                        <FeatureCard title="Top Jump Scores (Top 10)" isLoading={false}>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-slate-700/50">
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rider</th>
                                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Score</th>
                                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Move</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transformedStatsData.topJumpScores.slice(0, 10).map((entry, index) => (
                                  <TableRowTooltip
                                    key={index}
                                    content={`Heat ${entry.heatNo}`}
                                    className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 cursor-help"
                                  >
                                    <td className="py-3 px-4 text-sm text-gray-400 font-semibold">{index + 1}</td>
                                    <td className="py-3 px-4 text-sm text-white">{entry.rider}</td>
                                    <td className="py-3 px-4 text-sm text-right text-white font-semibold">{entry.score.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm text-right text-gray-400">{entry.move}</td>
                                  </TableRowTooltip>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </FeatureCard>
                      )}

                      {/* Top Wave Scores */}
                      {transformedStatsData.topWaveScores.length > 0 && (
                        <FeatureCard title="Top Wave Scores (Top 10)" isLoading={false}>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-slate-700/50">
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rider</th>
                                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Score</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transformedStatsData.topWaveScores.slice(0, 10).map((entry, index) => (
                                  <TableRowTooltip
                                    key={index}
                                    content={`Heat ${entry.heatNo}`}
                                    className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 cursor-help"
                                  >
                                    <td className="py-3 px-4 text-sm text-gray-400 font-semibold">{index + 1}</td>
                                    <td className="py-3 px-4 text-sm text-white">{entry.rider}</td>
                                    <td className="py-3 px-4 text-sm text-right text-white font-semibold">{entry.score.toFixed(2)}</td>
                                  </TableRowTooltip>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </FeatureCard>
                      )}
                    </div>
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
          ) : activeTab === 'athlete-stats' ? (
            <AthleteStatsTab
              eventId={event?.event_id || 0}
              selectedAthleteId={selectedAthleteId}
              sex={genderFilter === 'men' ? 'Men' : 'Women'}
            />
          ) : (
            <HeadToHeadComparison
              eventId={event?.event_id || 0}
              gender={genderFilter === 'men' ? 'Men' : 'Women'}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default EventResultsPage;
