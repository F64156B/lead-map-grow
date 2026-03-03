

# Diagnóstico: Login de Novos Usuários

## Causa Raiz Identificada

O sistema usa **localStorage** para persistir usuários. Quando o código é alterado no Lovable, o preview reconstrói e o localStorage do iframe é **limpo**. Isso significa que:

- Usuários criados **antes de uma alteração de código** desaparecem
- Apenas `pedro.souza@adimax.com.br` (do `USUARIOS_INICIAIS`) sobrevive, pois é o fallback no código

Além disso, se `CURRENT_DATA_VERSION` mudar (ex: de "3" para "4"), a função `checkDataVersion` limpa dados — embora atualmente não limpe `usuarios`, qualquer rebuild pode zerar o localStorage inteiro.

## Solução

### 1. Proteger usuários no checkDataVersion (`src/data/store.ts`)
- Antes de limpar dados na migração de versão, **preservar** a lista de usuários:
  - Ler `KEYS.usuarios` antes da limpeza
  - Restaurá-los após o reset de versão
- Isso garante que mesmo após mudanças de versão, os usuários criados persistam

### 2. Adicionar logs visuais no login (`src/pages/Login.tsx`)
- Ao falhar o login, exibir no toast (além do erro) quantos usuários estão cadastrados no sistema
- Isso ajuda o admin a perceber se os dados foram perdidos

### 3. Pré-carregar usuários criados se localStorage estiver vazio (`src/data/store.ts`)
- Na função `getUsuariosCadastrados`, se o localStorage retorna apenas o fallback (1 usuário), salvar imediatamente os `USUARIOS_INICIAIS` no localStorage para garantir a persistência base

### 4. Botão "Ver Usuários Cadastrados" na tela de login (debug) (`src/pages/Login.tsx`)
- Adicionar um texto discreto abaixo do botão Entrar mostrando a contagem de usuários cadastrados
- Remover depois que o sistema estiver estável

## Arquivos Afetados
1. `src/data/store.ts` — Proteger usuarios no checkDataVersion, inicializar localStorage
2. `src/pages/Login.tsx` — Feedback melhorado com contagem de usuários

