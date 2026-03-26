interface PersonCardProps {
  nome: string;
  cargo: string;
  slug: string;
  departmentSlug: string;
  status: string;
  isLeader: boolean;
}

export default function PersonCard({ nome, cargo, slug, departmentSlug, status, isLeader }: PersonCardProps) {
  return (
    <a
      href={`/departamentos/${departmentSlug}/${slug}`}
      className={`group block rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
        isLeader
          ? 'bg-amber-50 border-amber-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
          isLeader
            ? 'bg-gradient-to-br from-amber-500 to-teal-500 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {nome.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-gray-900 font-semibold group-hover:text-amber-600 transition-colors truncate">
            {nome}
          </h3>
          <p className="text-gray-500 text-sm truncate">{cargo}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {isLeader && (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
            Lider
          </span>
        )}
        {status === 'ativo' ? (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Ativo
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            {status}
          </span>
        )}
      </div>
    </a>
  );
}
