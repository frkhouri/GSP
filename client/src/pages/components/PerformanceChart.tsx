import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const PerformanceChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ background: '#ffffff9e', padding: '5px', height: '30px', fontSize: 'smaller', borderRadius: '7px' }}>
          <p className="label">{`Performance : ${payload[0].value}`}</p>
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
              <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            label={{ value: 'Time', position: 'bottom' }}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <YAxis
            label={{ value: 'Performance', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={CustomTooltip} />
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

export default PerformanceChart;
