import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';

const defaultData = [
  { day: 'Mon', minutes: 0 },
  { day: 'Tue', minutes: 0 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 0 },
  { day: 'Fri', minutes: 0 },
  { day: 'Sat', minutes: 0 },
  { day: 'Sun', minutes: 0 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700
        rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-white font-semibold">
          {label}: {payload[0].value} mins
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyChart = ({ data }) => {
  const chartData = data || defaultData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface p-6 rounded-2xl
        border border-slate-700/50 shadow-lg h-full"
    >
      <div className="flex items-center
        justify-between mb-6">
        <h3 className="text-lg font-bold text-white">
          Weekly Activity
        </h3>
        <span className="text-xs text-slate-500
          bg-slate-700/50 px-3 py-1 rounded-full">
          This Week
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E293B"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59,130,246,0.05)' }}
            />
            <Bar
              dataKey="minutes"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeeklyChart;