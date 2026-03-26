import Link from 'next/link';

interface DepartmentCardProps {
  nome: string;
  descricao: string;
  lider: string;
  slug: string;
  documentCount: number;
}

export function DepartmentCard({
  nome,
  descricao,
  lider,
  slug,
  documentCount,
}: DepartmentCardProps) {
  return (
    <Link
      href={`/departamentos/${slug}`}
      className="block bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{nome}</h3>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{descricao}</p>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {documentCount} {documentCount === 1 ? 'doc' : 'docs'}
        </span>
        <span className="text-sm text-gray-500">
          <span className="text-gray-400">Lider:</span> {lider}
        </span>
      </div>
    </Link>
  );
}
