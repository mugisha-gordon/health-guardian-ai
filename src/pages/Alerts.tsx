import { useState } from 'react';
import { Header } from '@/components/Header';
import { Bell, AlertTriangle, AlertCircle, CheckCircle, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Heart Rate Detected',
    message: 'Your heart rate reached 125 bpm during rest. Consider consulting a healthcare provider if this persists.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Blood Oxygen Below Normal',
    message: 'Blood oxygen dropped to 93% at 2:30 PM. Try deep breathing exercises.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Daily Goal Achieved!',
    message: 'Congratulations! You reached your 10,000 steps goal today.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Irregular Activity Pattern',
    message: 'Your activity has been lower than usual this week. Try to maintain consistent movement.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your weekly health report is now available. Check the Reports section for details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const filteredAlerts = filter === 'unread' 
    ? alerts.filter(a => !a.read) 
    : alerts;

  const unreadCount = alerts.filter(a => !a.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'critical': return 'border-destructive/30 bg-destructive/5';
      case 'warning': return 'border-warning/30 bg-warning/5';
      default: return 'border-info/30 bg-info/5';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      default: return 'text-info';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Alerts & Notifications</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All caught up!'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="gap-2">
                <Check className="h-4 w-4" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="h-16 w-16 text-muted-foreground/30" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No alerts</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'All alerts have been read' : 'You have no alerts yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const Icon = getIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "relative rounded-xl border p-5 transition-all animate-fade-in",
                    getStyles(alert.type),
                    !alert.read && "ring-2 ring-primary/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("mt-0.5", getIconColor(alert.type))}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{alert.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        {!alert.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                          {format(alert.timestamp, 'MMM d, h:mm a')}
                        </span>
                        {!alert.read && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="text-xs text-primary hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Alerts;
