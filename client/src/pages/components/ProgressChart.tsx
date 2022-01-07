import dayjs from 'dayjs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProgressChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '150px' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -15,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter = {(unixTime) => dayjs(unixTime).format('MMM D')}
            type="number"
            domain={['dataMin', 'dataMax']}
            label={{ value: 'Time', position: 'bottom' }}
            // angle={-60}
          />
          <YAxis
            label={{ value: 'Performance', angle: -90, position: 'insideLeft' }}
          />
          <Area
            type="monotone"
            dataKey="performance"
            stroke="#f44336"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
