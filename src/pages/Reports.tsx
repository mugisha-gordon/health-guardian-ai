import { Header } from '@/components/Header';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const weeklyData = [
  { day: 'Mon', steps: 8432, calories: 320, heartRate: 72 },
  { day: 'Tue', steps: 10234, calories: 410, heartRate: 75 },
  { day: 'Wed', steps: 6543, calories: 280, heartRate: 68 },
  { day: 'Thu', steps: 9876, calories: 390, heartRate: 74 },
  { day: 'Fri', steps: 11234, calories: 450, heartRate: 78 },
  { day: 'Sat', steps: 7654, calories: 310, heartRate: 70 },
  { day: 'Sun', steps: 5432, calories: 220, heartRate: 66 },
];

const activityDistribution = [
  { name: 'Low', value: 40, color: 'hsl(var(--muted-foreground))' },
  { name: 'Moderate', value: 35, color: 'hsl(var(--warning))' },
  { name: 'High', value: 25, color: 'hsl(var(--activity))' },
];

const healthScore = 85;

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Health Reports</h2>
            <p className="text-muted-foreground">Weekly summary and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-8 glass-panel p-6">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="mb-4 text-center md:mb-0 md:text-left">
              <h3 className="text-lg font-semibold text-foreground">Overall Health Score</h3>
              <p className="text-muted-foreground">Based on your weekly activity</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg className="h-32 w-32 -rotate-90 transform">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(healthScore / 100) * 352} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-foreground">{healthScore}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+5% from last week</span>
                </div>
                <p className="text-sm text-muted-foreground">Excellent progress!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Avg Daily Steps</span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">8,486</p>
            <p className="text-sm text-success">+12% vs last week</p>
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Avg Heart Rate</span>
              <Minus className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">72 bpm</p>
            <p className="text-sm text-muted-foreground">Stable</p>
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Calories</span>
              <TrendingDown className="h-4 w-4 text-warning" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">2,380</p>
            <p className="text-sm text-warning">-5% vs last week</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Weekly Steps</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="steps" fill="hsl(var(--activity))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Activity Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6">
                {activityDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Heart Rate Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 85]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="hsl(var(--heart-rate))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--heart-rate))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
