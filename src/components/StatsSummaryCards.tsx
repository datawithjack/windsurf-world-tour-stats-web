import Card from './Card';

interface StatsSummaryCardsProps {
  bestHeatScore: {
    score: number;
    athlete: string;
    heat: string;
  };
  bestJumpScore: {
    score: number;
    athlete: string;
    heat: string;
    move: string;
  };
  bestWaveScore: {
    score: number;
    athlete: string;
    heat: string;
  };
}

const StatsSummaryCards = ({
  bestHeatScore,
  bestJumpScore,
  bestWaveScore,
}: StatsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Best Heat Score */}
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Best Heat Score</h3>
          <p className="text-4xl font-bold text-white mb-2">{bestHeatScore.score.toFixed(2)} pts</p>
          <p className="text-xs text-gray-400">
            {bestHeatScore.athlete} - {bestHeatScore.heat}
          </p>
        </div>
      </Card>

      {/* Best Jump Score */}
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Best Jump Score</h3>
          <p className="text-4xl font-bold text-white mb-2">{bestJumpScore.score.toFixed(2)} pts</p>
          <p className="text-xs text-gray-400">
            {bestJumpScore.athlete} - {bestJumpScore.heat}
          </p>
          <p className="text-xs text-gray-400">{bestJumpScore.move}</p>
        </div>
      </Card>

      {/* Best Wave Score */}
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Best Wave Score</h3>
          <p className="text-4xl font-bold text-white mb-2">{bestWaveScore.score.toFixed(2)} pts</p>
          <p className="text-xs text-gray-400">
            {bestWaveScore.athlete} - {bestWaveScore.heat}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StatsSummaryCards;
