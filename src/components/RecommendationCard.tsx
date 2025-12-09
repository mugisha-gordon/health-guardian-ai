import { Lightbulb, Droplets, Footprints, Wind, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  recommendations: string[];
}

const icons = [Lightbulb, Droplets, Footprints, Wind, Heart];

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div 
            key={index}
            className={cn(
              "flex items-start gap-3 rounded-lg bg-accent/50 p-4 transition-all duration-300",
              "hover:bg-accent animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{rec}</p>
          </div>
        );
      })}
    </div>
  );
}
