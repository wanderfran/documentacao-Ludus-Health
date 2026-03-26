import { getSquads } from '@/lib/content';

export default function SquadsPage() {
  const squads = getSquads();

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
        <span style={{ color: '#d4a853' }}>Squads</span>
      </nav>

      {/* Header */}
      <section
        className="mb-10 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <h1
          className="text-3xl lg:text-4xl font-bold font-serif mb-2"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          Squads
        </h1>
        <p className="text-lg" style={{ color: '#7b849b' }}>
          Times multidisciplinares da Ludus Health
        </p>
      </section>

      {/* Squad Cards */}
      <section className="grid grid-cols-1 gap-6" aria-label="Lista de squads">
        {squads.map((squad, idx) => (
          <a
            key={squad.slug}
            href={`/squads/${squad.slug}`}
            className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up glass-card hover:border-[rgba(212,168,83,0.4)] hover:shadow-[0_0_40px_-12px_rgba(212,168,83,0.15)]"
            style={{
              animationDelay: `${100 + idx * 80}ms`,
              animationFillMode: 'backwards',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2
                  className="text-xl font-bold font-serif transition-colors group-hover:text-[#d4a853]"
                  style={{ color: '#eef0f4', textWrap: 'balance' }}
                >
                  {squad.nome}
                </h2>
                <p className="mt-1" style={{ color: '#7b849b' }}>{squad.descricao}</p>
              </div>
              <svg
                className="size-5 shrink-0 mt-1 transition-all group-hover:translate-x-1 group-hover:text-[#d4a853]"
                style={{ color: '#7b849b' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs" style={{ color: '#7b849b' }}>Lider:</span>
              <span className="text-sm font-medium" style={{ color: '#d4a853' }}>{squad.lider}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {squad.membros.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'rgba(10, 15, 28, 0.5)',
                    border: '1px solid rgba(30, 40, 69, 0.5)',
                  }}
                >
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-medium"
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
                    <span className="text-sm" style={{ color: '#eef0f4' }}>{m.nome}</span>
                    <span className="text-xs ml-1" style={{ color: '#7b849b' }}>({m.cargo})</span>
                  </div>
                </div>
              ))}
            </div>
          </a>
        ))}
      </section>

      {squads.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: '#7b849b' }}>Nenhum squad encontrado.</p>
        </div>
      )}
    </main>
  );
}
