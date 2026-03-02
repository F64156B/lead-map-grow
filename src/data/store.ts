// ========== TYPES ==========

export interface Competencia {
  id: string;
  nome: string;
  eixo: "desempenho" | "potencial";
  ordem: number;
}

export interface Lider {
  id: string;
  nome: string;
  area: string;
  idade: number;
  formacao: string;
  experiencia: string;
  avaliacoes: Record<string, number>; // competencia.id → nota 1-3
}

// ========== INITIAL DATA ==========

const COMPETENCIAS_INICIAIS: Competencia[] = [
  { id: "entrega-resultados", nome: "Entrega de Resultados (KPIs)", eixo: "desempenho", ordem: 1 },
  { id: "cultura-valores", nome: "Cultura e Valores Adimax", eixo: "potencial", ordem: 2 },
  { id: "gestao-pessoas", nome: "Gestão de Pessoas (Liderança)", eixo: "potencial", ordem: 3 },
];

const LIDERES_INICIAIS: Lider[] = [
  { id: "1", nome: "Camila Machado", area: "Gerência Industrial", idade: 35, formacao: "Engenharia de Produção", experiencia: "10 anos", avaliacoes: {} },
  { id: "2", nome: "Daniel Henrique", area: "Extrusora", idade: 32, formacao: "Engenharia Mecânica", experiencia: "8 anos", avaliacoes: {} },
  { id: "3", nome: "Lucas Ferreira", area: "Extrusora", idade: 28, formacao: "Técnico em Mecânica", experiencia: "5 anos", avaliacoes: {} },
  { id: "4", nome: "Marcos Vinícius", area: "Ensaque", idade: 40, formacao: "Administração", experiencia: "12 anos", avaliacoes: {} },
  { id: "5", nome: "Patrícia Souza", area: "Ensaque", idade: 33, formacao: "Engenharia Química", experiencia: "7 anos", avaliacoes: {} },
  { id: "6", nome: "Roberto Carlos", area: "Logística", idade: 45, formacao: "Logística", experiencia: "15 anos", avaliacoes: {} },
  { id: "7", nome: "Fernanda Lima", area: "Logística", idade: 30, formacao: "Administração", experiencia: "6 anos", avaliacoes: {} },
  { id: "8", nome: "João Pedro", area: "Qualidade", idade: 38, formacao: "Engenharia de Alimentos", experiencia: "10 anos", avaliacoes: {} },
  { id: "9", nome: "Ana Carolina", area: "Qualidade", idade: 29, formacao: "Veterinária", experiencia: "4 anos", avaliacoes: {} },
  { id: "10", nome: "Ricardo Alves", area: "Manutenção", idade: 42, formacao: "Engenharia Elétrica", experiencia: "14 anos", avaliacoes: {} },
  { id: "11", nome: "Thiago Santos", area: "Manutenção", idade: 36, formacao: "Engenharia Mecânica", experiencia: "9 anos", avaliacoes: {} },
  { id: "12", nome: "Juliana Costa", area: "PCP", idade: 31, formacao: "Engenharia de Produção", experiencia: "6 anos", avaliacoes: {} },
  { id: "13", nome: "Bruno Oliveira", area: "PCP", idade: 34, formacao: "Administração", experiencia: "8 anos", avaliacoes: {} },
  { id: "14", nome: "Carla Mendes", area: "Segurança do Trabalho", idade: 37, formacao: "Engenharia de Segurança", experiencia: "11 anos", avaliacoes: {} },
  { id: "15", nome: "Eduardo Silva", area: "Gerência Industrial", idade: 44, formacao: "Engenharia de Produção", experiencia: "16 anos", avaliacoes: {} },
];

// ========== STORAGE HELPERS ==========

const KEYS = {
  competencias: "adimax_competencias",
  lideres: "adimax_lideres",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ========== PUBLIC API ==========

export function getCompetencias(): Competencia[] {
  return load(KEYS.competencias, COMPETENCIAS_INICIAIS);
}

export function saveCompetencias(c: Competencia[]) {
  save(KEYS.competencias, c);
}

export function getLideres(): Lider[] {
  return load(KEYS.lideres, LIDERES_INICIAIS);
}

export function saveLideres(l: Lider[]) {
  save(KEYS.lideres, l);
}

export function getLider(id: string): Lider | undefined {
  return getLideres().find((l) => l.id === id);
}

export function saveLider(lider: Lider) {
  const all = getLideres();
  const idx = all.findIndex((l) => l.id === lider.id);
  if (idx >= 0) all[idx] = lider;
  saveLideres(all);
}

export function isLiderAvaliado(lider: Lider, competencias: Competencia[]): boolean {
  if (competencias.length === 0) return false;
  return competencias.every((c) => lider.avaliacoes[c.id] !== undefined);
}

export function calcMedia(lider: Lider, competencias: Competencia[], eixo: "desempenho" | "potencial"): number {
  const relevant = competencias.filter((c) => c.eixo === eixo);
  if (relevant.length === 0) return 0;
  const sum = relevant.reduce((acc, c) => acc + (lider.avaliacoes[c.id] || 0), 0);
  return sum / relevant.length;
}

export function getAreas(lideres: Lider[]): string[] {
  return [...new Set(lideres.map((l) => l.area))].sort();
}

// Area color mapping
const AREA_COLORS: Record<string, string> = {
  "Gerência Industrial": "#F28C00",
  "Extrusora": "#2563EB",
  "Ensaque": "#16A34A",
  "Logística": "#9333EA",
  "Qualidade": "#DC2626",
  "Manutenção": "#CA8A04",
  "PCP": "#0891B2",
  "Segurança do Trabalho": "#6D28D9",
};

export function getAreaColor(area: string): string {
  return AREA_COLORS[area] || "#6B7280";
}
