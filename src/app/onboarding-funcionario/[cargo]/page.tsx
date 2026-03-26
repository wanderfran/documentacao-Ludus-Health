import { notFound } from 'next/navigation';
import { getOnboardingByRole } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';

export default async function OnboardingCargoPage({
  params,
}: {
  params: Promise<{ cargo: string }>;
}) {
  const { cargo } = await params;
  const data = getOnboardingByRole(cargo);

  if (!data) {
    notFound();
  }

  const contentHtml = markdownToHtml(data.content);

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 flex-wrap animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <a href="/onboarding-funcionario" className="transition-colors hover:text-gray-900">Onboarding Funcionario</a>
        <span>/</span>
        <span className="text-emerald-700">{data.cargo}</span>
      </nav>

      {/* Header */}
      <section
        className="mb-8 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-sm">
            {data.departamento}
          </span>
          {data.duracao && (
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm">
              {data.duracao}
            </span>
          )}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          {data.titulo}
        </h1>
        <p className="text-lg text-gray-600">
          Guia completo de onboarding para o cargo de {data.cargo}
        </p>
      </section>

      {/* Content */}
      <section
        className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 animate-slide-up"
        style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
      >
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </section>

      {/* Back link */}
      <div
        className="mt-8 pt-6 animate-fade-in border-t border-gray-200"
        style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
      >
        <a
          href="/onboarding-funcionario"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Onboarding Funcionario
        </a>
      </div>
    </main>
  );
}
