import { getSquads } from '@/lib/content';

export default function SquadsPage() {
  const squads = getSquads();

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <span className="text-emerald-700">Squads</span>
      </nav>

      {/* Header */}
      <section
        className="mb-10 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          Squads
        </h1>
        <p className="text-lg text-gray-600">
          Times multidisciplinares da Ludus Health
        </p>
      </section>

      {/* Squad Cards */}
      <section className="grid grid-cols-1 gap-6" aria-label="Lista de squads">
        {squads.map((squad, idx) => (
          <a
            key={squad.slug}
            href={`/squads/${squad.slug}`}
            className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50"
            style={{
              animationDelay: `${100 + idx * 80}ms`,
              animationFillMode: 'backwards',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold font-serif transition-colors group-hover:text-emerald-700 text-gray-900">
                  {squad.nome}
                </h2>
                <p className="mt-1 text-gray-600">{squad.descricao}</p>
              </div>
              <svg
                className="size-5 shrink-0 mt-1 transition-all group-hover:translate-x-1 text-gray-400 group-hover:text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-gray-500">Lider:</span>
              <span className="text-sm font-medium text-emerald-700">{squad.lider}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {squad.membros.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      m.nome === squad.lider
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {m.nome.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm text-gray-900">{m.nome}</span>
                    <span className="text-xs ml-1 text-gray-500">({m.cargo})</span>
                  </div>
                </div>
              ))}
            </div>
          </a>
        ))}
      </section>

      {squads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhum squad encontrado.</p>
        </div>
      )}
    </main>
  );
}
