import { notFound } from 'next/navigation';
import { getPersonBySlug, getDepartmentBySlug } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import ProcessCard from '@/components/ProcessCard';
import { parseProcessesFromMarkdown } from '@/lib/parsers';

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string; pessoa: string }>;
}) {
  const { slug, pessoa } = await params;
  const person = getPersonBySlug(slug, pessoa);
  const department = getDepartmentBySlug(slug);

  if (!person || !department) {
    notFound();
  }

  const processes = parseProcessesFromMarkdown(person.content);
  const contentHtml = markdownToHtml(person.content);

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
        <a href={`/departamentos/${slug}`} className="transition-colors hover:text-[#eef0f4]">{department.nome}</a>
        <span>/</span>
        <span style={{ color: '#d4a853' }}>{person.nome}</span>
      </nav>

      {/* Profile Header */}
      <section
        className="flex items-start gap-5 mb-8 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        {/* Avatar with gradient border */}
        <div
          className="size-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
          style={{
            background: person.lider
              ? 'linear-gradient(135deg, #d4a853, #2dd4bf)'
              : '#141a2e',
            color: person.lider ? '#0a0f1c' : '#7b849b',
            border: person.lider ? 'none' : '2px solid #1e2845',
          }}
        >
          {person.nome.charAt(0)}
        </div>
        <div>
          <h1
            className="text-3xl font-bold font-serif"
            style={{ color: '#eef0f4', textWrap: 'balance' }}
          >
            {person.nome}
          </h1>
          <p className="text-lg" style={{ color: '#7b849b' }}>{person.cargo}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <a
              href={`/departamentos/${slug}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors hover:border-[rgba(212,168,83,0.4)]"
              style={{
                background: '#141a2e',
                border: '1px solid #1e2845',
                color: '#7b849b',
              }}
            >
              {department.nome}
            </a>
            {person.lider && (
              <span
                className="px-2.5 py-1 text-xs rounded-full font-medium"
                style={{
                  background: 'rgba(212, 168, 83, 0.15)',
                  color: '#d4a853',
                }}
              >
                Lider
              </span>
            )}
            {person.status === 'ativo' ? (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: '#2dd4bf' }}>
                <span className="size-2 rounded-full" style={{ background: '#2dd4bf' }} />
                Ativo
              </span>
            ) : (
              <span
                className="px-2.5 py-1 text-xs rounded-full"
                style={{
                  background: 'rgba(212, 168, 83, 0.15)',
                  color: '#d4a853',
                }}
              >
                {person.status}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Process Cards */}
      {processes.length > 0 && (
        <section
          className="mb-10 animate-slide-up"
          style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
          aria-labelledby="process-heading"
        >
          <h2
            id="process-heading"
            className="text-xl font-bold font-serif mb-4 flex items-center gap-2"
            style={{ color: '#eef0f4', textWrap: 'balance' }}
          >
            <svg className="size-5" style={{ color: '#d4a853' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Processos por Frequencia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processes.map((proc, idx) => (
              <div
                key={proc.frequency}
                className="animate-slide-up"
                style={{
                  animationDelay: `${200 + idx * 80}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <ProcessCard frequency={proc.frequency} items={proc.items} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full Content */}
      <section
        className="mt-8 pt-8 animate-fade-in"
        style={{
          borderTop: '1px solid #1e2845',
          animationDelay: '350ms',
          animationFillMode: 'backwards',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </section>
    </main>
  );
}
