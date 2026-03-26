'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
  departments: { nome: string; slug: string }[];
}

export function LayoutWrapper({ children, departments }: LayoutWrapperProps) {
  const pathname = usePathname();

  // All pages are now full-width without sidebar
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">{children}</div>
    </main>
  );
}
