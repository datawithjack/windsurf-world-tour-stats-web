// Dummy data extracted from athlete stats template screenshot
// This will be replaced with real API data when endpoints are ready

export interface AthleteProfile {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  profileImage?: string;
  sponsors?: string;
  sailNumber?: string;
}

export interface AthleteSummaryStats {
  overallPosition: number;
  bestHeatScore: {
    score: number;
    heat: string;
    opponents?: string;
  };
  bestJumpScore: {
    score: number;
    heat: string;
    move: string;
    opponents?: string;
  };
  bestWaveScore: {
    score: number;
    heat: string;
    opponents?: string;
  };
}

export interface MoveTypeScore {
  type: string;
  best: number;
  average: number;
}

export interface HeatScore {
  heatNumber: number;
  score: number;
  type?: 'Single' | 'Double';
}

export interface JumpScore {
  heatNo: string;
  move: string;
  score: number;
  counting: boolean;
}

export interface WaveScore {
  heatNo: string;
  score: number;
  counting: boolean;
  index?: number;
}

export interface AthleteStatsData {
  profile: AthleteProfile;
  summaryStats: AthleteSummaryStats;
  moveTypeScores: MoveTypeScore[];
  heatScores: HeatScore[];
  jumpScores: JumpScore[];
  waveScores: WaveScore[];
}

// Dummy athletes data
export const dummyAthletes: AthleteProfile[] = [
  {
    id: 1,
    name: 'Daida Ruano Moreno',
    country: '🇪🇸 Spain',
    countryCode: 'ESP',
    sponsors: 'Bruch Boards, Severne Windsurfing, Maui Ultra...',
    sailNumber: 'E-64',
  },
  {
    id: 2,
    name: 'Sarah-Quita Offringa',
    country: '🇦🇼 Aruba',
    countryCode: 'ARU',
    sponsors: 'Starboard, Severne',
    sailNumber: 'ARU-41',
  },
  {
    id: 3,
    name: 'Justyna Sniady',
    country: '🇵🇱 Poland',
    countryCode: 'POL',
    sponsors: 'JP Australia, NeilPryde',
    sailNumber: 'POL-20',
  },
];

// Dummy stats for Daida Ruano Moreno (from screenshot)
export const dummyAthleteStats: Record<number, AthleteStatsData> = {
  1: {
    profile: dummyAthletes[0],
    summaryStats: {
      overallPosition: 1,
      bestHeatScore: {
        score: 23.58,
        heat: 'Heat 23a',
        opponents: 'v Kiefer Quintana, Degrieck, Offringa',
      },
      bestJumpScore: {
        score: 7.10,
        heat: 'Heat 19a',
        move: 'Forward Loop',
        opponents: 'v Katz, Morales Navarro, Wermeister',
      },
      bestWaveScore: {
        score: 6.75,
        heat: 'Heat 23a',
        opponents: 'v Kiefer Quintana, Degrieck, Offringa',
      },
    },
    moveTypeScores: [
      { type: 'Forward Loop', best: 7.10, average: 5.65 },
      { type: 'Backloop', best: 6.75, average: 6.11 },
      { type: 'Wave', best: 6.75, average: 3.86 },
    ],
    heatScores: [
      { heatNumber: 19, score: 19.11, type: 'Single' },
      { heatNumber: 22, score: 20.12, type: 'Single' },
      { heatNumber: 23, score: 23.58, type: 'Single' },
      { heatNumber: 49, score: 17.13, type: 'Double' },
      { heatNumber: 50, score: 17.45, type: 'Double' },
    ],
    jumpScores: [
      { heatNo: '19a', move: 'Forward Loop', score: 7.10, counting: true },
      { heatNo: '19a', move: 'Backloop', score: 6.75, counting: true },
      { heatNo: '19a', move: 'Forward Loop', score: 6.50, counting: false },
      { heatNo: '49a', move: 'Backloop', score: 6.50, counting: true },
      { heatNo: '23a', move: 'Forward Loop', score: 6.38, counting: true },
      { heatNo: '23a', move: 'Backloop', score: 6.20, counting: true },
      { heatNo: '22a', move: 'Backloop', score: 6.00, counting: true },
      { heatNo: '50a', move: 'Forward Loop', score: 5.38, counting: true },
      { heatNo: '22a', move: 'Backloop', score: 5.12, counting: false },
    ],
    waveScores: [
      { heatNo: '23a', score: 6.75, counting: true, index: 1014 },
      { heatNo: '22a', score: 6.00, counting: true, index: 985 },
      { heatNo: '23a', score: 4.25, counting: true, index: 1012 },
      { heatNo: '49a', score: 3.75, counting: true, index: 2130 },
      { heatNo: '50a', score: 3.75, counting: true, index: 2138 },
      { heatNo: '22a', score: 3.62, counting: true, index: 986 },
      { heatNo: '50a', score: 3.20, counting: true, index: 2137 },
      { heatNo: '19a', score: 2.88, counting: true, index: 891 },
    ],
  },
  2: {
    profile: dummyAthletes[1],
    summaryStats: {
      overallPosition: 2,
      bestHeatScore: {
        score: 21.45,
        heat: 'Heat 24a',
      },
      bestJumpScore: {
        score: 6.80,
        heat: 'Heat 24a',
        move: 'Backloop',
      },
      bestWaveScore: {
        score: 6.50,
        heat: 'Heat 24a',
      },
    },
    moveTypeScores: [
      { type: 'Backloop', best: 6.80, average: 5.90 },
      { type: 'Forward Loop', best: 6.50, average: 5.30 },
      { type: 'Wave', best: 6.50, average: 4.20 },
    ],
    heatScores: [
      { heatNumber: 18, score: 18.25, type: 'Single' },
      { heatNumber: 21, score: 19.80, type: 'Single' },
      { heatNumber: 24, score: 21.45, type: 'Single' },
      { heatNumber: 48, score: 16.90, type: 'Double' },
    ],
    jumpScores: [
      { heatNo: '24a', move: 'Backloop', score: 6.80, counting: true },
      { heatNo: '24a', move: 'Forward Loop', score: 6.50, counting: true },
      { heatNo: '21a', move: 'Backloop', score: 6.25, counting: true },
      { heatNo: '18a', move: 'Forward Loop', score: 6.10, counting: true },
    ],
    waveScores: [
      { heatNo: '24a', score: 6.50, counting: true, index: 1020 },
      { heatNo: '21a', score: 5.75, counting: true, index: 990 },
      { heatNo: '18a', score: 5.25, counting: true, index: 880 },
    ],
  },
  3: {
    profile: dummyAthletes[2],
    summaryStats: {
      overallPosition: 3,
      bestHeatScore: {
        score: 20.15,
        heat: 'Heat 22a',
      },
      bestJumpScore: {
        score: 6.60,
        heat: 'Heat 22a',
        move: 'Forward Loop',
      },
      bestWaveScore: {
        score: 6.25,
        heat: 'Heat 22a',
      },
    },
    moveTypeScores: [
      { type: 'Forward Loop', best: 6.60, average: 5.40 },
      { type: 'Backloop', best: 6.40, average: 5.70 },
      { type: 'Wave', best: 6.25, average: 4.10 },
    ],
    heatScores: [
      { heatNumber: 17, score: 17.90, type: 'Single' },
      { heatNumber: 20, score: 19.40, type: 'Single' },
      { heatNumber: 22, score: 20.15, type: 'Single' },
      { heatNumber: 47, score: 16.20, type: 'Double' },
    ],
    jumpScores: [
      { heatNo: '22a', move: 'Forward Loop', score: 6.60, counting: true },
      { heatNo: '22a', move: 'Backloop', score: 6.40, counting: true },
      { heatNo: '20a', move: 'Forward Loop', score: 6.20, counting: true },
      { heatNo: '17a', move: 'Backloop', score: 5.90, counting: true },
    ],
    waveScores: [
      { heatNo: '22a', score: 6.25, counting: true, index: 988 },
      { heatNo: '20a', score: 5.50, counting: true, index: 950 },
      { heatNo: '17a', score: 5.00, counting: true, index: 870 },
    ],
  },
};
