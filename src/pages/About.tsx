import { Header } from '@/components/Header';
import { Activity, Heart, Shield, Zap, Users, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Real-Time Monitoring',
      description: 'Continuous tracking of heart rate, blood oxygen, and activity levels from wearable devices.',
    },
    {
      icon: Shield,
      title: 'AI Anomaly Detection',
      description: 'Advanced algorithms detect irregular health patterns and alert you immediately.',
    },
    {
      icon: Zap,
      title: 'Smart Recommendations',
      description: 'Personalized health advice based on your unique data and patterns.',
    },
    {
      icon: Users,
      title: 'User-Friendly Interface',
      description: 'Intuitive dashboard to view your health metrics and insights at a glance.',
    },
  ];

  const techStack = [
    'React + TypeScript',
    'Tailwind CSS',
    'Recharts',
    'Machine Learning (Isolation Forest)',
    'Real-time Data Processing',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Activity className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">HealthPulse AI</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            An AI-powered health monitoring system that analyzes real-time data from wearable devices
            to detect anomalies and provide personalized health recommendations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Key Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-16 glass-panel p-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Technical Implementation</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">Technology Stack</h3>
              <ul className="space-y-2">
                {techStack.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">How It Works</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
                  Data is collected from wearable devices in real-time
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
                  AI algorithms analyze patterns and detect anomalies
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
                  Users receive instant alerts and personalized recommendations
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">AI for Software Engineering Project</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            This project was developed as part of the AI for Software Engineering course,
            demonstrating the integration of AI, software engineering, and real-world problem-solving
            in the healthcare domain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
