
# App de Calibração de Liderança Adimax

## Visão Geral
Aplicação web para avaliação e mapeamento de líderes da Adimax usando Matriz 9-Box + Radar Chart de competências, com identidade visual da marca.

---

## Identidade Visual
- **Fundo**: Branco e cinza claro, visual limpo e corporativo
- **Cor de destaque**: Laranja Adimax (#F28C00) em botões e elementos interativos
- **Textos**: Preto (#000000)
- **Tipografia**: Sans-serif clean, títulos em negrito

---

## Base de Dados (localStorage — estrutura robusta e expansível)

### Estrutura de Líderes
Cada líder terá: `id`, `nome`, `area`, `idade`, `formacao`, `experiencia`, e um objeto dinâmico de `avaliacoes` (chave = id da competência, valor = nota 1-3).

### Estrutura de Competências (tabela de parâmetros)
Cada competência: `id`, `nome`, `eixo` ("desempenho" ou "potencial"), `ordem`. Isso permite adicionar/remover competências sem alterar código — o formulário e os cálculos se adaptam automaticamente.

### Competências Iniciais
1. Entrega de Resultados (KPIs) → eixo Desempenho
2. Cultura e Valores Adimax → eixo Potencial
3. Gestão de Pessoas (Liderança) → eixo Potencial

### 15 Líderes Pré-carregados
Dados importados da planilha Gestao_GO.xlsx com nomes, áreas, idades e formações.

---

## Tela 1 — Lista de Líderes
- Tabela com todos os líderes (nome, área, idade, formação)
- Busca por nome ou área
- Filtro por área
- Indicador visual: avaliado ✅ vs. pendente ⏳
- Botão para calibrar cada líder

---

## Tela 2 — Calibração Individual
- Perfil do líder no topo
- Formulário dinâmico com todas as competências cadastradas, escala 1-3:
  - 1 = Abaixo do Esperado 🔴
  - 2 = Atende 🟡
  - 3 = Supera 🟢
- Botão salvar

---

## Tela 3 — Dashboard com 9-Box + Radar Chart

### Mapa 9-Box
- Gráfico 3×3 com eixos Desempenho (X) e Potencial (Y)
- Nomes dos líderes posicionados conforme médias
- Cores por área
- Filtro por área

### 🆕 Radar Chart de Competências
- Gráfico Radar (usando Recharts, já instalado) mostrando o perfil de competências
- **Visão individual**: ao clicar num líder, exibe o radar com todas as competências dele (notas de 1 a 3 nos eixos)
- **Visão comparativa**: possibilidade de sobrepor o radar de múltiplos líderes para comparação
- **Visão por área**: radar com a média das competências de todos os líderes de uma área

---

## Tela 4 — Gestão de Competências
- Adicionar nova competência (nome + eixo: Desempenho ou Potencial)
- Editar ou remover competências
- O formulário de calibração, o 9-Box e o Radar Chart se ajustam automaticamente
