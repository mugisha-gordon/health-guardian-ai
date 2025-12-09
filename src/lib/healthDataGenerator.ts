// Simulates real-time health data from wearable devices
export interface HealthDataPoint {
  timestamp: Date;
  heartRate: number;
  bloodOxygen: number;
  activityLevel: 'low' | 'moderate' | 'high';
  steps: number;
  calories: number;
  sleepQuality: number;
}

export interface AnomalyResult {
  isAnomaly: boolean;
  type: 'normal' | 'warning' | 'critical';
  message: string;
  metric?: string;
}

// Generate realistic heart rate based on activity and time
export function generateHeartRate(activityLevel: string, baseRate: number = 72): number {
  const activityModifier = {
    low: 0,
    moderate: 15,
    high: 35,
  }[activityLevel] || 0;
  
  const variation = Math.random() * 8 - 4;
  return Math.round(baseRate + activityModifier + variation);
}

// Generate blood oxygen levels (normal: 95-100%)
export function generateBloodOxygen(): number {
  const base = 97;
  const variation = Math.random() * 3 - 1;
  return Math.round((base + variation) * 10) / 10;
}

// Generate activity level based on time of day
export function generateActivityLevel(hour: number): 'low' | 'moderate' | 'high' {
  if (hour >= 23 || hour < 6) return 'low';
  if (hour >= 6 && hour < 9) return Math.random() > 0.5 ? 'moderate' : 'high';
  if (hour >= 9 && hour < 12) return Math.random() > 0.3 ? 'moderate' : 'low';
  if (hour >= 12 && hour < 14) return 'low';
  if (hour >= 14 && hour < 18) return Math.random() > 0.4 ? 'moderate' : 'low';
  if (hour >= 18 && hour < 20) return Math.random() > 0.3 ? 'high' : 'moderate';
  return 'low';
}

// Anomaly detection using simple threshold-based approach
export function detectAnomaly(heartRate: number, bloodOxygen: number): AnomalyResult {
  // Critical conditions
  if (heartRate > 120) {
    return {
      isAnomaly: true,
      type: 'critical',
      message: 'Dangerously high heart rate detected',
      metric: 'heartRate',
    };
  }
  
  if (heartRate < 50) {
    return {
      isAnomaly: true,
      type: 'critical',
      message: 'Dangerously low heart rate detected',
      metric: 'heartRate',
    };
  }
  
  if (bloodOxygen < 92) {
    return {
      isAnomaly: true,
      type: 'critical',
      message: 'Blood oxygen critically low - seek medical attention',
      metric: 'bloodOxygen',
    };
  }
  
  // Warning conditions
  if (heartRate > 100) {
    return {
      isAnomaly: true,
      type: 'warning',
      message: 'Elevated heart rate - consider resting',
      metric: 'heartRate',
    };
  }
  
  if (bloodOxygen < 95) {
    return {
      isAnomaly: true,
      type: 'warning',
      message: 'Blood oxygen below optimal levels',
      metric: 'bloodOxygen',
    };
  }
  
  return {
    isAnomaly: false,
    type: 'normal',
    message: 'All vitals within normal range',
  };
}

// Generate a single health data point
export function generateHealthDataPoint(prevData?: HealthDataPoint): HealthDataPoint {
  const now = new Date();
  const hour = now.getHours();
  const activityLevel = generateActivityLevel(hour);
  
  const prevSteps = prevData?.steps || 0;
  const stepsIncrement = activityLevel === 'high' ? Math.floor(Math.random() * 50) + 30 :
                         activityLevel === 'moderate' ? Math.floor(Math.random() * 20) + 10 :
                         Math.floor(Math.random() * 5);
  
  const prevCalories = prevData?.calories || 0;
  const caloriesIncrement = activityLevel === 'high' ? Math.random() * 5 + 3 :
                            activityLevel === 'moderate' ? Math.random() * 2 + 1 :
                            Math.random() * 0.5;

  return {
    timestamp: now,
    heartRate: generateHeartRate(activityLevel),
    bloodOxygen: generateBloodOxygen(),
    activityLevel,
    steps: prevSteps + stepsIncrement,
    calories: Math.round((prevCalories + caloriesIncrement) * 10) / 10,
    sleepQuality: Math.floor(Math.random() * 30) + 70,
  };
}

// Generate historical data for charts
export function generateHistoricalData(hours: number = 24): HealthDataPoint[] {
  const data: HealthDataPoint[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    const activityLevel = generateActivityLevel(hour);
    
    data.push({
      timestamp,
      heartRate: generateHeartRate(activityLevel),
      bloodOxygen: generateBloodOxygen(),
      activityLevel,
      steps: Math.floor(Math.random() * 1000) * (24 - i),
      calories: Math.floor(Math.random() * 100) * (24 - i) / 10,
      sleepQuality: hour >= 23 || hour < 7 ? Math.floor(Math.random() * 20) + 75 : 0,
    });
  }
  
  return data;
}

// Generate personalized health recommendations
export function generateRecommendations(data: HealthDataPoint): string[] {
  const recommendations: string[] = [];
  
  if (data.heartRate > 85) {
    recommendations.push("Consider taking a few minutes to practice deep breathing exercises");
  }
  
  if (data.bloodOxygen < 96) {
    recommendations.push("Try taking a short walk in fresh air to improve oxygen levels");
  }
  
  if (data.steps < 5000) {
    recommendations.push("You're below your daily step goal - a 15-minute walk can help");
  }
  
  if (data.activityLevel === 'low' && new Date().getHours() > 10 && new Date().getHours() < 20) {
    recommendations.push("Consider some light stretching or a quick walk to boost energy");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Great job! Your vitals look healthy. Keep up the good work!");
    recommendations.push("Stay hydrated - aim for 8 glasses of water today");
  }
  
  return recommendations;
}
