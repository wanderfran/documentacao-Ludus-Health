import type { Person } from '@/lib/content';
import { cn } from '@/lib/utils';

interface HierarchyTreeProps {
  leader: Person | null;
  members: Person[];
  departmentSlug: string;
}

export default function HierarchyTree({ leader, members, departmentSlug }: HierarchyTreeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Leader */}
      {leader && (
        <>
          <a
            href={`/departamentos/${departmentSlug}/${leader.slug}`}
            className={cn(
              'group block bg-white rounded-xl border border-amber-200 p-6 text-center min-w-[220px]',
              'transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-100 hover:border-amber-300',
              'animate-slide-up',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500'
            )}
          >
            {/* Avatar with gradient border */}
            <div className="relative mx-auto mb-3 size-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-teal-500" />
              <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                <span className="text-amber-600 font-bold text-xl font-serif">
                  {leader.nome.charAt(0)}
                </span>
              </div>
            </div>
            <p className="text-gray-900 font-semibold font-serif text-lg group-hover:text-amber-600 transition-colors duration-200">
              {leader.nome}
            </p>
            <p className="text-amber-600 text-sm mt-1">{leader.cargo}</p>
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium border border-amber-200">
              <svg className="size-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Lider
            </span>
          </a>

          {/* Connector line from leader to members */}
          {members.length > 0 && (
            <div className="w-px h-10 bg-gradient-to-b from-amber-400 to-teal-400" />
          )}
        </>
      )}

      {/* Horizontal line connecting to members */}
      {members.length > 0 && (
        <>
          <div className="relative w-full flex justify-center">
            <div
              className="h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent absolute top-0"
              style={{
                width: members.length > 1 ? `${Math.min(members.length * 200, 800)}px` : '0px',
                maxWidth: '100%',
              }}
            />
          </div>

          {/* Members */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            {members.map((member, idx) => (
              <a
                key={member.slug}
                href={`/departamentos/${departmentSlug}/${member.slug}`}
                className={cn(
                  'group relative block bg-white rounded-xl border border-gray-200 p-5 text-center min-w-[180px]',
                  'transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100',
                  'hover:border-teal-300',
                  'animate-slide-up',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500'
                )}
                style={{ animationDelay: `${(idx + 1) * 80}ms` }}
              >
                {/* Vertical connector from horizontal line */}
                <div className="absolute -top-10 left-1/2 w-px h-10 bg-gradient-to-b from-teal-300 to-gray-200 -translate-x-1/2" />

                {/* Avatar */}
                <div className="relative mx-auto mb-2 size-11">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-base">
                      {member.nome.charAt(0)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-900 font-medium text-sm group-hover:text-teal-600 transition-colors duration-200">
                  {member.nome}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{member.cargo}</p>

                {/* Status */}
                <div className="mt-3">
                  {member.status === 'ativo' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-teal-600">
                      <span className="size-1.5 bg-teal-500 rounded-full" />
                      Ativo
                    </span>
                  ) : member.status === 'vaga' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full border border-amber-200">
                      Vaga
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {member.status}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
