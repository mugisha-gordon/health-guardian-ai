import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { HealthDataPoint } from '@/lib/healthDataGenerator';

interface HeartRateChartProps {
  data: HealthDataPoint[];
}

export function HeartRateChart({ data }: HeartRateChartProps) {
  const chartData = data.map((point) => ({
    time: format(point.timestamp, 'HH:mm'),
    heartRate: point.heartRate,
    bloodOxygen: point.bloodOxygen,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--heart-rate))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--heart-rate))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="oxygenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--oxygen))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--oxygen))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[50, 120]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-elevated)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Area
            type="monotone"
            dataKey="heartRate"
            stroke="hsl(var(--heart-rate))"
            strokeWidth={2}
            fill="url(#heartRateGradient)"
            name="Heart Rate (bpm)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
