import Link from 'next/link';
import { getDepartmentsWithStats } from '@/lib/content';
import { DepartmentCard } from '@/components/DepartmentCard';

export default function HomePage() {
  const departments = getDepartmentsWithStats();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              L
            </div>
            <span className="font-serif text-xl font-bold text-gray-900">
              Ludus Health
            </span>
          </Link>
          <span className="text-sm text-gray-500 hidden sm:block">
            Documentacao Interna
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Central de Documentacao
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Processos, procedimentos e documentacao interna da Ludus Health.
            Encontre tudo sobre departamentos, squads e onboarding.
          </p>
        </section>

        {/* Department Cards */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 animate-slide-up">
            Departamentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={dept.slug}
                className="animate-slide-up"
                style={{
                  animationDelay: `${100 + idx * 50}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <DepartmentCard
                  nome={dept.nome}
                  descricao={dept.descricao}
                  lider={dept.lider}
                  slug={dept.slug}
                  documentCount={dept.documentCount}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section
          className="border-t border-gray-100 pt-16 animate-slide-up"
          style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
        >
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-8">
            Recursos Adicionais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Onboarding Cliente */}
            <Link
              href="/onboarding-cliente"
              className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                Onboarding de Cliente
              </h3>
              <p className="text-sm text-gray-600">
                Processo de integracao de novos clientes
              </p>
            </Link>

            {/* Onboarding Funcionario */}
            <Link
              href="/onboarding-funcionario"
              className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="size-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                Onboarding de Funcionario
              </h3>
              <p className="text-sm text-gray-600">
                Guia para novos colaboradores
              </p>
            </Link>

            {/* Squads */}
            <Link
              href="/squads"
              className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                Squads
              </h3>
              <p className="text-sm text-gray-600">Times multidisciplinares</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 mt-20">
        <p className="text-center text-sm text-gray-500">
          Ludus Health &copy; 2025
        </p>
      </footer>
    </div>
  );
}
