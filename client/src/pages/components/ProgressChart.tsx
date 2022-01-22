import dayjs from 'dayjs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@material-ui/core';

const ProgressChart = ({ data }) => {
  const theme = useTheme();

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
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={unixTime => dayjs(unixTime).format('MMM D')}
            type="number"
            domain={['dataMin', 'dataMax']}
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
            // angle={-60}
          />
          <YAxis
            label={{
              value: 'Performance',
              angle: -90,
              position: 'insideBottomLeft',
              offset: 25,
            }}
          />
          <Area
            type="monotone"
            dataKey="performance"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
