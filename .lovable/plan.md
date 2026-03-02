
# Adicionar PDI (Plano de Desenvolvimento Individual) pos-calibracao

## Visao Geral
Apos a calibracao de um lider, o usuario podera definir um PDI com acoes de desenvolvimento vinculadas as competencias avaliadas. O PDI sera acessivel a partir da tela de calibracao e tera sua propria tela dedicada.

---

## Mudancas na Base de Dados (`src/data/store.ts`)

### Novo tipo `AcaoPDI`

```text
AcaoPDI {
  id: string                    // UUID gerado
  competenciaId: string         // Vinculada a qual competencia
  acao: string                  // Descricao da acao de desenvolvimento
  prazo: string                 // Data ou periodo alvo (ex: "Jun/2026")
  responsavel: string           // Quem acompanha (gestor, RH, etc.)
  status: "pendente" | "em_andamento" | "concluida"
}
```

### Mudanca no tipo `Lider`
Adicionar campo `pdi: AcaoPDI[]` (array, default `[]`).

### Novas funcoes
- `getPDI(liderId)` — retorna as acoes de PDI do lider
- `savePDI(liderId, acoes)` — salva as acoes no lider
- Migracao automatica para lideres existentes que nao tenham o campo `pdi`

---

## Nova Tela: PDI do Lider (`src/pages/PDI.tsx`)

Acessada pela rota `/pdi/:id`. Conteudo:

1. **Cabecalho** com nome do lider, area e um resumo da calibracao (notas por competencia)
2. **Lista de acoes de PDI** agrupadas por competencia, cada uma com:
   - Campo de texto para a acao de desenvolvimento
   - Campo de prazo
   - Campo de responsavel
   - Seletor de status (Pendente / Em Andamento / Concluida) com cores visuais
3. **Botao "Adicionar Acao"** por competencia — foco nas competencias com nota 1 ou 2 (sugestao automatica)
4. **Botao Salvar** para persistir no localStorage

### Logica inteligente
- Ao abrir o PDI de um lider ja calibrado, as competencias com nota "Abaixo do Esperado" (1) ou "Atende" (2) serao destacadas como prioridade de desenvolvimento
- Competencias com nota 3 ("Supera") aparecerao em secao separada como "Pontos Fortes"

---

## Ajustes na Tela de Calibracao (`src/pages/Calibration.tsx`)

- Apos salvar a avaliacao, exibir um botao "Definir PDI" que navega para `/pdi/:id`
- Adicionar botao "PDI" no topo do perfil se o lider ja foi avaliado

---

## Ajustes na Lista de Lideres (`src/pages/Index.tsx`)

- Adicionar indicador visual de PDI definido (icone ou badge) ao lado do status de avaliacao
- Botao rapido para acessar o PDI de cada lider

---

## Ajustes no Roteamento (`src/App.tsx`)

- Nova rota: `/pdi/:id` apontando para o componente `PDI`

---

## Ajustes no Layout (`src/components/Layout.tsx`)

- Nenhuma mudanca necessaria na navegacao principal (PDI e acessado via lider, nao pelo menu global)

---

## Arquivos afetados

1. `src/data/store.ts` — Novo tipo `AcaoPDI`, campo `pdi` no `Lider`, funcoes de acesso, migracao
2. `src/pages/PDI.tsx` — Nova pagina completa do PDI
3. `src/pages/Calibration.tsx` — Botao de navegacao para PDI
4. `src/pages/Index.tsx` — Indicador de PDI na lista
5. `src/App.tsx` — Nova rota `/pdi/:id`
