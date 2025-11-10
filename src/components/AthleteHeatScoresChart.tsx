import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { HeatScore } from '../data/athleteStatsDummy';

interface AthleteHeatScoresChartProps {
  data: HeatScore[];
}

const AthleteHeatScoresChart = ({ data }: AthleteHeatScoresChartProps) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-white mb-1">
            Heat {data.heatNumber}
            {data.type && <span className="text-gray-400 ml-2">({data.type})</span>}
          </p>
          <p className="text-lg font-bold text-teal-400">{data.score.toFixed(2)} pts</p>
        </div>
      );
    }
    return null;
  };

  // Custom label renderer
  const renderCustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#f1f5f9"
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
      >
        {value.toFixed(2)}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
        <XAxis
          dataKey="heatNumber"
          stroke="#94a3b8"
          fontSize={12}
          label={{ value: 'Heat No.', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
        />
        <YAxis
          stroke="#94a3b8"
          fontSize={12}
          label={{ value: 'Score (pts)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(45, 212, 191, 0.1)' }} />
        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="score" content={renderCustomLabel} />
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.type === 'Double' ? '#14b8a6' : '#2dd4bf'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AthleteHeatScoresChart;
