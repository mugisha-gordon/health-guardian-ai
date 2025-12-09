import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { HealthDataPoint } from '@/lib/healthDataGenerator';

interface ActivityChartProps {
  data: HealthDataPoint[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const chartData = data.map((point) => ({
    time: format(point.timestamp, 'HH:mm'),
    steps: point.steps,
    calories: point.calories,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <Bar 
            dataKey="steps" 
            fill="hsl(var(--activity))" 
            radius={[4, 4, 0, 0]}
            name="Steps"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
