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
        className="flex items-center gap-2 text-sm mb-6 flex-wrap animate-fade-in"
        style={{ color: '#7b849b' }}
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-[#eef0f4]">Inicio</a>
        <span>/</span>
        <a href="/squads" className="transition-colors hover:text-[#eef0f4]">Squads</a>
        <span>/</span>
        <span style={{ color: '#d4a853' }}>{squad.nome}</span>
      </nav>

      {/* Header */}
      <section
        className="mb-8 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <h1
          className="text-3xl lg:text-4xl font-bold font-serif mb-2"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          {squad.nome}
        </h1>
        <p className="text-lg" style={{ color: '#7b849b' }}>{squad.descricao}</p>
      </section>

      {/* Leader + Members */}
      <section
        className="mb-8 rounded-xl p-6 animate-slide-up"
        style={{
          background: 'rgba(20, 26, 46, 0.5)',
          border: '1px solid #1e2845',
          animationDelay: '150ms',
          animationFillMode: 'backwards',
        }}
        aria-labelledby="members-heading"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm" style={{ color: '#7b849b' }}>Lider do Squad:</span>
          <span className="text-sm font-semibold" style={{ color: '#d4a853' }}>{squad.lider}</span>
        </div>

        <h3
          id="members-heading"
          className="text-sm font-semibold uppercase tracking-wider mb-3"
          style={{ color: '#7b849b' }}
        >
          Membros
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {squad.membros.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg animate-slide-up"
              style={{
                background: 'rgba(10, 15, 28, 0.5)',
                border: '1px solid rgba(30, 40, 69, 0.5)',
                animationDelay: `${200 + i * 60}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <div
                className="size-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: m.nome === squad.lider
                    ? 'linear-gradient(135deg, #d4a853, #2dd4bf)'
                    : '#1e2845',
                  color: m.nome === squad.lider ? '#0a0f1c' : '#7b849b',
                }}
              >
                {m.nome.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm" style={{ color: '#eef0f4' }}>{m.nome}</p>
                <p className="text-xs" style={{ color: '#7b849b' }}>{m.cargo}</p>
              </div>
              {m.nome === squad.lider && (
                <span
                  className="ml-auto px-2 py-0.5 text-xs rounded-full"
                  style={{
                    background: 'rgba(212, 168, 83, 0.15)',
                    color: '#d4a853',
                  }}
                >
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
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}

      {/* Back link */}
      <div
        className="mt-8 pt-6 animate-fade-in"
        style={{
          borderTop: '1px solid #1e2845',
          animationDelay: '400ms',
          animationFillMode: 'backwards',
        }}
      >
        <a
          href="/squads"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#d4a853]"
          style={{ color: '#7b849b' }}
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
