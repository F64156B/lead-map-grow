

# Radar: média geral + comparação por área + listagem de GAPs

## O que muda

### 1. `src/pages/Dashboard.tsx`
- Quando nenhum líder estiver selecionado na view "Individual", exibir **uma única linha no radar** com a **média geral de todos os líderes avaliados** (ao invés de mostrar todos sobrepostos).
- Adicionar abaixo do radar uma seção **"Principais GAPs"**: lista das competências ordenadas da menor média para a maior, destacando as que têm média ≤ 2.
- Na view "Por Área", manter o comportamento atual (radar já mostra médias por área com `groupByArea`).

### 2. `src/components/CompetencyRadar.tsx`
- Adicionar suporte a uma nova prop `showAverage?: boolean`.
- Quando `showAverage=true` e nenhum líder específico selecionado, calcular a média de todos os líderes por competência e renderizar uma única linha "Média Geral" no radar.
- Quando `groupByArea=true`, manter o comportamento atual (já funciona).

### 3. Seção de GAPs (no `Dashboard.tsx`)
- Calcular para cada competência a média de todos os líderes avaliados (ou filtrados por área).
- Ordenar do menor para o maior.
- Renderizar uma lista/tabela com: nome da competência, eixo, média, e um badge de cor (🔴 ≤ 1.5, 🟠 ≤ 2.5, 🔵 ≤ 3.5, 🟢 > 3.5).
- Destacar as competências com média ≤ 2 como "GAPs prioritários".

## Resumo das alterações

| Arquivo | Mudança |
|---------|---------|
| `CompetencyRadar.tsx` | Nova prop `showAverage`, lógica de média geral |
| `Dashboard.tsx` | Passar `showAverage` quando sem seleção; nova seção de GAPs abaixo do radar |

