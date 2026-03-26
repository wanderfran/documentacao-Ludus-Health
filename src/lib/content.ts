import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface Department {
  nome: string;
  descricao: string;
  lider: string;
  slug: string;
  content: string;
}

export interface Person {
  nome: string;
  cargo: string;
  departamento: string;
  slug: string;
  status: string;
  lider: boolean;
  content: string;
}

export interface OnboardingStep {
  titulo: string;
  descricao: string;
  content: string;
}

export interface OnboardingRole {
  titulo: string;
  cargo: string;
  slug: string;
  departamento: string;
  duracao: string;
  content: string;
}

export interface OnboardingIndex {
  titulo: string;
  descricao: string;
  cargos: { nome: string; slug: string }[];
  content: string;
}

export interface Squad {
  nome: string;
  slug: string;
  descricao: string;
  membros: { nome: string; cargo: string }[];
  lider: string;
  content: string;
}

function readMarkdownFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { data, content };
}

// ---- DEPARTMENTS ----

export function getDepartments(): Department[] {
  const deptDir = path.join(contentDir, 'departamentos');
  if (!fs.existsSync(deptDir)) return [];

  const slugs = fs.readdirSync(deptDir).filter((name) => {
    const fullPath = path.join(deptDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  return slugs.map((slug) => {
    const filePath = path.join(deptDir, slug, '_departamento.md');
    if (!fs.existsSync(filePath)) {
      return {
        nome: slug,
        descricao: '',
        lider: '',
        slug,
        content: '',
      };
    }
    const { data, content } = readMarkdownFile(filePath);
    return {
      nome: (data.nome as string) || slug,
      descricao: (data.descricao as string) || '',
      lider: (data.lider as string) || '',
      slug: (data.slug as string) || slug,
      content,
    };
  });
}

export function getDepartmentBySlug(slug: string): Department | null {
  const filePath = path.join(contentDir, 'departamentos', slug, '_departamento.md');
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdownFile(filePath);
  return {
    nome: (data.nome as string) || slug,
    descricao: (data.descricao as string) || '',
    lider: (data.lider as string) || '',
    slug: (data.slug as string) || slug,
    content,
  };
}

export interface DepartmentStats {
  documentCount: number;
}

export interface DepartmentWithStats extends Department, DepartmentStats {}

export function getDepartmentStats(deptSlug: string): DepartmentStats {
  const deptDir = path.join(contentDir, 'departamentos', deptSlug);
  if (!fs.existsSync(deptDir)) return { documentCount: 0 };

  const files = fs.readdirSync(deptDir).filter(
    (name) => name.endsWith('.md') && !name.startsWith('_')
  );

  return { documentCount: files.length };
}

export function getDepartmentsWithStats(): DepartmentWithStats[] {
  const departments = getDepartments();
  return departments.map((dept) => ({
    ...dept,
    ...getDepartmentStats(dept.slug),
  }));
}

// ---- PEOPLE ----

export function getPeopleByDepartment(deptSlug: string): Person[] {
  const deptDir = path.join(contentDir, 'departamentos', deptSlug);
  if (!fs.existsSync(deptDir)) return [];

  const files = fs.readdirSync(deptDir).filter(
    (name) => name.endsWith('.md') && !name.startsWith('_')
  );

  return files.map((file) => {
    const filePath = path.join(deptDir, file);
    const { data, content } = readMarkdownFile(filePath);
    return {
      nome: (data.nome as string) || file.replace('.md', ''),
      cargo: (data.cargo as string) || '',
      departamento: (data.departamento as string) || deptSlug,
      slug: (data.slug as string) || file.replace('.md', ''),
      status: (data.status as string) || 'ativo',
      lider: (data.lider as boolean) || false,
      content,
    };
  });
}

export function getPersonBySlug(deptSlug: string, personSlug: string): Person | null {
  const deptDir = path.join(contentDir, 'departamentos', deptSlug);
  if (!fs.existsSync(deptDir)) return null;

  const filePath = path.join(deptDir, `${personSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdownFile(filePath);
  return {
    nome: (data.nome as string) || personSlug,
    cargo: (data.cargo as string) || '',
    departamento: (data.departamento as string) || deptSlug,
    slug: (data.slug as string) || personSlug,
    status: (data.status as string) || 'ativo',
    lider: (data.lider as boolean) || false,
    content,
  };
}

// ---- ONBOARDING CLIENTE ----

export function getOnboardingSteps(): OnboardingStep | null {
  const filePath = path.join(contentDir, 'onboarding-cliente', 'etapas.md');
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdownFile(filePath);
  return {
    titulo: (data.titulo as string) || 'Onboarding de Cliente',
    descricao: (data.descricao as string) || '',
    content,
  };
}

// ---- ONBOARDING FUNCIONARIO ----

export function getOnboardingIndex(): OnboardingIndex | null {
  const filePath = path.join(contentDir, 'onboarding-funcionario', '_index.md');
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdownFile(filePath);
  return {
    titulo: (data.titulo as string) || 'Onboarding de Funcionário',
    descricao: (data.descricao as string) || '',
    cargos: (data.cargos as { nome: string; slug: string }[]) || [],
    content,
  };
}

export function getOnboardingByRole(slug: string): OnboardingRole | null {
  const filePath = path.join(contentDir, 'onboarding-funcionario', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdownFile(filePath);
  return {
    titulo: (data.titulo as string) || '',
    cargo: (data.cargo as string) || '',
    slug: (data.slug as string) || slug,
    departamento: (data.departamento as string) || '',
    duracao: (data.duracao as string) || '',
    content,
  };
}

// ---- SQUADS ----

export function getSquads(): Squad[] {
  const squadsDir = path.join(contentDir, 'squads');
  if (!fs.existsSync(squadsDir)) return [];

  const files = fs.readdirSync(squadsDir).filter((name) => name.endsWith('.md') && !name.startsWith('_'));

  return files.map((file) => {
    const filePath = path.join(squadsDir, file);
    const { data, content } = readMarkdownFile(filePath);
    return {
      nome: (data.nome as string) || file.replace('.md', ''),
      slug: (data.slug as string) || file.replace('.md', ''),
      descricao: (data.descricao as string) || '',
      membros: (data.membros as { nome: string; cargo: string }[]) || [],
      lider: (data.lider as string) || '',
      content,
    };
  });
}

export function getSquadBySlug(slug: string): Squad | null {
  const squadsDir = path.join(contentDir, 'squads');
  if (!fs.existsSync(squadsDir)) return null;

  const files = fs.readdirSync(squadsDir).filter((name) => name.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(squadsDir, file);
    const { data, content } = readMarkdownFile(filePath);
    if ((data.slug as string) === slug || file.replace('.md', '') === slug) {
      return {
        nome: (data.nome as string) || file.replace('.md', ''),
        slug: (data.slug as string) || file.replace('.md', ''),
        descricao: (data.descricao as string) || '',
        membros: (data.membros as { nome: string; cargo: string }[]) || [],
        lider: (data.lider as string) || '',
        content,
      };
    }
  }

  return null;
}
