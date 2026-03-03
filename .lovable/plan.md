

# Fix: Login de Novos Usuarios Nao Funciona

## Diagnostico

Analisei o codigo em `store.ts` e `Users.tsx`. A logica de `criarUsuario` e `login` esta correta (ambas usam lowercase no email, comparam senha diretamente). O problema mais provavel e:

1. **localStorage limpo no rebuild**: Quando o Lovable aplica mudancas, o preview recarrega e o localStorage pode ser perdido — os usuarios criados somem, mas o admin inicial (`pedro.souza@adimax.com.br`) volta porque e o fallback em `USUARIOS_INICIAIS`.
2. **Senha digitada errada na criacao**: O campo `type="password"` nao permite ver o que foi digitado.

## Solucao

### 1. Mostrar senha ao criar usuario (`src/pages/Users.tsx`)
- Trocar o input de senha na criacao para `type="text"` (ou adicionar botao toggle de visibilidade)
- Mostra ao admin exatamente qual senha esta sendo definida

### 2. Persistencia robusta (`src/data/store.ts`)
- Na funcao `checkDataVersion`, garantir que `usuarios` NAO seja limpo ao mudar a versao (ja esta assim, confirmar)
- Adicionar os usuarios criados na propria lista `USUARIOS_INICIAIS` como fallback — nao e possivel via codigo, mas podemos exibir feedback melhor

### 3. Feedback visual no login (`src/pages/Login.tsx`)
- Ao falhar o login, exibir tambem o email que foi tentado (para o usuario perceber erros de digitacao)
- Adicionar `console.log` temporario na funcao `login` para debug (listar emails cadastrados)

### 4. Validacao na criacao (`src/pages/Users.tsx`)
- Validar tamanho minimo da senha (ex: 4 caracteres)
- Trim no email e nome antes de salvar
- Toast de sucesso mostrando email e senha criados para confirmacao

## Arquivos afetados

1. **`src/pages/Users.tsx`** — Toggle de visibilidade da senha, trim nos inputs, toast com credenciais
2. **`src/pages/Login.tsx`** — Feedback melhorado no erro de login
3. **`src/data/store.ts`** — Trim no email em `criarUsuario` e `login`

