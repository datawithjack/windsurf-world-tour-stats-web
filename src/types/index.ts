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
