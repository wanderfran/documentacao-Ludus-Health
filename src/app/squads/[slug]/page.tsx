import { notFound } from 'next/navigation';
import { getSquadBySlug } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';

export default async function SquadDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const squad = getSquadBySlug(slug);

  if (!squad) {
    notFound();
  }

  const contentHtml = markdownToHtml(squad.content);

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 flex-wrap animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <a href="/squads" className="transition-colors hover:text-gray-900">Squads</a>
        <span>/</span>
        <span className="text-emerald-700">{squad.nome}</span>
      </nav>

      {/* Header */}
      <section
        className="mb-8 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          {squad.nome}
        </h1>
        <p className="text-lg text-gray-600">{squad.descricao}</p>
      </section>

      {/* Leader + Members */}
      <section
        className="mb-8 rounded-xl p-6 animate-slide-up bg-white border border-gray-200"
        style={{
          animationDelay: '150ms',
          animationFillMode: 'backwards',
        }}
        aria-labelledby="members-heading"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500">Lider do Squad:</span>
          <span className="text-sm font-semibold text-emerald-700">{squad.lider}</span>
        </div>

        <h3
          id="members-heading"
          className="text-sm font-semibold uppercase tracking-wider mb-3 text-gray-500"
        >
          Membros
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {squad.membros.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg animate-slide-up bg-gray-50 border border-gray-100"
              style={{
                animationDelay: `${200 + i * 60}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <div
                className={`size-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  m.nome === squad.lider
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {m.nome.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{m.nome}</p>
                <p className="text-xs text-gray-500">{m.cargo}</p>
              </div>
              {m.nome === squad.lider && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800">
                  Lider
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      {contentHtml && (
        <section
          className="animate-fade-in"
          style={{ animationDelay: '350ms', animationFillMode: 'backwards' }}
        >
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}

      {/* Back link */}
      <div
        className="mt-8 pt-6 animate-fade-in border-t border-gray-200"
        style={{
          animationDelay: '400ms',
          animationFillMode: 'backwards',
        }}
      >
        <a
          href="/squads"
          className="inline-flex items-center gap-2 text-sm transition-colors text-gray-500 hover:text-emerald-700"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Squads
        </a>
      </div>
    </main>
  );
}
