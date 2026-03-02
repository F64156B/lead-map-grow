
# Redesign Visual - UX Profissional com Logos Adimax

## Visao Geral

Melhorar a experiencia visual do sistema inteiro, tornando-o mais profissional, atrativo e alinhado a identidade Adimax. As logos DPA e Adimax serao usadas estrategicamente em pontos-chave da interface.

---

## 1. Tela de Login - Impacto Visual

**Antes:** Card simples com fundo cinza claro, sem hierarquia visual forte.

**Depois:**
- Fundo com gradiente sutil laranja-para-branco (do canto inferior esquerdo)
- Card com sombra mais pronunciada (`shadow-xl`) e bordas arredondadas maiores
- Logo DPA maior (h-20) como elemento hero, com espaco generoso acima
- Titulo "Calibracao Adimax" em tamanho maior com subtitulo estilizado
- Logo Adimax no rodape do card, separada por uma linha fina
- Inputs com icones internos (Mail, Lock) e foco com borda laranja
- Botao "Entrar" com efeito hover mais forte e sombra
- Rodape discreto: "Powered by DPA" ou copyright

---

## 2. Header (Layout.tsx) - Branding Profissional

**Antes:** Icone generico de clipboard no header.

**Depois:**
- Substituir icone ClipboardCheck pela **logo Adimax** (h-8) no canto esquerdo
- Adicionar uma faixa laranja fina (2px) no topo do header como assinatura visual
- Navegacao com estilo pill mais refinado (rounded-full, transicoes suaves)
- Area do usuario com avatar circular com iniciais (ex: "PS" para Pedro Souza)
- Separador visual mais elegante entre nav e usuario

---

## 3. Pagina de Lideres (Index.tsx) - Cards e Hierarquia

**Antes:** Tabela simples, titulo basico.

**Depois:**
- Banner de boas-vindas no topo com gradiente laranja sutil e logo DPA pequena
- Cards de estatisticas rapidas acima da tabela (Total Lideres, Avaliados, Pendentes) com icones e cores
- Tabela com hover row mais pronunciado, linhas zebradas sutis
- Badges de status com icones ao inves de emojis (CheckCircle verde, Clock amarelo)
- Botoes de acao com tooltips e cores mais distintas

---

## 4. Pagina de Calibracao (Calibration.tsx) - Experiencia Guiada

- Barra de progresso no topo mostrando quantas competencias ja foram avaliadas
- Cards de competencia com hover elevado (shadow on hover)
- Botoes de nota (1, 2, 3) maiores com animacao de selecao (scale + shadow)
- Header do lider com uma faixa colorida baseada na area (cor da area)

---

## 5. Estilos Globais (index.css)

- Adicionar transicoes globais suaves para hover e focus
- Tipografia: usar font-weight mais variado (light para subtextos, bold para titulos)
- Sombras customizadas mais sofisticadas para cards

---

## Arquivos Afetados

1. **`src/pages/Login.tsx`** — Redesign completo do layout visual (gradiente, tamanhos, icones nos inputs, rodape)
2. **`src/components/Layout.tsx`** — Logo Adimax no header, faixa laranja, avatar com iniciais, navegacao refinada
3. **`src/pages/Index.tsx`** — Banner de boas-vindas, cards de estatisticas, badges sem emoji, zebra striping
4. **`src/pages/Calibration.tsx`** — Barra de progresso, faixa de area, hover nos cards
5. **`src/index.css`** — Transicoes globais, sombras customizadas

Nenhuma dependencia nova sera instalada. Todas as melhorias usam Tailwind CSS existente.
