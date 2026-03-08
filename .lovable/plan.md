

# Ajustar escala para 4 níveis (Matriz de Habilidade)

## Nova escala

| Nível | Label | Emoji | Cor |
|-------|-------|-------|-----|
| 1 | Necessita Conhecer | 🔴 | vermelho |
| 2 | Apto com Acompanhamento | 🟠 | laranja |
| 3 | Apto com Autonomia | 🔵 | azul |
| 4 | Apto a Multiplicar | 🟢 | verde |

## Arquivos afetados

### 1. `src/pages/Calibration.tsx`
- `NOTA_LABELS`: 3 níveis → 4 níveis com os novos textos
- Grid: `grid-cols-3` → `grid-cols-4`, iterar `[1,2,3,4]`

### 2. `src/pages/PDI.tsx`
- `NOTA_LABELS`: atualizar para 4 níveis
- `pontosFortes`: `nota === 3` → `nota >= 3`
- `prioridade`: `nota <= 2` → `nota <= 2` (sem mudança)

### 3. `src/components/NineBoxChart.tsx`
- Mapeamento: `(valor - 1) / 2` → `(valor - 1) / 3` (range 1-4 → 0-1)

### 4. `src/components/CompetencyRadar.tsx`
- Duas ocorrências de `PolarRadiusAxis domain={[0, 3]}` → `domain={[0, 4]}` e `tickCount={5}`

Mudança puramente de escala, sem alteração de estrutura de dados.

