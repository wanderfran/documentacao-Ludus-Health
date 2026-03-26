import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { getDepartments } from '@/lib/content';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ludus Health - Documentacao Interna',
  description:
    'Portal de documentacao interna da Ludus Health - Processos, departamentos e onboarding.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const departments = getDepartments().map((d) => ({
    nome: d.nome,
    slug: d.slug,
  }));

  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0f1c" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <Sidebar departments={departments} />

        <main className="lg:ml-64 min-h-screen">
          <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
