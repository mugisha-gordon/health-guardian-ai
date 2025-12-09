import { Header } from '@/components/Header';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Heart, Footprints, Trophy, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    avatar: null,
  };

  const stats = {
    totalSteps: 1234567,
    avgHeartRate: 72,
    healthScore: 85,
    streakDays: 14,
  };

  const goals = [
    { label: 'Daily Steps', current: 8500, target: 10000 },
    { label: 'Active Minutes', current: 45, target: 60 },
    { label: 'Sleep Hours', current: 7, target: 8 },
    { label: 'Water Intake (L)', current: 2.1, target: 3 },
  ];

  const achievements = [
    { icon: Trophy, label: 'First 10K Steps', date: 'Jan 15, 2024' },
    { icon: Target, label: '7-Day Streak', date: 'Jan 22, 2024' },
    { icon: Heart, label: 'Healthy Heart Week', date: 'Feb 1, 2024' },
    { icon: Footprints, label: 'Marathon Month', date: 'Feb 28, 2024' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          <p className="text-muted-foreground">Manage your account and view achievements</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="glass-panel p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">{user.name}</h3>
              <p className="text-muted-foreground">Health Enthusiast</p>
              <Button variant="outline" size="sm" className="mt-4 gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Member since {user.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats & Goals */}
          <div className="space-y-6 lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="glass-panel p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{(stats.totalSteps / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Total Steps</p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.avgHeartRate}</p>
                <p className="text-xs text-muted-foreground">Avg Heart Rate</p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stats.healthScore}</p>
                <p className="text-xs text-muted-foreground">Health Score</p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.streakDays}</p>
                <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
              </div>
            </div>

            {/* Goals Progress */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Daily Goals</h3>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{goal.label}</span>
                      <span className="text-muted-foreground">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <Progress 
                      value={(goal.current / goal.target) * 100} 
                      className="mt-2 h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Achievements</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.label}
                    className="flex flex-col items-center rounded-lg bg-accent/50 p-4 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">{achievement.label}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
