// ========== TYPES ==========

export interface Competencia {
  id: string;
  nome: string;
  eixo: "desempenho" | "potencial";
  ordem: number;
}

export interface FormacaoAcademica {
  graduacao: string;
  instituicao: string;
  posGraduacao?: string;
  instituicaoPg?: string;
}

export interface ExperienciaProfissional {
  cargo: string;
  empresa: string;
  periodo: string;
}

export interface AcaoPDI {
  id: string;
  competenciaId: string;
  conhecimento: string;
  habilidade: string;
  atitude: string;
  metodologia: string;
  indicadores: string;
  prazo: string;
  responsavel: string;
  status: "pendente" | "em_andamento" | "concluida";
}

export interface Lider {
  id: string;
  nome: string;
  area: string;
  idade: number;
  formacao: FormacaoAcademica;
  experiencia: ExperienciaProfissional[];
  avaliacoes: Record<string, number>;
  pdi: AcaoPDI[];
}

// ========== INITIAL DATA ==========

const COMPETENCIAS_INICIAIS: Competencia[] = [
  { id: "entrega-resultados", nome: "Entrega de Resultados (KPIs)", eixo: "desempenho", ordem: 1 },
  { id: "cultura-valores", nome: "Cultura e Valores Adimax", eixo: "potencial", ordem: 2 },
  { id: "gestao-pessoas", nome: "Gestão de Pessoas (Liderança)", eixo: "potencial", ordem: 3 },
  { id: "conhecimento-tecnico", nome: "Conhecimento Técnico", eixo: "desempenho", ordem: 4 },
];

const LIDERES_INICIAIS: Lider[] = [
  {
    id: "1", nome: "Camila Machado", area: "Gerência Industrial", idade: 35,
    formacao: { graduacao: "Engenharia de Produção", instituicao: "UFMG", posGraduacao: "MBA em Gestão Industrial", instituicaoPg: "FGV" },
    experiencia: [
      { cargo: "Gerente Industrial", empresa: "Adimax", periodo: "2019–atual" },
      { cargo: "Coordenadora de Produção", empresa: "Adimax", periodo: "2016–2019" },
      { cargo: "Analista de Processos", empresa: "Nestlé Purina", periodo: "2013–2016" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "2", nome: "Daniel Henrique", area: "Extrusora", idade: 32,
    formacao: { graduacao: "Engenharia Mecânica", instituicao: "UNESP", posGraduacao: "Especialização em Processos Industriais", instituicaoPg: "SENAI" },
    experiencia: [
      { cargo: "Supervisor de Extrusão", empresa: "Adimax", periodo: "2020–atual" },
      { cargo: "Operador Sênior de Extrusora", empresa: "Adimax", periodo: "2017–2020" },
      { cargo: "Técnico de Processos", empresa: "BRF", periodo: "2014–2017" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "3", nome: "Lucas Ferreira", area: "Extrusora", idade: 28,
    formacao: { graduacao: "Técnico em Mecânica", instituicao: "SENAI" },
    experiencia: [
      { cargo: "Líder de Turno – Extrusão", empresa: "Adimax", periodo: "2021–atual" },
      { cargo: "Operador de Extrusora", empresa: "Adimax", periodo: "2018–2021" },
      { cargo: "Auxiliar de Produção", empresa: "Mogiana Alimentos", periodo: "2016–2018" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "4", nome: "Marcos Vinícius", area: "Ensaque", idade: 40,
    formacao: { graduacao: "Administração de Empresas", instituicao: "PUC-Campinas", posGraduacao: "MBA em Gestão de Operações", instituicaoPg: "INSPER" },
    experiencia: [
      { cargo: "Coordenador de Ensaque", empresa: "Adimax", periodo: "2017–atual" },
      { cargo: "Supervisor de Embalagem", empresa: "Adimax", periodo: "2013–2017" },
      { cargo: "Analista de Logística", empresa: "M. Dias Branco", periodo: "2010–2013" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "5", nome: "Patrícia Souza", area: "Ensaque", idade: 33,
    formacao: { graduacao: "Engenharia Química", instituicao: "UNICAMP", posGraduacao: "Especialização em Embalagens", instituicaoPg: "CETEA/ITAL" },
    experiencia: [
      { cargo: "Líder de Ensaque", empresa: "Adimax", periodo: "2020–atual" },
      { cargo: "Analista de Qualidade de Embalagem", empresa: "Adimax", periodo: "2017–2020" },
      { cargo: "Estagiária de P&D", empresa: "Cargill", periodo: "2015–2017" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "6", nome: "Roberto Carlos", area: "Logística", idade: 45,
    formacao: { graduacao: "Logística", instituicao: "FATEC", posGraduacao: "MBA em Supply Chain Management", instituicaoPg: "FGV" },
    experiencia: [
      { cargo: "Gerente de Logística", empresa: "Adimax", periodo: "2015–atual" },
      { cargo: "Coordenador de Distribuição", empresa: "Adimax", periodo: "2010–2015" },
      { cargo: "Analista de Transportes", empresa: "JBS", periodo: "2005–2010" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "7", nome: "Fernanda Lima", area: "Logística", idade: 30,
    formacao: { graduacao: "Administração", instituicao: "Mackenzie" },
    experiencia: [
      { cargo: "Analista de Logística Sênior", empresa: "Adimax", periodo: "2021–atual" },
      { cargo: "Analista de Logística", empresa: "Adimax", periodo: "2019–2021" },
      { cargo: "Assistente Administrativo", empresa: "DHL", periodo: "2017–2019" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "8", nome: "João Pedro", area: "Qualidade", idade: 38,
    formacao: { graduacao: "Engenharia de Alimentos", instituicao: "UNESP", posGraduacao: "MBA em Gestão da Qualidade", instituicaoPg: "USP" },
    experiencia: [
      { cargo: "Coordenador de Qualidade", empresa: "Adimax", periodo: "2018–atual" },
      { cargo: "Analista de Qualidade Sênior", empresa: "Adimax", periodo: "2014–2018" },
      { cargo: "Analista de Controle de Qualidade", empresa: "Nestlé Purina", periodo: "2011–2014" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "9", nome: "Ana Carolina", area: "Qualidade", idade: 29,
    formacao: { graduacao: "Medicina Veterinária", instituicao: "UNESP", posGraduacao: "Especialização em Nutrição Animal", instituicaoPg: "UFLA" },
    experiencia: [
      { cargo: "Analista de Qualidade", empresa: "Adimax", periodo: "2021–atual" },
      { cargo: "Estagiária de Qualidade", empresa: "Adimax", periodo: "2019–2021" },
      { cargo: "Auxiliar Veterinária", empresa: "Clínica VetPet", periodo: "2018–2019" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "10", nome: "Ricardo Alves", area: "Manutenção", idade: 42,
    formacao: { graduacao: "Engenharia Elétrica", instituicao: "USP", posGraduacao: "Especialização em Manutenção Industrial", instituicaoPg: "ABRAMAN" },
    experiencia: [
      { cargo: "Gerente de Manutenção", empresa: "Adimax", periodo: "2016–atual" },
      { cargo: "Coordenador de Manutenção", empresa: "Adimax", periodo: "2012–2016" },
      { cargo: "Engenheiro de Manutenção", empresa: "Ambev", periodo: "2008–2012" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "11", nome: "Thiago Santos", area: "Manutenção", idade: 36,
    formacao: { graduacao: "Engenharia Mecânica", instituicao: "UNICAMP" },
    experiencia: [
      { cargo: "Supervisor de Manutenção Mecânica", empresa: "Adimax", periodo: "2019–atual" },
      { cargo: "Técnico de Manutenção Sênior", empresa: "Adimax", periodo: "2015–2019" },
      { cargo: "Técnico Mecânico", empresa: "WEG", periodo: "2012–2015" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "12", nome: "Juliana Costa", area: "PCP", idade: 31,
    formacao: { graduacao: "Engenharia de Produção", instituicao: "UFSCar", posGraduacao: "MBA em Planejamento e Controle da Produção", instituicaoPg: "EESC/USP" },
    experiencia: [
      { cargo: "Coordenadora de PCP", empresa: "Adimax", periodo: "2020–atual" },
      { cargo: "Analista de PCP", empresa: "Adimax", periodo: "2017–2020" },
      { cargo: "Analista de Planejamento", empresa: "Vigor", periodo: "2015–2017" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "13", nome: "Bruno Oliveira", area: "PCP", idade: 34,
    formacao: { graduacao: "Administração", instituicao: "FACAMP", posGraduacao: "Especialização em Lean Manufacturing", instituicaoPg: "SENAI" },
    experiencia: [
      { cargo: "Analista de PCP Sênior", empresa: "Adimax", periodo: "2019–atual" },
      { cargo: "Analista de PCP", empresa: "Adimax", periodo: "2016–2019" },
      { cargo: "Assistente de Produção", empresa: "Bauducco", periodo: "2013–2016" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "14", nome: "Carla Mendes", area: "Segurança do Trabalho", idade: 37,
    formacao: { graduacao: "Engenharia de Segurança do Trabalho", instituicao: "UNIP", posGraduacao: "Especialização em Higiene Ocupacional", instituicaoPg: "FUNDACENTRO" },
    experiencia: [
      { cargo: "Coordenadora de Segurança do Trabalho", empresa: "Adimax", periodo: "2017–atual" },
      { cargo: "Técnica de Segurança Sênior", empresa: "Adimax", periodo: "2013–2017" },
      { cargo: "Técnica de Segurança", empresa: "Raízen", periodo: "2010–2013" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "15", nome: "Eduardo Silva", area: "Gerência Industrial", idade: 44,
    formacao: { graduacao: "Engenharia de Produção", instituicao: "POLI/USP", posGraduacao: "MBA Executivo em Gestão Empresarial", instituicaoPg: "FGV" },
    experiencia: [
      { cargo: "Diretor Industrial", empresa: "Adimax", periodo: "2018–atual" },
      { cargo: "Gerente de Operações", empresa: "Adimax", periodo: "2013–2018" },
      { cargo: "Coordenador de Produção", empresa: "Mars Petcare", periodo: "2008–2013" },
    ],
    avaliacoes: {}, pdi: [],
  },
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

// ========== MIGRATION ==========

function migrateLideres(lideres: any[]): Lider[] {
  return lideres.map((l) => {
    if (typeof l.formacao === "string") {
      l.formacao = { graduacao: l.formacao, instituicao: "" };
    }
    if (typeof l.experiencia === "string") {
      l.experiencia = [{ cargo: l.experiencia, empresa: "", periodo: "" }];
    }
    if (!l.pdi) {
      l.pdi = [];
    }
    // Migrate old AcaoPDI format (single 'acao' field) to new mentoring model
    l.pdi = l.pdi.map((a: any) => {
      if ('acao' in a && !('conhecimento' in a)) {
        return {
          ...a,
          conhecimento: a.acao || "",
          habilidade: "",
          atitude: "",
          metodologia: "",
          indicadores: "",
        };
      }
      return a;
    });
    return l as Lider;
  });
}

// ========== PUBLIC API ==========

export function getCompetencias(): Competencia[] {
  return load(KEYS.competencias, COMPETENCIAS_INICIAIS);
}

export function saveCompetencias(c: Competencia[]) {
  save(KEYS.competencias, c);
}

export function getLideres(): Lider[] {
  const raw = load(KEYS.lideres, LIDERES_INICIAIS);
  const needsMigration = raw.some(
    (l: any) => typeof l.formacao === "string" || typeof l.experiencia === "string" || !l.pdi || l.pdi.some((a: any) => 'acao' in a && !('conhecimento' in a))
  );
  if (needsMigration) {
    const migrated = migrateLideres(raw);
    save(KEYS.lideres, migrated);
    return migrated;
  }
  return raw;
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

// ========== PDI ==========

export function getPDI(liderId: string): AcaoPDI[] {
  const lider = getLider(liderId);
  return lider?.pdi || [];
}

export function savePDI(liderId: string, acoes: AcaoPDI[]) {
  const lider = getLider(liderId);
  if (lider) {
    saveLider({ ...lider, pdi: acoes });
  }
}
