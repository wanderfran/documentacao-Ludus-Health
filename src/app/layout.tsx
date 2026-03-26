import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { getDepartments } from '@/lib/content';

const midcentDisco = localFont({
  src: '../../public/fonts/MidcentDisco-Regular.ttf',
  variable: '--font-sans',
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
    <html lang="pt-BR" className={midcentDisco.variable}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <LayoutWrapper departments={departments}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
