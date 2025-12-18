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
  total_athletes: number | null;
  total_men: number | null;
  total_women: number | null;
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

// Event Athletes List Types
export interface AthleteListItem {
  athlete_id: number;
  name: string;
  country: string;
  country_code: string;
  overall_position: number;
  sail_number: string | null;
  profile_image: string | null;
  total_heats: number;
  best_heat_score: number;
}

export interface AthleteListResponse {
  event_id: number;
  event_name: string;
  sex: string;
  athletes: AthleteListItem[];
  metadata: {
    total_athletes: number;
    generated_at: string;
  };
}

// Athlete Event Stats Types
export interface AthleteProfile {
  name: string;
  country: string;
  country_code: string;
  profile_image: string | null;
  sponsors: string | null;
  sail_number: string | null;
}

export interface AthleteSummaryStats {
  overall_position: number;
  best_heat_score: {
    score: number;
    heat: string;
    opponents?: string[] | null;
  } | null;
  best_jump_score: {
    score: number;
    heat: string;
    move: string;
    opponents?: string[] | null;
  } | null;
  best_wave_score: {
    score: number;
    heat: string;
    opponents?: string[] | null;
  } | null;
}

export interface MoveTypeScore {
  move_type: string;
  best_score: number;
  average_score: number;
}

export interface HeatScore {
  heat_number: string;
  score: number;
  elimination_type: 'Single' | 'Double';
}

export interface JumpScore {
  heat_number: string;
  move: string;
  score: number;
  counting: boolean;
}

export interface WaveScore {
  heat_number: string;
  score: number;
  counting: boolean;
  wave_index?: number;
}

export interface AthleteStatsResponse {
  event_id: number;
  event_name: string;
  sex: 'Men' | 'Women';
  athlete_id: number;
  profile: AthleteProfile;
  summary_stats: AthleteSummaryStats;
  move_type_scores: MoveTypeScore[];
  heat_scores: HeatScore[];
  jump_scores: JumpScore[];
  wave_scores: WaveScore[];
  metadata: {
    total_heats: number;
    total_jumps: number;
    total_waves: number;
    generated_at: string;
  };
}
