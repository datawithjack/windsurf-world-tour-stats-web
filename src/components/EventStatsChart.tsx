import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MoveTypeData {
  type: string;
  best: number;
  average: number;
  bestBy?: {
    athlete: string;
    heat: string;
    score: number;
  };
}

interface EventStatsChartProps {
  data: MoveTypeData[];
}

// Custom Tooltip Component
const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length > 0) {
    const data = payload[0].payload as MoveTypeData;
    const isBest = payload[0].dataKey === 'best';

    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 shadow-lg">
        <p className="font-semibold text-white mb-2">{label}</p>
        {isBest && data.bestBy ? (
          <>
            <p className="text-sm text-cyan-400 mb-1">
              Best: {data.best.toFixed(2)} pts
            </p>
            <p className="text-xs text-gray-400">
              {data.bestBy.athlete}
            </p>
            <p className="text-xs text-gray-400">
              Heat {data.bestBy.heat}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400">
            {payload[0].name}: {payload[0].value?.toFixed(2)} pts
          </p>
        )}
      </div>
    );
  }

  return null;
};

const EventStatsChart = ({ data }: EventStatsChartProps) => {
  return (
    <div className="w-full space-y-4">
      {/* Custom Legend at Top */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-gray-400">Best Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          <span className="text-gray-400">Average Score</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            type="number"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            domain={[0, 'auto']}
          />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56, 189, 248, 0.1)' }} />
          <Bar
            dataKey="best"
            name="Best Score"
            fill="#38bdf8"
            radius={[0, 4, 4, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="average"
            name="Average Score"
            fill="#475569"
            radius={[0, 4, 4, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventStatsChart;
