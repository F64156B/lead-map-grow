

# Substituir "Potencial" por "Comportamento"

## Escopo

Renomear o eixo "Potencial" para "Comportamento" em todo o sistema. São 3 arquivos:

### 1. `src/data/store.ts`
- Tipo `Competencia.eixo`: `"desempenho" | "potencial"` → `"desempenho" | "comportamento"`
- `COMPETENCIAS_INICIAIS`: trocar `eixo: "potencial"` → `eixo: "comportamento"`
- Função `calcMedia`: parâmetro eixo atualizado no tipo
- Incrementar `DATA_VERSION` para forçar reset dos dados antigos

### 2. `src/pages/Competencies.tsx`
- Estado `eixo`: tipo e default atualizados
- Select: label "Potencial" → "Comportamento", value `"potencial"` → `"comportamento"`

### 3. `src/components/NineBoxChart.tsx`
- `calcMedia(l, competencias, "potencial")` → `"comportamento"`
- Label do eixo Y: "↑ Potencial" → "↑ Comportamento"
- Labels do 9-box: "Potencial Crescimento" → "Comportamento Crescimento", "Alto Potencial" → "Alto Comportamento"
- Comentários atualizados

Mudança puramente de renomeação, sem alteração de lógica.

