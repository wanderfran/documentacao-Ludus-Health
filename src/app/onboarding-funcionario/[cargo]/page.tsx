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
    <div className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <a href="/" className="hover:text-slate-300 transition-colors">Inicio</a>
        <span>/</span>
        <a href="/onboarding-funcionario" className="hover:text-slate-300 transition-colors">Onboarding Funcionario</a>
        <span>/</span>
        <span className="text-blue-400">{data.cargo}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
            {data.departamento}
          </span>
          {data.duracao && (
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              {data.duracao}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{data.titulo}</h1>
        <p className="text-slate-400">Guia completo de onboarding para o cargo de {data.cargo}</p>
      </div>

      {/* Content */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 lg:p-8">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>

      {/* Back link */}
      <div className="mt-8">
        <a
          href="/onboarding-funcionario"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Voltar para Onboarding Funcionario
        </a>
      </div>
    </div>
  );
}
