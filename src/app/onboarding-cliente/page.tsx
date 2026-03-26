import { getOnboardingSteps } from '@/lib/content';
import { parseTimelineFromMarkdown } from '@/lib/parsers';
import Timeline from '@/components/Timeline';

export default function OnboardingClientePage() {
  const data = getOnboardingSteps();

  if (!data) {
    return (
      <main className="pt-8 lg:pt-4">
        <h1
          className="text-3xl font-bold font-serif mb-4"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          Onboarding de Cliente
        </h1>
        <p style={{ color: '#7b849b' }}>Conteudo ainda nao disponivel.</p>
      </main>
    );
  }

  const steps = parseTimelineFromMarkdown(data.content);

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 animate-fade-in"
        style={{ color: '#7b849b' }}
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-[#eef0f4]">Inicio</a>
        <span>/</span>
        <span style={{ color: '#d4a853' }}>Onboarding Cliente</span>
      </nav>

      {/* Header */}
      <section
        className="mb-10 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mb-4"
          style={{
            background: 'rgba(45, 212, 191, 0.1)',
            borderColor: 'rgba(45, 212, 191, 0.25)',
            color: '#2dd4bf',
          }}
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {steps.length} etapas
        </div>
        <h1
          className="text-3xl lg:text-4xl font-bold font-serif mb-2"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          {data.titulo}
        </h1>
        <p className="text-lg" style={{ color: '#7b849b' }}>{data.descricao}</p>
      </section>

      {/* Timeline */}
      <section
        className="animate-slide-up"
        style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
        aria-label="Etapas do onboarding"
      >
        <Timeline steps={steps} />
      </section>
    </main>
  );
}
