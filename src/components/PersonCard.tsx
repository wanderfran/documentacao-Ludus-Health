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
      className={`group block rounded-xl border p-5 transition-all duration-300 hover:shadow-xl ${
        isLeader
          ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20 hover:border-blue-400/40 hover:shadow-blue-500/10'
          : 'bg-slate-800/60 border-slate-700/50 hover:border-slate-500/50 hover:shadow-slate-500/5'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
          isLeader
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            : 'bg-slate-700 text-slate-300'
        }`}>
          {nome.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors truncate">
            {nome}
          </h3>
          <p className="text-slate-400 text-sm truncate">{cargo}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {isLeader && (
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
            Lider
          </span>
        )}
        {status === 'ativo' ? (
          <span className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Ativo
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
            {status}
          </span>
        )}
      </div>
    </a>
  );
}
