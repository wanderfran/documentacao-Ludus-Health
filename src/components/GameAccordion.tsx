'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GameAccordionProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  color: 'emerald' | 'blue' | 'purple';
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const colorConfig = {
  emerald: {
    bg: 'bg-emerald-900',
    bgHover: 'hover:bg-emerald-800',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-700',
    borderLight: 'border-emerald-200',
    text: 'text-emerald-100',
    textDark: 'text-emerald-900',
    badge: 'bg-emerald-400 text-emerald-900',
    glow: 'shadow-emerald-500/20',
    progress: 'bg-emerald-400',
  },
  blue: {
    bg: 'bg-blue-900',
    bgHover: 'hover:bg-blue-800',
    bgLight: 'bg-blue-50',
    border: 'border-blue-700',
    borderLight: 'border-blue-200',
    text: 'text-blue-100',
    textDark: 'text-blue-900',
    badge: 'bg-blue-400 text-blue-900',
    glow: 'shadow-blue-500/20',
    progress: 'bg-blue-400',
  },
  purple: {
    bg: 'bg-purple-900',
    bgHover: 'hover:bg-purple-800',
    bgLight: 'bg-purple-50',
    border: 'border-purple-700',
    borderLight: 'border-purple-200',
    text: 'text-purple-100',
    textDark: 'text-purple-900',
    badge: 'bg-purple-400 text-purple-900',
    glow: 'shadow-purple-500/20',
    progress: 'bg-purple-400',
  },
};

export default function GameAccordion({
  title,
  icon,
  badge,
  color,
  children,
  defaultOpen = false,
}: GameAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = colorConfig[color];

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden transition-all duration-500',
        isOpen ? `shadow-xl ${config.glow}` : 'shadow-md',
        'animate-slide-up'
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between p-5 transition-all duration-300',
          config.bg,
          config.bgHover,
          'group'
        )}
      >
        <div className="flex items-center gap-4">
          {/* Icon with glow effect */}
          <div
            className={cn(
              'size-12 rounded-xl flex items-center justify-center transition-all duration-300',
              'bg-white/10 backdrop-blur-sm',
              isOpen && 'scale-110 bg-white/20'
            )}
          >
            <span className="text-white">{icon}</span>
          </div>

          <div className="text-left">
            <h3 className={cn('text-xl font-bold font-serif', config.text)}>
              {title}
            </h3>
            {badge && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium',
                  config.badge
                )}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex items-center gap-3">
          <span className={cn('text-sm', config.text, 'opacity-60')}>
            {isOpen ? 'Fechar' : 'Explorar'}
          </span>
          <div
            className={cn(
              'size-8 rounded-full flex items-center justify-center transition-all duration-300',
              'bg-white/10',
              isOpen && 'rotate-180 bg-white/20'
            )}
          >
            <svg
              className={cn('size-5', config.text)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Content */}
      <div
        className={cn(
          'grid transition-all duration-500 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'p-6 border-t',
              config.borderLight,
              config.bgLight
            )}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Progress bar animation */}
      {isOpen && (
        <div className={cn('h-1', config.bg)}>
          <div
            className={cn('h-full animate-pulse', config.progress)}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
