import { cn } from '@/lib/utils';

interface ProcessCardProps {
  frequency: string;
  items: string[];
}

const frequencyConfig: Record<string, {
  text: string;
  bg: string;
  border: string;
  dot: string;
  glow: string;
  icon: React.ReactNode;
}> = {
  'Diário': {
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    dot: 'bg-secondary',
    glow: 'hover:shadow-secondary/10',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  'Semanal': {
    text: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    dot: 'bg-primary',
    glow: 'hover:shadow-primary/10',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  'Mensal': {
    text: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    dot: 'bg-blue-400',
    glow: 'hover:shadow-blue-400/10',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  'Trimestral': {
    text: 'text-pink-400',
    bg: 'bg-pink-400/10',
    border: 'border-pink-400/20',
    dot: 'bg-pink-400',
    glow: 'hover:shadow-pink-400/10',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
};

const defaultConfig = {
  text: 'text-muted-foreground',
  bg: 'bg-muted/50',
  border: 'border-border',
  dot: 'bg-muted-foreground',
  glow: '',
  icon: (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
};

export default function ProcessCard({ frequency, items }: ProcessCardProps) {
  const config = frequencyConfig[frequency] || defaultConfig;

  return (
    <div
      className={cn(
        'glass-card p-6 transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-xl',
        config.border,
        config.glow,
        'animate-slide-up'
      )}
    >
      {/* Frequency badge */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className={cn('flex items-center justify-center size-8 rounded-lg', config.bg, config.text)}>
          {config.icon}
        </span>
        <h3 className={cn('font-semibold font-serif text-lg', config.text)}>
          {frequency}
        </h3>
      </div>

      {/* Items list */}
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-card-foreground/80"
          >
            <span className={cn('mt-2 size-1.5 rounded-full shrink-0', config.dot)} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
