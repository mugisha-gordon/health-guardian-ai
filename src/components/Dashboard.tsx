import { useState, useEffect } from 'react';
import { Heart, Droplets, Footprints, Moon, Flame, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { HeartRateChart } from './HeartRateChart';
import { ActivityChart } from './ActivityChart';
import { AnomalyAlert } from './AnomalyAlert';
import { RecommendationCard } from './RecommendationCard';
import { 
  generateHealthDataPoint, 
  generateHistoricalData, 
  detectAnomaly,
  generateRecommendations,
  HealthDataPoint,
  AnomalyResult
} from '@/lib/healthDataGenerator';

export function Dashboard() {
  const [currentData, setCurrentData] = useState<HealthDataPoint>(generateHealthDataPoint());
  const [historicalData, setHistoricalData] = useState<HealthDataPoint[]>(generateHistoricalData(24));
  const [anomaly, setAnomaly] = useState<AnomalyResult>(detectAnomaly(currentData.heartRate, currentData.bloodOxygen));
  const [recommendations, setRecommendations] = useState<string[]>(generateRecommendations(currentData));
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const newData = generateHealthDataPoint(currentData);
      setCurrentData(newData);
      
      // Update historical data
      setHistoricalData(prev => [...prev.slice(1), newData]);
      
      // Check for anomalies
      const newAnomaly = detectAnomaly(newData.heartRate, newData.bloodOxygen);
      setAnomaly(newAnomaly);
      
      // Update recommendations
      setRecommendations(generateRecommendations(newData));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, currentData]);

  const getHeartRateStatus = (rate: number) => {
    if (rate > 120 || rate < 50) return 'critical';
    if (rate > 100 || rate < 55) return 'warning';
    return 'normal';
  };

  const getOxygenStatus = (level: number) => {
    if (level < 92) return 'critical';
    if (level < 95) return 'warning';
    return 'normal';
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Status Banner */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Health Dashboard</h2>
            <p className="text-muted-foreground">
              {isLive ? (
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                  </span>
                  Live monitoring active
                </span>
              ) : (
                'Monitoring paused'
              )}
            </p>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Anomaly Alert */}
      {anomaly.isAnomaly && (
        <div className="mb-8">
          <AnomalyAlert anomaly={anomaly} />
        </div>
      )}

      {/* Metrics Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Heart Rate"
          value={currentData.heartRate}
          unit="bpm"
          icon={Heart}
          color="heartRate"
          status={getHeartRateStatus(currentData.heartRate)}
          delay={0}
        />
        <MetricCard
          title="Blood Oxygen"
          value={currentData.bloodOxygen}
          unit="%"
          icon={Droplets}
          color="oxygen"
          status={getOxygenStatus(currentData.bloodOxygen)}
          delay={100}
        />
        <MetricCard
          title="Steps Today"
          value={currentData.steps.toLocaleString()}
          icon={Footprints}
          color="activity"
          delay={200}
        />
        <MetricCard
          title="Calories Burned"
          value={currentData.calories.toFixed(0)}
          unit="kcal"
          icon={Flame}
          color="primary"
          delay={300}
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Heart Rate Trend</h3>
              <p className="text-sm text-muted-foreground">Last 24 hours</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-heartRate" />
              <span>Avg: 75 bpm</span>
            </div>
          </div>
          <HeartRateChart data={historicalData} />
        </div>

        <div className="glass-panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Activity Overview</h3>
              <p className="text-sm text-muted-foreground">Steps per hour</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Footprints className="h-4 w-4 text-activity" />
              <span>Goal: 10,000</span>
            </div>
          </div>
          <ActivityChart data={historicalData} />
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass-panel p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">AI Health Insights</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations based on your data</p>
            </div>
            <RecommendationCard recommendations={recommendations} />
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Activity Level</h3>
            <p className="text-sm text-muted-foreground">Current status</p>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <div className={`
              flex h-24 w-24 items-center justify-center rounded-full 
              ${currentData.activityLevel === 'high' ? 'bg-activity/20 text-activity' :
                currentData.activityLevel === 'moderate' ? 'bg-warning/20 text-warning' :
                'bg-muted text-muted-foreground'}
            `}>
              <Footprints className="h-10 w-10" />
            </div>
            <p className="mt-4 text-xl font-bold capitalize text-foreground">
              {currentData.activityLevel}
            </p>
            <p className="text-sm text-muted-foreground">Current Activity</p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">Sleep Quality</span>
              <span className="font-semibold text-foreground">{currentData.sleepQuality}%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">Daily Goal</span>
              <span className="font-semibold text-foreground">
                {Math.min(Math.round((currentData.steps / 10000) * 100), 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
