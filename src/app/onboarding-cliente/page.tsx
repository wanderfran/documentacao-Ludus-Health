import { getOnboardingSteps } from '@/lib/content';
import { parseTimelineFromMarkdown } from '@/lib/parsers';
import HorizontalTimeline from '@/components/HorizontalTimeline';

export default function OnboardingClientePage() {
  const data = getOnboardingSteps();

  if (!data) {
    return (
      <main className="pt-8 lg:pt-4">
        <h1 className="text-3xl font-bold font-serif mb-4 text-gray-900">
          Onboarding de Cliente
        </h1>
        <p className="text-gray-600">Conteudo ainda nao disponivel.</p>
      </main>
    );
  }

  const steps = parseTimelineFromMarkdown(data.content);

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <span className="text-emerald-700">Onboarding Cliente</span>
      </nav>

      {/* Header */}
      <section
        className="mb-10 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mb-4 bg-emerald-50 border-emerald-200 text-emerald-800">
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {steps.length} etapas
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          {data.titulo}
        </h1>
        <p className="text-lg text-gray-600">{data.descricao}</p>
      </section>

      {/* Timeline */}
      <section
        className="animate-slide-up"
        style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
        aria-label="Etapas do onboarding"
      >
        <HorizontalTimeline steps={steps} />
      </section>
    </main>
  );
}
