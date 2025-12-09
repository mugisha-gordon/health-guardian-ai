import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  color: 'heartRate' | 'oxygen' | 'activity' | 'sleep' | 'primary';
  delay?: number;
}

const colorClasses = {
  heartRate: {
    bg: 'bg-heartRate/10',
    text: 'text-heartRate',
    ring: 'ring-heartRate/20',
  },
  oxygen: {
    bg: 'bg-oxygen/10',
    text: 'text-oxygen',
    ring: 'ring-oxygen/20',
  },
  activity: {
    bg: 'bg-activity/10',
    text: 'text-activity',
    ring: 'ring-activity/20',
  },
  sleep: {
    bg: 'bg-sleep/10',
    text: 'text-sleep',
    ring: 'ring-sleep/20',
  },
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    ring: 'ring-primary/20',
  },
};

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = 'normal',
  color,
  delay = 0,
}: MetricCardProps) {
  const colors = colorClasses[color];
  
  return (
    <div 
      className="metric-card group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={cn("metric-icon ring-2", colors.bg, colors.ring)}>
          <Icon className={cn("h-6 w-6", colors.text)} />
        </div>
        <div className={cn("status-indicator", status)} />
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={cn("text-3xl font-bold tracking-tight", colors.text)}>
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
      
      {status !== 'normal' && (
        <div className={cn(
          "absolute inset-0 rounded-xl ring-2 ring-inset pointer-events-none",
          status === 'warning' && "ring-warning/30",
          status === 'critical' && "ring-destructive/40"
        )} />
      )}
    </div>
  );
}
