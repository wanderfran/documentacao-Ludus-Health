'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  departments: { nome: string; slug: string }[];
}

export function LayoutWrapper({ children, departments }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar departments={departments} />
      <main className="lg:ml-64 min-h-screen">
        <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">{children}</div>
      </main>
    </>
  );
}
