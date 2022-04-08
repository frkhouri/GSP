import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from '@material-ui/core';

const PerformanceChart = ({ combos }) => {
  const theme = useTheme();
  const data = [];

  combos.forEach(combo => {
    combo.strikes.forEach(strike => {
      data.push({
        performance: strike.performance,
        force: strike.force,
        time: strike.time,
      });
    });
  });


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: '#ffffff9e',
            padding: '5px',
            height: '55px',
            fontSize: 'smaller',
            borderRadius: '7px',
            fontFamily: 'Oxygen',
          }}
        >
          <p className="label">{`Performance : ${payload[0].value.toFixed(
            1,
          )}`}</p>
          <p className="label">{`Force : ${payload[1].value.toFixed(
            1,
          )} N`}</p>
        </div>
      );
    }

    return null;
  };

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
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={'#82ca9d'}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={'#82ca9d'}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
            tickFormatter={value => value.toFixed(0)}
          />
          <YAxis
            yAxisId={'performance'}
            label={{
              value: 'Performance',
              angle: -90,
              position: 'insideBottomLeft',
              offset: 25,
            }}
          />
          <YAxis
            yAxisId={'force'}
            orientation={'right'}
            label={{
              value: 'Force',
              angle: -90,
              position: 'insideTopRight',
              offset: 15,
            }}
          />
          <Tooltip content={CustomTooltip} />
          <Legend height={30} verticalAlign='top' />
          <Area
            type="monotone"
            dataKey="performance"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorPv)"
            yAxisId={'performance'}
          />
          <Area
            type="monotone"
            dataKey="force"
            stroke={'#82ca9d'}
            fillOpacity={1}
            fill="url(#colorGreen)"
            yAxisId={'force'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
