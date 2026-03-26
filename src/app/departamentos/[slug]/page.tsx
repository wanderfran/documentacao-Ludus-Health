import { notFound } from 'next/navigation';
import { getDepartmentBySlug, getPeopleByDepartment } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import HierarchyTree from '@/components/HierarchyTree';
import PersonCard from '@/components/PersonCard';

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  const people = getPeopleByDepartment(slug);
  const leader = people.find((p) => p.lider) || null;
  const members = people.filter((p) => !p.lider);
  const contentHtml = markdownToHtml(department.content);

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
        <span style={{ color: '#7b849b' }}>Departamentos</span>
        <span>/</span>
        <span style={{ color: '#d4a853' }}>{department.nome}</span>
      </nav>

      {/* Header */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}>
        <h1
          className="text-3xl lg:text-4xl font-bold font-serif mb-2"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          {department.nome}
        </h1>
        <p style={{ color: '#7b849b' }}>{department.descricao}</p>
        {department.lider && (
          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border"
            style={{
              background: 'rgba(212, 168, 83, 0.1)',
              borderColor: 'rgba(212, 168, 83, 0.25)',
            }}
          >
            <span className="text-sm" style={{ color: '#7b849b' }}>Lider:</span>
            <span className="text-sm font-medium" style={{ color: '#d4a853' }}>{department.lider}</span>
          </div>
        )}
      </section>

      {/* Hierarchy Tree */}
      {people.length > 0 && (
        <section
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
          aria-labelledby="org-heading"
        >
          <h2
            id="org-heading"
            className="text-xl font-bold font-serif mb-6 flex items-center gap-2"
            style={{ color: '#eef0f4', textWrap: 'balance' }}
          >
            <svg className="size-5" style={{ color: '#d4a853' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Organograma
          </h2>
          <div
            className="rounded-xl p-8 overflow-x-auto"
            style={{
              background: 'rgba(20, 26, 46, 0.5)',
              border: '1px solid #1e2845',
            }}
          >
            <HierarchyTree leader={leader} members={members} departmentSlug={slug} />
          </div>
        </section>
      )}

      {/* Team Cards */}
      {people.length > 0 && (
        <section
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
          aria-labelledby="team-heading"
        >
          <h2
            id="team-heading"
            className="text-xl font-bold font-serif mb-6"
            style={{ color: '#eef0f4', textWrap: 'balance' }}
          >
            Equipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {people
              .sort((a, b) => (a.lider ? -1 : 0) - (b.lider ? -1 : 0))
              .map((person, idx) => (
                <div
                  key={person.slug}
                  className="animate-slide-up"
                  style={{
                    animationDelay: `${300 + idx * 60}ms`,
                    animationFillMode: 'backwards',
                  }}
                >
                  <PersonCard
                    nome={person.nome}
                    cargo={person.cargo}
                    slug={person.slug}
                    departmentSlug={slug}
                    status={person.status}
                    isLeader={person.lider}
                  />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Content */}
      {contentHtml && (
        <section
          className="prose prose-invert max-w-none animate-fade-in"
          style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
        >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}
    </main>
  );
}
