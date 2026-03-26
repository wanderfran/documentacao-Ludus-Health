'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  departments: { nome: string; slug: string }[];
}

export default function Sidebar({ departments }: SidebarProps) {
  const pathname = usePathname();
  const [deptOpen, setDeptOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const isActivePrefix = (prefix: string) => pathname.startsWith(prefix);

  const linkClass = (href: string) =>
    cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
      isActive(href)
        ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary shadow-[inset_0_0_20px_-12px] shadow-primary/20'
        : 'text-sidebar-foreground hover:text-foreground hover:bg-muted/60'
    );

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-sidebar-border">
        <a
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 transition-transform duration-200 group-hover:scale-105">
            L
          </div>
          <div>
            <h1 className="text-foreground font-bold text-lg leading-tight font-serif">
              Ludus Health
            </h1>
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Documentacao Interna
            </p>
          </div>
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Navegacao principal">
        <ul className="flex flex-col gap-1">
          <li>
            <a href="/" className={linkClass('/')} onClick={() => setMobileOpen(false)}>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </a>
          </li>

          {/* Departamentos */}
          <li>
            <div className="mt-4 mb-1 px-3">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Departamentos
              </span>
            </div>
            <button
              onClick={() => setDeptOpen(!deptOpen)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActivePrefix('/departamentos')
                  ? 'text-primary'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-muted/60'
              )}
              aria-expanded={deptOpen}
            >
              <span className="flex items-center gap-3">
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Todos os Departamentos
              </span>
              <svg
                className={cn('size-3 transition-transform duration-200', deptOpen && 'rotate-90')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                deptOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <ul className="overflow-hidden ml-5 mt-1 border-l border-sidebar-border pl-3 flex flex-col gap-0.5">
                {departments.map((dept, i) => (
                  <li
                    key={dept.slug}
                    className="animate-slide-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <a
                      href={`/departamentos/${dept.slug}`}
                      className={linkClass(`/departamentos/${dept.slug}`)}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dept.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Section: Processos */}
          <li className="mt-4">
            <div className="mb-1 px-3">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Processos
              </span>
            </div>
          </li>

          <li>
            <a href="/onboarding-cliente" className={linkClass('/onboarding-cliente')} onClick={() => setMobileOpen(false)}>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Onboarding Cliente
            </a>
          </li>

          <li>
            <a href="/onboarding-funcionario" className={linkClass('/onboarding-funcionario')} onClick={() => setMobileOpen(false)}>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Onboarding Funcionario
            </a>
          </li>

          <li>
            <a href="/squads" className={linkClass('/squads')} onClick={() => setMobileOpen(false)}>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Squads
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center tracking-wide">
          Ludus Health &copy; 2025
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn(
          'fixed top-4 left-4 z-50 p-2.5 rounded-lg lg:hidden',
          'bg-card/90 backdrop-blur-md text-foreground border border-border',
          'transition-all duration-200 hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/70 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen w-64 z-40 flex flex-col',
          'bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border',
          'transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
