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
        className="flex items-center gap-2 text-sm mb-6 animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <span>Departamentos</span>
        <span>/</span>
        <span className="text-emerald-700">{department.nome}</span>
      </nav>

      {/* Header */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}>
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          {department.nome}
        </h1>
        <p className="text-gray-600">{department.descricao}</p>
        {department.lider && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50">
            <span className="text-sm text-gray-600">Lider:</span>
            <span className="text-sm font-medium text-emerald-700">{department.lider}</span>
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
            className="text-xl font-bold font-serif mb-6 flex items-center gap-2 text-gray-900"
          >
            <svg className="size-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Organograma
          </h2>
          <div className="rounded-xl p-8 overflow-x-auto bg-gray-50 border border-gray-200">
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
            className="text-xl font-bold font-serif mb-6 text-gray-900"
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
          className="prose max-w-none animate-fade-in"
          style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
        >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}
    </main>
  );
}
