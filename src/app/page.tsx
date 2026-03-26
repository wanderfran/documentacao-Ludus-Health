import { getDepartments } from '@/lib/content';

const deptIcons: Record<string, string> = {
  marketing: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  'comercial-interno': 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  'operacao-cliente': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  administrativo: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
};

export default function HomePage() {
  const departments = getDepartments();

  return (
    <main className="pt-8 lg:pt-4">
      {/* Hero */}
      <section
        className="mb-14 animate-fade-in"
        aria-labelledby="hero-heading"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mb-6"
          style={{
            background: 'rgba(212, 168, 83, 0.1)',
            borderColor: 'rgba(212, 168, 83, 0.25)',
            color: '#d4a853',
          }}
        >
          <span
            className="size-2 rounded-full animate-pulse"
            style={{ background: '#d4a853' }}
          />
          Documentacao Interna
        </div>

        <h1
          id="hero-heading"
          className="text-5xl lg:text-6xl font-bold font-serif mb-4"
          style={{ color: '#eef0f4', textWrap: 'balance' }}
        >
          Ludus{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #d4a853, #2dd4bf)',
            }}
          >
            Health
          </span>
        </h1>

        <p className="text-lg max-w-2xl" style={{ color: '#7b849b' }}>
          Central de documentacao, processos e procedimentos internos da Ludus
          Health. Encontre tudo sobre departamentos, squads, onboarding e mais.
        </p>
      </section>

      {/* Quick Access */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14" aria-label="Acesso rapido">
        <a
          href="/onboarding-cliente"
          className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up glass-card hover:border-[rgba(212,168,83,0.4)] hover:shadow-[0_0_40px_-12px_rgba(212,168,83,0.15)]"
          style={{
            animationDelay: '100ms',
            animationFillMode: 'backwards',
          }}
        >
          <div
            className="absolute top-0 right-0 size-32 rounded-bl-full"
            style={{ background: 'linear-gradient(to bottom left, rgba(212, 168, 83, 0.1), transparent)' }}
          />
          <div className="relative">
            <div
              className="size-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: 'rgba(212, 168, 83, 0.15)' }}
            >
              <svg className="size-5" style={{ color: '#d4a853' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3
              className="font-semibold mb-1 transition-colors"
              style={{ color: '#eef0f4' }}
            >
              Onboarding de Cliente
            </h3>
            <p className="text-sm" style={{ color: '#7b849b' }}>
              Processo completo de integracao de novos clientes
            </p>
          </div>
        </a>

        <a
          href="/onboarding-funcionario"
          className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up glass-card hover:border-[rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.12)]"
          style={{
            animationDelay: '150ms',
            animationFillMode: 'backwards',
          }}
        >
          <div
            className="absolute top-0 right-0 size-32 rounded-bl-full"
            style={{ background: 'linear-gradient(to bottom left, rgba(45, 212, 191, 0.1), transparent)' }}
          />
          <div className="relative">
            <div
              className="size-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: 'rgba(45, 212, 191, 0.15)' }}
            >
              <svg className="size-5" style={{ color: '#2dd4bf' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3
              className="font-semibold mb-1 transition-colors"
              style={{ color: '#eef0f4' }}
            >
              Onboarding de Funcionario
            </h3>
            <p className="text-sm" style={{ color: '#7b849b' }}>
              Guia de integracao para novos colaboradores
            </p>
          </div>
        </a>
      </section>

      {/* Departments */}
      <section className="mb-14" aria-labelledby="departments-heading">
        <h2
          id="departments-heading"
          className="text-2xl font-bold font-serif mb-6 animate-slide-up"
          style={{ color: '#eef0f4', textWrap: 'balance', animationDelay: '200ms', animationFillMode: 'backwards' }}
        >
          Departamentos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept, idx) => {
            const iconPath = deptIcons[dept.slug] || deptIcons.marketing;
            return (
              <a
                key={dept.slug}
                href={`/departamentos/${dept.slug}`}
                className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up glass-card hover:border-[rgba(212,168,83,0.4)] hover:shadow-[0_0_40px_-12px_rgba(212,168,83,0.15)]"
                style={{
                  animationDelay: `${250 + idx * 80}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <div
                  className="absolute top-0 right-0 size-24 rounded-bl-full"
                  style={{ background: 'linear-gradient(to bottom left, rgba(212, 168, 83, 0.08), transparent)' }}
                />
                <div className="relative">
                  <div
                    className="size-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'rgba(212, 168, 83, 0.12)' }}
                  >
                    <svg
                      className="size-5"
                      style={{ color: '#d4a853' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>
                  <h3
                    className="font-semibold mb-1 transition-colors group-hover:text-[#d4a853]"
                    style={{ color: '#eef0f4' }}
                  >
                    {dept.nome}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: '#7b849b' }}>
                    {dept.descricao}
                  </p>
                  {dept.lider && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs" style={{ color: '#7b849b' }}>Lider:</span>
                      <span className="text-xs" style={{ color: '#d4a853' }}>{dept.lider}</span>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Squads link */}
      <section
        className="animate-slide-up"
        style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}
      >
        <a
          href="/squads"
          className="group block rounded-xl p-6 transition-all duration-300 glass-card hover:border-[rgba(212,168,83,0.3)] hover:shadow-[0_0_40px_-12px_rgba(212,168,83,0.1)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="font-semibold mb-1 transition-colors group-hover:text-[#d4a853]"
                style={{ color: '#eef0f4' }}
              >
                Squads
              </h3>
              <p className="text-sm" style={{ color: '#7b849b' }}>
                Veja os squads multidisciplinares da Ludus Health
              </p>
            </div>
            <svg
              className="size-5 transition-all group-hover:translate-x-1"
              style={{ color: '#7b849b' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </section>
    </main>
  );
}
