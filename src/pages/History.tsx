import { useState } from 'react';
import { Header } from '@/components/Header';
import { Calendar, ChevronLeft, ChevronRight, Heart, Droplets, Footprints, Flame } from 'lucide-react';
import { format, subDays, addDays, isSameDay } from 'date-fns';
import { generateHistoricalData, HealthDataPoint } from '@/lib/healthDataGenerator';
import { HeartRateChart } from '@/components/HeartRateChart';
import { ActivityChart } from '@/components/ActivityChart';

const History = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [historicalData] = useState<HealthDataPoint[]>(generateHistoricalData(168)); // 7 days

  const filteredData = historicalData.filter(d => 
    isSameDay(d.timestamp, selectedDate)
  );

  const dailyStats = {
    avgHeartRate: filteredData.length > 0 
      ? Math.round(filteredData.reduce((sum, d) => sum + d.heartRate, 0) / filteredData.length)
      : 0,
    avgOxygen: filteredData.length > 0
      ? (filteredData.reduce((sum, d) => sum + d.bloodOxygen, 0) / filteredData.length).toFixed(1)
      : 0,
    totalSteps: filteredData.length > 0 ? Math.max(...filteredData.map(d => d.steps)) : 0,
    totalCalories: filteredData.length > 0 ? Math.max(...filteredData.map(d => d.calories)).toFixed(0) : 0,
  };

  const goToPreviousDay = () => setSelectedDate(prev => subDays(prev, 1));
  const goToNextDay = () => setSelectedDate(prev => addDays(prev, 1));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Health History</h2>
          <p className="text-muted-foreground">View your past health data and trends</p>
        </div>

        {/* Date Selector */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <button
            onClick={goToPreviousDay}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-card px-6 py-3 shadow-card">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
          <button
            onClick={goToNextDay}
            disabled={isSameDay(selectedDate, new Date())}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Daily Summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="glass-panel p-5 text-center">
            <Heart className="mx-auto h-8 w-8 text-heartRate" />
            <p className="mt-2 text-2xl font-bold text-foreground">{dailyStats.avgHeartRate}</p>
            <p className="text-sm text-muted-foreground">Avg Heart Rate (bpm)</p>
          </div>
          <div className="glass-panel p-5 text-center">
            <Droplets className="mx-auto h-8 w-8 text-oxygen" />
            <p className="mt-2 text-2xl font-bold text-foreground">{dailyStats.avgOxygen}%</p>
            <p className="text-sm text-muted-foreground">Avg Blood Oxygen</p>
          </div>
          <div className="glass-panel p-5 text-center">
            <Footprints className="mx-auto h-8 w-8 text-activity" />
            <p className="mt-2 text-2xl font-bold text-foreground">{dailyStats.totalSteps.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Steps</p>
          </div>
          <div className="glass-panel p-5 text-center">
            <Flame className="mx-auto h-8 w-8 text-warning" />
            <p className="mt-2 text-2xl font-bold text-foreground">{dailyStats.totalCalories}</p>
            <p className="text-sm text-muted-foreground">Calories Burned</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Heart Rate Throughout Day</h3>
            {filteredData.length > 0 ? (
              <HeartRateChart data={filteredData} />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No data available for this date
              </div>
            )}
          </div>
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Activity Pattern</h3>
            {filteredData.length > 0 ? (
              <ActivityChart data={filteredData} />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No data available for this date
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
