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
              'group block glass-card p-6 text-center min-w-[220px]',
              'border-primary/30 hover:border-primary/60',
              'transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
              'glow-gold',
              'animate-slide-up',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            {/* Avatar with gradient border */}
            <div className="relative mx-auto mb-3 size-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80" />
              <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                <span className="text-primary font-bold text-xl font-serif">
                  {leader.nome.charAt(0)}
                </span>
              </div>
            </div>
            <p className="text-foreground font-semibold font-serif text-lg group-hover:text-primary transition-colors duration-200" style={{ textWrap: 'balance' }}>
              {leader.nome}
            </p>
            <p className="text-primary/80 text-sm mt-1">{leader.cargo}</p>
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-primary/15 text-primary text-xs rounded-full font-medium border border-primary/20">
              <svg className="size-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Lider
            </span>
          </a>

          {/* Connector line from leader to members */}
          {members.length > 0 && (
            <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-secondary/40" />
          )}
        </>
      )}

      {/* Horizontal line connecting to members */}
      {members.length > 0 && (
        <>
          <div className="relative w-full flex justify-center">
            <div
              className="h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent absolute top-0"
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
                  'group relative block glass-card p-5 text-center min-w-[180px]',
                  'transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10',
                  'hover:border-secondary/40',
                  'animate-slide-up',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
                style={{ animationDelay: `${(idx + 1) * 80}ms` }}
              >
                {/* Vertical connector from horizontal line */}
                <div className="absolute -top-10 left-1/2 w-px h-10 bg-gradient-to-b from-secondary/40 to-border -translate-x-1/2" />

                {/* Avatar */}
                <div className="relative mx-auto mb-2 size-11">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted to-border" />
                  <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                    <span className="text-foreground font-semibold text-base">
                      {member.nome.charAt(0)}
                    </span>
                  </div>
                </div>

                <p className="text-foreground font-medium text-sm group-hover:text-secondary transition-colors duration-200">
                  {member.nome}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">{member.cargo}</p>

                {/* Status */}
                <div className="mt-3">
                  {member.status === 'ativo' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-secondary">
                      <span className="size-1.5 bg-secondary rounded-full" />
                      Ativo
                    </span>
                  ) : member.status === 'vaga' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/15 text-amber-400 text-xs rounded-full border border-amber-500/20">
                      Vaga
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
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
