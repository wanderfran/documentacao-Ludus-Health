import { notFound } from 'next/navigation';
import { getDepartmentBySlug, getPeopleByDepartment } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import HierarchyTree from '@/components/HierarchyTree';
import PersonCard from '@/components/PersonCard';
import GameAccordion from '@/components/GameAccordion';

// Icons for accordion sections
const PeopleIcon = () => (
  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProcessIcon = () => (
  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const ToolsIcon = () => (
  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

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
      {/* Breadcrumb with back button */}
      <nav
        className="flex items-center gap-4 mb-8 animate-fade-in"
        aria-label="Breadcrumb"
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 text-white text-sm font-medium transition-all hover:bg-emerald-800 hover:scale-105 shadow-lg"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </a>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-emerald-700 font-medium">{department.nome}</span>
        </div>
      </nav>

      {/* Hero Header - Mind Map Style */}
      <section
        className="relative mb-12 p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-2xl" />

        {/* Connection lines decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M0,30 Q25,50 50,30 T100,30" stroke="white" strokeWidth="0.3" fill="none" />
          <path d="M0,70 Q25,50 50,70 T100,70" stroke="white" strokeWidth="0.3" fill="none" />
        </svg>

        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-emerald-200 text-sm mb-4">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Departamento Ativo
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-white mb-3">
                {department.nome}
              </h1>
              <p className="text-emerald-200 text-lg max-w-2xl">
                {department.descricao}
              </p>
            </div>

            {/* Stats cards */}
            <div className="flex gap-4">
              <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
                <div className="text-3xl font-bold text-white">{people.length}</div>
                <div className="text-emerald-300 text-sm">Membros</div>
              </div>
              {department.lider && (
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-sm text-emerald-300 mb-1">Líder</div>
                  <div className="text-white font-semibold">{department.lider}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Game Accordions */}
      <div className="space-y-6">
        {/* Pessoas */}
        {people.length > 0 && (
          <div
            className="animate-slide-up"
            style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
          >
            <GameAccordion
              title="Pessoas"
              icon={<PeopleIcon />}
              badge={`${people.length} membros`}
              color="emerald"
              defaultOpen={true}
            >
              {/* Hierarchy Tree */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Organograma
                </h4>
                <div className="rounded-xl p-6 bg-white border border-emerald-100 overflow-x-auto">
                  <HierarchyTree leader={leader} members={members} departmentSlug={slug} />
                </div>
              </div>

              {/* Team Cards */}
              <div>
                <h4 className="text-lg font-semibold text-emerald-900 mb-4">Equipe Completa</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {people
                    .sort((a, b) => (a.lider ? -1 : 0) - (b.lider ? -1 : 0))
                    .map((person, idx) => (
                      <div
                        key={person.slug}
                        className="animate-slide-up"
                        style={{
                          animationDelay: `${idx * 50}ms`,
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
              </div>
            </GameAccordion>
          </div>
        )}

        {/* Processos */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
        >
          <GameAccordion
            title="Processos"
            icon={<ProcessIcon />}
            badge="Documentação"
            color="blue"
          >
            <div className="prose max-w-none prose-blue">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p className="text-gray-500 italic">Nenhum processo documentado ainda.</p>
              )}
            </div>
          </GameAccordion>
        </div>

        {/* Ferramentas */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: '350ms', animationFillMode: 'backwards' }}
        >
          <GameAccordion
            title="Ferramentas"
            icon={<ToolsIcon />}
            badge="Stack"
            color="purple"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Tool cards - these could come from the content */}
              {['Google Sheets', 'Slack', 'Trello', 'Notion', 'Figma', 'Meta Ads'].map((tool, idx) => (
                <div
                  key={tool}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <svg className="size-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">{tool}</span>
                </div>
              ))}
            </div>
          </GameAccordion>
        </div>
      </div>

      {/* Quick navigation footer */}
      <footer
        className="mt-12 pt-8 border-t border-gray-200 animate-fade-in"
        style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar ao Início
          </a>
          <p className="text-sm text-gray-400">
            Ludus Health &copy; 2025
          </p>
        </div>
      </footer>
    </main>
  );
}
