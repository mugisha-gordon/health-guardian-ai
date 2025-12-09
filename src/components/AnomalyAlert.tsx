import { AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnomalyResult } from '@/lib/healthDataGenerator';
import { useState } from 'react';

interface AnomalyAlertProps {
  anomaly: AnomalyResult;
  onDismiss?: () => void;
}

export function AnomalyAlert({ anomaly, onDismiss }: AnomalyAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const icons = {
    normal: CheckCircle,
    warning: AlertTriangle,
    critical: AlertCircle,
  };

  const Icon = icons[anomaly.type];

  const styles = {
    normal: {
      bg: 'bg-success/10 border-success/30',
      icon: 'text-success',
      text: 'text-success',
    },
    warning: {
      bg: 'bg-warning/10 border-warning/30',
      icon: 'text-warning',
      text: 'text-warning',
    },
    critical: {
      bg: 'bg-destructive/10 border-destructive/30',
      icon: 'text-destructive',
      text: 'text-destructive',
    },
  };

  const style = styles[anomaly.type];

  return (
    <div className={cn(
      "relative flex items-start gap-3 rounded-xl border p-4 animate-slide-up",
      style.bg
    )}>
      <div className={cn("mt-0.5", style.icon)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className={cn("font-semibold", style.text)}>
          {anomaly.type === 'normal' ? 'All Clear' : 
           anomaly.type === 'warning' ? 'Attention Needed' : 
           'Immediate Attention Required'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{anomaly.message}</p>
        {anomaly.metric && (
          <p className="mt-2 text-xs text-muted-foreground">
            Affected metric: <span className="font-medium">{anomaly.metric}</span>
          </p>
        )}
      </div>
      {onDismiss && (
        <button 
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
