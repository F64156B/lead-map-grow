// ========== TYPES ==========

export interface Competencia {
  id: string;
  nome: string;
  eixo: "desempenho" | "comportamento";
  ordem: number;
  descricao?: string;
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

export interface Usuario {
  email: string;
  nome: string;
  role: "admin" | "usuario";
  id?: string;
}

export interface LogMudanca {
  id: string;
  timestamp: string;
  usuario: string;
  tipo: "calibracao" | "pdi" | "reset";
  liderId: string;
  liderNome: string;
  descricao: string;
}

// ========== INITIAL DATA ==========

const COMPETENCIAS_INICIAIS: Competencia[] = [
  { id: "cultura-qualidade", nome: "Cultura de Qualidade e Boas Práticas", eixo: "desempenho", ordem: 1, descricao: "Aplicação prática e respeito rigoroso aos preceitos de Qualidade (Sistema de Gestão) e disseminação do 5S e BPF (Boas Práticas de Fabricação)." },
  { id: "seguranca-ma-saude", nome: "Segurança, Meio Ambiente e Saúde (SMA)", eixo: "desempenho", ordem: 2, descricao: "Domínio, cumprimento e fiscalização diária dos Procedimentos de SMA, garantindo uma operação com zero acidentes." },
  { id: "dominio-tecnico", nome: "Domínio Técnico e Operacional", eixo: "desempenho", ordem: 3, descricao: "Domínio técnico do Conhecimento do Processo Produtivo e amplo entendimento do Portfólio de Produtos." },
  { id: "visao-sistemica", nome: "Visão Sistêmica e Solução de Problemas", eixo: "desempenho", ordem: 4, descricao: "Conhecimento sobre os Setores de Apoio (sabendo como interagir) e atuação analítica e propositiva na Resolução de Problemas." },
  { id: "excelencia-rotina", nome: "Excelência na Gestão de Rotina", eixo: "desempenho", ordem: 5, descricao: "Condução adequada da Gestão de Rotina (ex: troca de turno), aplicação da Gestão de Tempo e cumprimento da Rotina da Liderança." },
  { id: "admin-pessoal", nome: "Administração de Pessoal e Conformidade", eixo: "desempenho", ordem: 6, descricao: "Execução correta dos Processos de Gestão de Pessoas (férias, ponto) e atenção à Legislação Trabalhista (ex: regras de equiparação salarial)." },
  { id: "atracao-talentos", nome: "Atração e Integração de Talentos", eixo: "desempenho", ordem: 7, descricao: "Avaliação de currículos durante o Recrutamento e Seleção e condução de um Onboarding (Interno) estruturado para mudanças de cargo." },
  { id: "desenvolvimento-equipe", nome: "Desenvolvimento e Performance da Equipe", eixo: "desempenho", ordem: 8, descricao: "Realização de Assessment do Time, uso da Matriz de Habilidade e Versatilidade, orientação sobre Trilha de Carreira e aplicação de Técnicas de Feedback." },
  { id: "inteligencia-relacional", nome: "Inteligência Relacional e Comunicação", eixo: "comportamento", ordem: 9, descricao: "Utilização de Comunicação Assertiva e Não Violenta, criação de Conexão com o Time (empatia) e atuação neutra na Gestão de Conflitos." },
  { id: "clima-engajamento", nome: "Gestão de Clima, Engajamento e Diversidade", eixo: "comportamento", ordem: 10, descricao: "Impulso ao Engajamento (utilizando o programa Alegra) e promoção da Diversidade, ensinando a equipe a lidar com as diferenças com respeito." },
  { id: "autogestao-emocional", nome: "Autogestão e Maturidade Emocional", eixo: "comportamento", ordem: 11, descricao: "Demonstração de Autoconhecimento (reconhecendo limites e fortalezas) e manutenção da Inteligência Emocional em situações de alto estresse." },
  { id: "alinhamento-cultural", nome: "Alinhamento Cultural Adimax", eixo: "comportamento", ordem: 12, descricao: "Atuação pautada pela Ética, Transparência e Gestão por Princípio, demonstração de Senso de Dono (Accountability) e Orgulho de Pertencer." },
];

export interface UsuarioCadastro {
  email: string;
  senha: string;
  nome: string;
  role: "admin" | "usuario";
}

const LIDERES_INICIAIS: Lider[] = [
  {
    id: "1", nome: "Camila Machado Fragoso", area: "Gerência Industrial", idade: 33,
    formacao: { graduacao: "Engenharia de Produção / Medicina Veterinária", instituicao: "", posGraduacao: "Especialização em Relações Sindicais e Trabalhistas", instituicaoPg: "" },
    experiencia: [
      { cargo: "Head Industrial I", empresa: "Adimax", periodo: "" },
      { cargo: "Gerente Industrial", empresa: "Adimax", periodo: "" },
      { cargo: "Supervisor de Produção", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "2", nome: "Daniel Henrique Alves de Amorim", area: "Extrusora", idade: 27,
    formacao: { graduacao: "Gestão de Produção Industrial (incompleto)", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção III", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção II", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "3", nome: "Ednilson Luiz Barbosa", area: "Logística Expedição", idade: 38,
    formacao: { graduacao: "Tecnologia em Logística", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Logística I", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Logística", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Máquina", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "4", nome: "Eduardo Vitor da Costa", area: "Manutenção Elétrica", idade: 29,
    formacao: { graduacao: "Técnico em Eletromecânica", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Manutenção Elétrica II", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Manutenção Elétrica I", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Manutenção I", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "5", nome: "Ernesto do Nascimento Junior", area: "Administrativo Produção", idade: 48,
    formacao: { graduacao: "Engenharia de Produção", instituicao: "", posGraduacao: "Técnico em Química Industrial", instituicaoPg: "" },
    experiencia: [
      { cargo: "Supervisor de Produção", empresa: "Adimax", periodo: "" },
      { cargo: "Gerente Industrial", empresa: "", periodo: "" },
      { cargo: "Gerente de Produção", empresa: "", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "6", nome: "Francinaldo Roseno de Carvalho", area: "Administrativo Produção", idade: 32,
    formacao: { graduacao: "Tecnólogo em Gestão da Qualidade", instituicao: "" },
    experiencia: [
      { cargo: "Coordenador de Produção", empresa: "Adimax", periodo: "" },
      { cargo: "Analista de Processos Industriais", empresa: "Adimax", periodo: "" },
      { cargo: "Supervisor de Produção", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "7", nome: "Guilherme Augusto Soares dos Reis", area: "Ensaque", idade: 30,
    formacao: { graduacao: "Tecnólogo em Processos Químicos", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Assistente de Qualidade Sênior", empresa: "Adimax", periodo: "" },
      { cargo: "Assistente de Qualidade Pleno", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "8", nome: "Luiz Carlos Rabelo Vinhal", area: "Ensaque", idade: 30,
    formacao: { graduacao: "Administração", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Máquina", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "9", nome: "Manacés da Fonseca Fonseca", area: "Extrusora", idade: 44,
    formacao: { graduacao: "Biomedicina", instituicao: "" },
    experiencia: [
      { cargo: "Analista de Produção", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção", empresa: "Adimax", periodo: "" },
      { cargo: "Monitor de Produção", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "10", nome: "Mariana Matos Batista", area: "Ensaque", idade: 22,
    formacao: { graduacao: "Ensino Médio Completo", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Máquina", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "11", nome: "Natanna Bianca Alves Oliveira", area: "Gestão de Qualidade", idade: 33,
    formacao: { graduacao: "Medicina Veterinária", instituicao: "", posGraduacao: "Pós-Graduação em Defesa Sanitária e Inspeção de Produtos de Origem Animal", instituicaoPg: "" },
    experiencia: [
      { cargo: "Coordenador de Qualidade", empresa: "Adimax", periodo: "" },
      { cargo: "Analista da Garantia da Qualidade Pleno", empresa: "Adimax", periodo: "" },
      { cargo: "Médico Veterinário", empresa: "", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "12", nome: "Paulo Cezar Gonçalves de Oliveira", area: "Administrativo", idade: 46,
    formacao: { graduacao: "Administração", instituicao: "" },
    experiencia: [
      { cargo: "Coordenador Administrativo", empresa: "Adimax", periodo: "" },
      { cargo: "Gestor de Compras", empresa: "Adimax", periodo: "" },
      { cargo: "Gestor Logístico", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "13", nome: "Tatiana Cândida da Silva Amorim", area: "Formulação", idade: 40,
    formacao: { graduacao: "Tecnologia em Gestão da Produção Industrial", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção II", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Líder de Produção", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "14", nome: "Thaian da Silva Alves", area: "SMA", idade: 37,
    formacao: { graduacao: "Engenharia Ambiental e Sanitária", instituicao: "", posGraduacao: "Engenharia de Segurança do Trabalho / Técnico em Segurança do Trabalho", instituicaoPg: "" },
    experiencia: [
      { cargo: "Supervisor de SSMA", empresa: "Adimax", periodo: "" },
      { cargo: "Supervisor de Segurança do Trabalho", empresa: "Adimax", periodo: "" },
      { cargo: "Técnico em Segurança do Trabalho e Meio Ambiente", empresa: "", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
  {
    id: "15", nome: "Wellington Rodrigues de Morais Myto", area: "Extrusora", idade: 36,
    formacao: { graduacao: "Ensino Médio Completo", instituicao: "" },
    experiencia: [
      { cargo: "Líder de Produção I", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Produção II", empresa: "Adimax", periodo: "" },
      { cargo: "Operador de Produção I", empresa: "Adimax", periodo: "" },
    ],
    avaliacoes: {}, pdi: [],
  },
];

// ========== STORAGE HELPERS ==========

const KEYS = {
  competencias: "adimax_competencias",
  lideres: "adimax_lideres",
  logMudancas: "adimax_log_mudancas",
  dataVersion: "adimax_data_version",
};

const CURRENT_DATA_VERSION = "5";

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

function checkDataVersion() {
  const storedVersion = localStorage.getItem(KEYS.dataVersion);
  if (storedVersion !== CURRENT_DATA_VERSION) {
    localStorage.removeItem(KEYS.lideres);
    localStorage.removeItem(KEYS.competencias);
    localStorage.setItem(KEYS.dataVersion, CURRENT_DATA_VERSION);
  }
}

// Run migration check on load
checkDataVersion();

// ========== AUDIT LOG ==========

export function registrarMudanca(
  tipo: LogMudanca["tipo"],
  liderId: string,
  liderNome: string,
  descricao: string,
  usuarioEmail?: string
) {
  const email = usuarioEmail || "desconhecido";
  const log: LogMudanca = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    usuario: email,
    tipo,
    liderId,
    liderNome,
    descricao,
  };
  const logs = getLogMudancas();
  logs.unshift(log);
  save(KEYS.logMudancas, logs);
}

export function getLogMudancas(): LogMudanca[] {
  return load<LogMudanca[]>(KEYS.logMudancas, []);
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

export function resetCalibracaoLider(liderId: string) {
  const lider = getLider(liderId);
  if (lider) {
    const liderAtualizado = { ...lider, avaliacoes: {} };
    saveLider(liderAtualizado);
    registrarMudanca("reset", lider.id, lider.nome, "Calibração resetada — todas as avaliações foram limpas.");
  }
}

export function isLiderAvaliado(lider: Lider, competencias: Competencia[]): boolean {
  if (competencias.length === 0) return false;
  return competencias.every((c) => lider.avaliacoes[c.id] !== undefined);
}

export function calcMedia(lider: Lider, competencias: Competencia[], eixo: "desempenho" | "comportamento"): number {
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
  "Logística Expedição": "#9333EA",
  "Manutenção Elétrica": "#CA8A04",
  "Administrativo Produção": "#0891B2",
  "Gestão de Qualidade": "#DC2626",
  "Administrativo": "#6D28D9",
  "Formulação": "#DB2777",
  "SMA": "#059669",
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
