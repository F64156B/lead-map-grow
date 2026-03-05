

# Cadastrar 12 Competências com Texto de Auxílio

## Mudanças

### 1. `src/data/store.ts`
- Adicionar campo `descricao?: string` na interface `Competencia`
- Substituir as 4 competências atuais pelas 12 novas em `COMPETENCIAS_INICIAIS`:

**Eixo Desempenho (1-8):**
1. Cultura de Qualidade e Boas Práticas
2. Segurança, Meio Ambiente e Saúde (SMA)
3. Domínio Técnico e Operacional
4. Visão Sistêmica e Solução de Problemas
5. Excelência na Gestão de Rotina
6. Administração de Pessoal e Conformidade
7. Atração e Integração de Talentos
8. Desenvolvimento e Performance da Equipe

**Eixo Comportamento (9-12):**
9. Inteligência Relacional e Comunicação
10. Gestão de Clima, Engajamento e Diversidade
11. Autogestão e Maturidade Emocional
12. Alinhamento Cultural Adimax

- Cada competência terá o texto "O que avaliar" no campo `descricao`
- Incrementar `DATA_VERSION` para `"5"` (forçar reset dos dados antigos, já que as competências mudaram completamente)

### 2. `src/pages/Competencies.tsx`
- Adicionar campo `descricao` no formulário de criação/edição (usando `Textarea`)
- Exibir a descrição na tabela de competências (coluna extra ou tooltip)
- Atualizar `editing` e `persist` para incluir `descricao`

### 3. `src/components/CompetencyRadar.tsx` (se necessário)
- Verificar se precisa ajustar para suportar 12 competências no radar (pode ficar apertado)

### Nota importante
O incremento de `DATA_VERSION` vai resetar avaliações existentes dos líderes, já que os IDs das competências mudam. Isso é esperado pois as competências anteriores não existem mais.

