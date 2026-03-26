'use client';

import { useState } from 'react';
import type { TimelineStep } from '@/lib/parsers';
import { cn } from '@/lib/utils';

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['1']));

  const toggleStep = (num: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <div className="relative">
      {/* Vertical gold line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-border" />

      <div className="flex flex-col gap-4">
        {steps.map((step, idx) => {
          const isExpanded = expandedSteps.has(step.number);
          return (
            <div
              key={step.number}
              className="relative pl-16 animate-slide-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Gold circle with step number */}
              <div
                className={cn(
                  'absolute left-[14px] size-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300',
                  isExpanded
                    ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/30'
                    : 'bg-card border-border text-muted-foreground'
                )}
              >
                {step.number}
              </div>

              <button
                onClick={() => toggleStep(step.number)}
                className={cn(
                  'w-full text-left rounded-xl border p-5 transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isExpanded
                    ? 'glass-card border-primary/20 shadow-lg shadow-primary/5'
                    : 'bg-card/40 border-border hover:border-muted-foreground/30 hover:bg-card/60'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-semibold font-serif text-base">
                      {step.title}
                    </h3>
                    {(step.responsible || step.deadline) && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {step.responsible && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {step.responsible}
                          </span>
                        )}
                        {step.deadline && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-primary/80">
                            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {step.deadline}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <svg
                    className={cn(
                      'size-4 text-muted-foreground transition-transform duration-300 shrink-0 ml-4',
                      isExpanded && 'rotate-180 text-primary'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expandable content using grid trick */}
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 border-t border-border">
                      {step.description && (
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{step.description}</p>
                      )}
                      {step.items.length > 0 && (
                        <ul className="flex flex-col gap-2">
                          {step.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-card-foreground/80 flex items-start gap-2.5"
                            >
                              <span className="text-primary mt-0.5 shrink-0">
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Completion marker at end */}
              {idx === steps.length - 1 && (
                <div className="absolute left-[11px] -bottom-6 size-8 rounded-full bg-gradient-to-br from-secondary to-secondary/70 border-2 border-secondary flex items-center justify-center shadow-md shadow-secondary/20">
                  <svg className="size-4 text-secondary-foreground" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
