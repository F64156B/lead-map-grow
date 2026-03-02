

# Reestruturar PDI com Modelo de Mentoring + Conhecimento Tecnico + Navegacao

## Visao Geral

Tres mudancas principais baseadas no modelo de Mentoring da imagem enviada:

1. Adicionar **"Conhecimento Tecnico"** como nova competencia
2. Reestruturar o formulario do PDI com as colunas do modelo de mentoring: **Conhecimento, Habilidade, Atitude, Metodologia e Indicadores**
3. Adicionar **link "PDI" na navegacao superior**

---

## 1. Nova Competencia (`src/data/store.ts`)

Adicionar ao array `COMPETENCIAS_INICIAIS`:

```text
{ id: "conhecimento-tecnico", nome: "Conhecimento Técnico", eixo: "desempenho", ordem: 4 }
```

---

## 2. Reestruturar o Tipo AcaoPDI (`src/data/store.ts`)

O tipo atual tem um unico campo `acao` (texto livre). Sera expandido para refletir o modelo de mentoring com 5 dimensoes:

```text
AcaoPDI {
  id: string
  competenciaId: string
  conhecimento: string      // O que precisa aprender (teoria, conceitos)
  habilidade: string        // O que precisa praticar (skills)
  atitude: string           // Comportamentos a desenvolver
  metodologia: string       // Como sera desenvolvido (mentoria, shadowing, cursos)
  indicadores: string       // Como medir o progresso
  prazo: string
  responsavel: string
  status: "pendente" | "em_andamento" | "concluida"
}
```

Migracao automatica: PDIs existentes que tenham o campo `acao` terao o conteudo movido para `conhecimento`, e os demais campos serao inicializados vazios.

---

## 3. Redesenhar a Pagina PDI (`src/pages/PDI.tsx`)

Layout atualizado com 5 campos organizados em grid para cada acao de desenvolvimento:

- **Linha 1**: Conhecimento | Habilidade | Atitude (3 colunas iguais)
- **Linha 2**: Metodologia (campo largo)
- **Linha 3**: Indicadores Avaliados (campo largo)
- **Linha 4**: Prazo | Responsavel | Status (como ja existe)

Cada competencia continua agrupada em cards, com prioridades de desenvolvimento destacadas.

---

## 4. Adicionar PDI na Navegacao (`src/components/Layout.tsx`)

Adicionar item "PDI" no menu superior que navega para a lista de lideres (pagina inicial) com foco no PDI. Como o PDI e sempre vinculado a um lider especifico, o link levara para `/` onde o usuario pode escolher o lider e acessar seu PDI.

---

## Arquivos Afetados

1. **`src/data/store.ts`** -- Nova competencia "Conhecimento Tecnico", tipo AcaoPDI expandido com 5 campos, migracao
2. **`src/pages/PDI.tsx`** -- Redesign com layout de mentoring (grid Conhecimento/Habilidade/Atitude + Metodologia + Indicadores)
3. **`src/components/Layout.tsx`** -- Novo link "PDI" na navegacao superior

