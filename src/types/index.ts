export interface Rider {
  id: number;
  name: string;
  country: string;
  rank?: number;
  profileImage?: string;
  stats?: {
    events: number;
    wins: number;
    podiums: number;
  };
}

export interface Event {
  id: number;
  source: string;
  year: number;
  event_id: number;
  event_name: string;
  event_url: string;
  event_date: string;
  start_date: string;
  end_date: string;
  day_window: number;
  event_section: string;
  event_status: number;
  competition_state: number;
  has_wave_discipline: boolean;
  all_disciplines: string;
  country_flag: string;
  country_code: string;
  stars: number | null;
  event_image_url: string;
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

export interface EventsResponse {
  events: Event[];
  pagination: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface Heat {
  id: number;
  eventId: number;
  round: string;
  heatNumber: number;
  riders: number[];
  scores?: Record<number, number>;
  winner?: number;
}

export interface QuickStats {
  totalEvents: number;
  totalRiders: number;
  totalHeats: number;
  activeCompetitions: number;
}

export interface HeadToHead {
  rider1Id: number;
  rider2Id: number;
  wins1: number;
  wins2: number;
  lastMeeting?: string;
}

export interface AthleteResult {
  id: number;
  athlete_id: number;
  athlete_name: string;
  nationality: string;
  profile_picture_url: string;
  event_id: number;
  event_name: string;
  event_year: number;
  country_code: string;
  division: string;
  placement: number;
  source: string;
}

export interface AthleteResultsResponse {
  results: AthleteResult[];
  pagination: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Event Stats Types
export interface BestScoreDetail {
  score: number;
  athlete_name: string;
  athlete_id: number;
  heat_number: number;
  move_type?: string;
}

export interface MoveTypeStat {
  move_type: string;
  best_score: number;
  average_score: number;
  best_by: {
    athlete_name: string;
    athlete_id: number;
    heat_number: number;
    score: number;
  };
}

export interface TopScore {
  rank: number;
  athlete_name: string;
  athlete_id: number;
  score: number;
  heat_number: number;
  move_type?: string;
}

export interface EventStatsResponse {
  event_id: number;
  event_name: string;
  sex: 'Men' | 'Women';
  summary_stats: {
    best_heat_score: BestScoreDetail | null;
    best_jump_score: BestScoreDetail | null;
    best_wave_score: BestScoreDetail | null;
  };
  move_type_stats: MoveTypeStat[];
  top_jump_scores: TopScore[];
  top_wave_scores: TopScore[];
  metadata: {
    total_heats: number;
    total_athletes: number;
    generated_at: string;
  };
}

// Global Stats Types
export interface StatMetric {
  metric: string;
  value: string;
}

export interface GlobalStatsResponse {
  stats: StatMetric[];
  generated_at: string;
}
