import { Header } from '@/components/Header';
import { 
  Bell, Shield, Smartphone, Palette, HelpCircle, LogOut, 
  ChevronRight, Moon, Sun, Volume2, VolumeX, Vibrate
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [heartRateThreshold, setHeartRateThreshold] = useState([100]);
  const [oxygenThreshold, setOxygenThreshold] = useState([95]);

  const settingsSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { 
          label: 'Push Notifications', 
          description: 'Receive alerts on your device',
          control: <Switch checked={notifications} onCheckedChange={setNotifications} />
        },
        { 
          label: 'Critical Health Alerts', 
          description: 'Always notify for critical conditions',
          control: <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
        },
        { 
          label: 'Sound', 
          description: 'Play sound for notifications',
          control: <Switch checked={sound} onCheckedChange={setSound} />,
          icon: sound ? Volume2 : VolumeX
        },
        { 
          label: 'Vibration', 
          description: 'Vibrate for notifications',
          control: <Switch checked={vibration} onCheckedChange={setVibration} />,
          icon: Vibrate
        },
      ]
    },
    {
      title: 'Health Thresholds',
      icon: Shield,
      items: [
        { 
          label: 'High Heart Rate Alert', 
          description: `Alert when heart rate exceeds ${heartRateThreshold[0]} bpm`,
          control: (
            <div className="w-32">
              <Slider 
                value={heartRateThreshold} 
                onValueChange={setHeartRateThreshold}
                min={80}
                max={150}
                step={5}
              />
            </div>
          )
        },
        { 
          label: 'Low Oxygen Alert', 
          description: `Alert when oxygen falls below ${oxygenThreshold[0]}%`,
          control: (
            <div className="w-32">
              <Slider 
                value={oxygenThreshold} 
                onValueChange={setOxygenThreshold}
                min={85}
                max={98}
                step={1}
              />
            </div>
          )
        },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { 
          label: 'Dark Mode', 
          description: 'Use dark theme',
          control: <Switch checked={darkMode} onCheckedChange={setDarkMode} />,
          icon: darkMode ? Moon : Sun
        },
      ]
    },
  ];

  const actionItems = [
    { label: 'Connected Devices', icon: Smartphone, action: () => {} },
    { label: 'Help & Support', icon: HelpCircle, action: () => {} },
    { label: 'Sign Out', icon: LogOut, action: () => {}, destructive: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-muted-foreground">Customize your health monitoring experience</p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="glass-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <section.icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div 
                    key={item.label}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.control}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="glass-panel overflow-hidden">
            {actionItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex w-full items-center justify-between p-4 transition-colors hover:bg-muted ${
                  index !== actionItems.length - 1 ? 'border-b border-border' : ''
                } ${item.destructive ? 'text-destructive' : 'text-foreground'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            HealthPulse AI v1.0.0 • Made with ❤️ for your health
          </p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
