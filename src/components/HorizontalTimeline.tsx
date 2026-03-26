'use client';

import { useState } from 'react';
import type { TimelineStep } from '@/lib/parsers';
import { cn } from '@/lib/utils';

interface HorizontalTimelineProps {
  steps: TimelineStep[];
}

export default function HorizontalTimeline({ steps }: HorizontalTimelineProps) {
  const [activeStep, setActiveStep] = useState<string>('1');

  const activeStepData = steps.find((s) => s.number === activeStep);

  return (
    <div className="space-y-6">
      {/* Horizontal stepper */}
      <div className="relative">
        {/* Scrollable container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex items-start gap-0 min-w-max">
            {steps.map((step, idx) => {
              const isActive = step.number === activeStep;
              const isPast = parseInt(step.number) < parseInt(activeStep);

              return (
                <div key={step.number} className="flex items-start">
                  {/* Step */}
                  <button
                    onClick={() => setActiveStep(step.number)}
                    className="flex flex-col items-center group"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Circle */}
                    <div
                      className={cn(
                        'size-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2',
                        isActive
                          ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200'
                          : isPast
                          ? 'bg-teal-500 border-teal-500 text-white'
                          : 'bg-white border-gray-300 text-gray-500 group-hover:border-amber-400 group-hover:text-amber-600'
                      )}
                    >
                      {isPast ? (
                        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>

                    {/* Title */}
                    <div className="mt-2 w-24 text-center">
                      <p
                        className={cn(
                          'text-xs font-medium leading-tight transition-colors',
                          isActive ? 'text-amber-600' : 'text-gray-600 group-hover:text-gray-900'
                        )}
                      >
                        {step.title.length > 25 ? step.title.slice(0, 25) + '...' : step.title}
                      </p>
                    </div>
                  </button>

                  {/* Connector line */}
                  {idx < steps.length - 1 && (
                    <div className="flex items-center h-10 px-1">
                      <div
                        className={cn(
                          'w-8 h-0.5 transition-colors',
                          parseInt(steps[idx + 1].number) <= parseInt(activeStep)
                            ? 'bg-teal-500'
                            : 'bg-gray-200'
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll hint gradients */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Active step details */}
      {activeStepData && (
        <div
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-fade-in"
          key={activeStep}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-amber-100 text-amber-700 text-sm font-bold">
                  {activeStepData.number}
                </span>
                <h3 className="text-xl font-bold font-serif text-gray-900">
                  {activeStepData.title}
                </h3>
              </div>

              {(activeStepData.responsible || activeStepData.deadline) && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {activeStepData.responsible && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {activeStepData.responsible}
                    </span>
                  )}
                  {activeStepData.deadline && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activeStepData.deadline}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const prevIdx = steps.findIndex((s) => s.number === activeStep) - 1;
                  if (prevIdx >= 0) setActiveStep(steps[prevIdx].number);
                }}
                disabled={activeStep === '1'}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Etapa anterior"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const nextIdx = steps.findIndex((s) => s.number === activeStep) + 1;
                  if (nextIdx < steps.length) setActiveStep(steps[nextIdx].number);
                }}
                disabled={activeStep === steps[steps.length - 1].number}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima etapa"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Description */}
          {activeStepData.description && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {activeStepData.description}
            </p>
          )}

          {/* Items checklist */}
          {activeStepData.items.length > 0 && (
            <ul className="space-y-2 pt-4 border-t border-gray-100">
              {activeStepData.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-teal-500 mt-0.5 shrink-0">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
