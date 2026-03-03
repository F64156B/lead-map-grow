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

export interface Usuario {
  email: string;
  nome: string;
  role: "admin" | "usuario";
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
  { id: "entrega-resultados", nome: "Entrega de Resultados (KPIs)", eixo: "desempenho", ordem: 1 },
  { id: "cultura-valores", nome: "Cultura e Valores Adimax", eixo: "potencial", ordem: 2 },
  { id: "gestao-pessoas", nome: "Gestão de Pessoas (Liderança)", eixo: "potencial", ordem: 3 },
  { id: "conhecimento-tecnico", nome: "Conhecimento Técnico", eixo: "desempenho", ordem: 4 },
];

export interface UsuarioCadastro {
  email: string;
  senha: string;
  nome: string;
  role: "admin" | "usuario";
}

const USUARIOS_INICIAIS: UsuarioCadastro[] = [
  { email: "pedro.souza@adimax.com.br", senha: "1234", nome: "Pedro Souza", role: "admin" },
];

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
  usuarioLogado: "adimax_usuario_logado",
  logMudancas: "adimax_log_mudancas",
  dataVersion: "adimax_data_version",
  usuarios: "adimax_usuarios",
};

const CURRENT_DATA_VERSION = "3";

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
    // Preservar usuários antes de limpar dados
    const usuariosBackup = localStorage.getItem(KEYS.usuarios);
    // Clear old data to force reload with real data
    localStorage.removeItem(KEYS.lideres);
    localStorage.removeItem(KEYS.competencias);
    localStorage.setItem(KEYS.dataVersion, CURRENT_DATA_VERSION);
    // Restaurar usuários preservados
    if (usuariosBackup) {
      localStorage.setItem(KEYS.usuarios, usuariosBackup);
      console.log("[store] Usuários preservados após migração de versão");
    }
  }
}

// Run migration check on load
checkDataVersion();

// ========== AUTH ==========

// ========== USER MANAGEMENT ==========

function getUsuariosCadastrados(): UsuarioCadastro[] {
  const usuarios = load(KEYS.usuarios, USUARIOS_INICIAIS);
  // Se não existe no localStorage, salvar imediatamente para garantir persistência
  if (!localStorage.getItem(KEYS.usuarios)) {
    save(KEYS.usuarios, usuarios);
    console.log("[store] Usuários iniciais salvos no localStorage:", usuarios.length);
  }
  return usuarios;
}

function saveUsuariosCadastrados(usuarios: UsuarioCadastro[]) {
  save(KEYS.usuarios, usuarios);
}

export function getUsuarios(): UsuarioCadastro[] {
  return getUsuariosCadastrados();
}

export function criarUsuario(dados: UsuarioCadastro): { ok: boolean; erro?: string } {
  const emailLimpo = dados.email.trim().toLowerCase();
  const nomeLimpo = dados.nome.trim();
  if (!emailLimpo || !nomeLimpo || !dados.senha) {
    return { ok: false, erro: "Preencha todos os campos." };
  }
  if (dados.senha.length < 4) {
    return { ok: false, erro: "A senha deve ter no mínimo 4 caracteres." };
  }
  const usuarios = getUsuariosCadastrados();
  if (usuarios.some(u => u.email === emailLimpo)) {
    return { ok: false, erro: "E-mail já cadastrado." };
  }
  usuarios.push({ ...dados, email: emailLimpo, nome: nomeLimpo });
  saveUsuariosCadastrados(usuarios);
  console.log("[store] Usuário criado:", emailLimpo, "| Total:", usuarios.length);
  return { ok: true };
}

export function atualizarUsuario(email: string, dados: Partial<UsuarioCadastro>): { ok: boolean; erro?: string } {
  const usuarios = getUsuariosCadastrados();
  const idx = usuarios.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx < 0) return { ok: false, erro: "Usuário não encontrado." };
  usuarios[idx] = { ...usuarios[idx], ...dados };
  saveUsuariosCadastrados(usuarios);
  return { ok: true };
}

export function resetarSenhaUsuario(email: string, novaSenha: string): { ok: boolean; erro?: string } {
  return atualizarUsuario(email, { senha: novaSenha });
}

export function excluirUsuario(email: string): { ok: boolean; erro?: string } {
  const usuarios = getUsuariosCadastrados();
  const filtered = usuarios.filter(u => u.email.toLowerCase() !== email.toLowerCase());
  if (filtered.length === usuarios.length) return { ok: false, erro: "Usuário não encontrado." };
  saveUsuariosCadastrados(filtered);
  return { ok: true };
}

// ========== AUTH ==========

export function login(email: string, senha: string): Usuario | null {
  const emailLimpo = email.trim().toLowerCase();
  const usuarios = getUsuariosCadastrados();
  console.log("[login] Tentando:", emailLimpo, "| Senha digitada:", senha);
  console.log("[login] Usuários cadastrados:", usuarios.map(u => ({ email: u.email, senha: u.senha, nome: u.nome })));
  const user = usuarios.find(
    (u) => u.email === emailLimpo && u.senha === senha
  );
  if (user) {
    console.log("[login] SUCESSO para:", emailLimpo);
    const usuario: Usuario = { email: user.email, nome: user.nome, role: user.role };
    save(KEYS.usuarioLogado, usuario);
    return usuario;
  }
  const match = usuarios.find(u => u.email === emailLimpo);
  if (match) {
    console.log("[login] Email encontrado mas senha errada. Esperada:", match.senha, "| Digitada:", senha);
  } else {
    console.log("[login] Email NÃO encontrado:", emailLimpo);
  }
  return null;
}

export function logout() {
  localStorage.removeItem(KEYS.usuarioLogado);
}

export function getUsuarioLogado(): Usuario | null {
  return load<Usuario | null>(KEYS.usuarioLogado, null);
}

// ========== AUDIT LOG ==========

export function registrarMudanca(
  tipo: LogMudanca["tipo"],
  liderId: string,
  liderNome: string,
  descricao: string
) {
  const usuario = getUsuarioLogado();
  const log: LogMudanca = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    usuario: usuario?.email || "desconhecido",
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
