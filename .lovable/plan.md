

# Login, Reset de Calibracao e Dados Reais da Planilha

## Visao Geral

Tres grandes mudancas:

1. **Tela de Login** com autenticacao local (pedro.souza@adimax.com.br / 1234) e registro de mudancas
2. **Reset de calibracao** — permitir limpar a avaliacao de um lider ja calibrado
3. **Substituir os 15 lideres** pelos dados reais da planilha Gestao GO

---

## 1. Sistema de Login e Registro de Mudancas

### Modelo de dados (`src/data/store.ts`)

Novos tipos e funcoes:

```text
Usuario {
  email: string
  senha: string (hash simples)
  nome: string
  role: "admin" | "usuario"
}

LogMudanca {
  id: string
  timestamp: string (ISO)
  usuario: string (email)
  tipo: "calibracao" | "pdi" | "reset"
  liderId: string
  liderNome: string
  descricao: string
}
```

- Usuario padrao: Pedro Souza (pedro.souza@adimax.com.br, senha 1234, role admin)
- Funcoes: `login()`, `logout()`, `getUsuarioLogado()`, `registrarMudanca()`, `getLogMudancas()`
- Dados persistidos no localStorage

### Nova pagina: Login (`src/pages/Login.tsx`)

- Formulario com email e senha
- Redireciona para "/" apos login
- Exibe erro se credenciais invalidas

### Protecao de rotas (`src/App.tsx`)

- Componente `ProtectedRoute` que verifica se ha usuario logado
- Se nao logado, redireciona para `/login`
- Botao de logout no header (`Layout.tsx`)

### Registro automatico de mudancas

- Ao salvar calibracao: registra log com competencias e notas
- Ao salvar PDI: registra log
- Ao resetar calibracao: registra log

---

## 2. Reset de Calibracao

### Na pagina de Calibracao (`src/pages/Calibration.tsx`)

- Se o lider ja foi avaliado, exibir botao "Resetar Calibracao" (com confirmacao)
- Ao confirmar, limpa `avaliacoes` do lider e registra no log de mudancas

### Na lista de lideres (`src/pages/Index.tsx`)

- Botao de reset visivel apenas para lideres ja avaliados (icone de refresh)

---

## 3. Dados Reais da Planilha

### Substituir `LIDERES_INICIAIS` (`src/data/store.ts`)

Os 15 lideres atuais (com dados ficticios) serao substituidos pelos dados reais da planilha:

| # | Nome | Area | Idade |
|---|------|------|-------|
| 1 | Camila Machado Fragoso | Gerencia Industrial | 33 |
| 2 | Daniel Henrique Alves de Amorim | Extrusora | 27 |
| 3 | Ednilson Luiz Barbosa | Logistica Expedicao | 38 |
| 4 | Eduardo Vitor da Costa | Manutencao Eletrica | 29 |
| 5 | Ernesto do Nascimento Junior | Administrativo Producao | 48 |
| 6 | Francinaldo Roseno de Carvalho | Administrativo Producao | 32 |
| 7 | Guilherme Augusto Soares dos Reis | Ensaque | 30 |
| 8 | Luiz Carlos Rabelo Vinhal | Ensaque | 30 |
| 9 | Manaces da Fonseca Fonseca | Extrusora | 44 |
| 10 | Mariana Matos Batista | Ensaque | 22 |
| 11 | Natanna Bianca Alves Oliveira | Gestao de Qualidade | 33 |
| 12 | Paulo Cezar Goncalves de Oliveira | Administrativo | 46 |
| 13 | Tatiana Candida da Silva Amorim | Formulacao | 40 |
| 14 | Thaian da Silva Alves | SMA | 37 |
| 15 | Wellington Rodrigues de Morais Myto | Extrusora | 36 |

Cada lider tera:
- **Formacao**: extraida da planilha (graduacao, pos-graduacao quando houver)
- **Experiencia**: os 3 ultimos cargos conforme a planilha
- Novas areas serao adicionadas ao mapeamento de cores (Logistica Expedicao, Manutencao Eletrica, Administrativo Producao, Formulacao, SMA, Gestao de Qualidade, Administrativo)

### Migracao

- Limpar localStorage antigo com dados ficticios para forcar carregamento dos dados reais
- Adicionar versao de dados para controle de migracao

---

## Arquivos Afetados

1. **`src/data/store.ts`** — Tipos Usuario/LogMudanca, 15 lideres reais, funcoes de auth e log, novas cores de area
2. **`src/pages/Login.tsx`** — Nova pagina de login (criacao)
3. **`src/App.tsx`** — Rota /login, ProtectedRoute
4. **`src/components/Layout.tsx`** — Botao logout, nome do usuario logado
5. **`src/pages/Calibration.tsx`** — Botao reset calibracao com confirmacao e log
6. **`src/pages/Index.tsx`** — Botao reset na lista

