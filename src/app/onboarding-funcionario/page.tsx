import { getOnboardingIndex } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';

const cargoIcons: Record<string, string> = {
  'social-media': 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  designer: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'editor-video': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  'gestor-trafego': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'customer-success': 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  sdr: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  'assistente-administrativo': 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
};

export default function OnboardingFuncionarioPage() {
  const data = getOnboardingIndex();

  if (!data) {
    return (
      <main className="pt-8 lg:pt-4">
        <h1 className="text-3xl font-bold font-serif mb-4 text-gray-900">
          Onboarding de Funcionario
        </h1>
        <p className="text-gray-600">Conteudo ainda nao disponivel.</p>
      </main>
    );
  }

  const contentHtml = markdownToHtml(data.content);

  return (
    <main className="pt-8 lg:pt-4">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6 animate-fade-in text-gray-500"
        aria-label="Breadcrumb"
      >
        <a href="/" className="transition-colors hover:text-gray-900">Inicio</a>
        <span>/</span>
        <span className="text-amber-600">Onboarding Funcionario</span>
      </nav>

      {/* Header */}
      <section
        className="mb-10 animate-slide-up"
        style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-2 text-gray-900">
          {data.titulo}
        </h1>
        <p className="text-lg text-gray-600">{data.descricao}</p>
      </section>

      {/* Role Selector */}
      <section
        className="mb-10"
        aria-labelledby="role-heading"
      >
        <h2
          id="role-heading"
          className="text-xl font-bold font-serif mb-4 animate-slide-up text-gray-900"
          style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
        >
          Selecione o cargo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.cargos.map((cargo, idx) => {
            const iconPath = cargoIcons[cargo.slug] || cargoIcons['social-media'];
            return (
              <a
                key={cargo.slug}
                href={`/onboarding-funcionario/${cargo.slug}`}
                className="group rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up bg-white border border-gray-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50"
                style={{
                  animationDelay: `${150 + idx * 70}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <div className="size-10 rounded-lg flex items-center justify-center mb-3 bg-amber-50">
                  <svg
                    className="size-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                  </svg>
                </div>
                <h3 className="font-semibold transition-colors group-hover:text-amber-600 text-gray-900">
                  {cargo.nome}
                </h3>
                <p className="text-sm mt-1 text-gray-500">
                  Ver guia de onboarding
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* General Content */}
      {contentHtml && (
        <section
          className="mt-8 pt-8 animate-fade-in border-t border-gray-200"
          style={{
            animationDelay: '400ms',
            animationFillMode: 'backwards',
          }}
        >
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}
    </main>
  );
}
