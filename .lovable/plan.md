

# Fix Definitivo: Login de Novos Usuários

## Problema Identificado

Analisei todo o fluxo de código e a lógica está correta. Porém encontrei dois problemas concretos:

1. **Reset de senha com campo oculto**: Na tela de Usuários, o campo "Nova Senha" no reset usa `type="password"` (linha 173 de Users.tsx). O admin não vê o que digita, podendo errar a senha sem perceber.

2. **localStorage limpo pelo iframe**: Quando o Lovable aplica qualquer alteração de código, o preview é reconstruído e o localStorage do iframe pode ser zerado completamente. A lógica de backup em `checkDataVersion` só protege contra mudanças de versão, não contra limpeza total do iframe. Nesse caso, apenas o `USUARIOS_INICIAIS` (Pedro Souza) sobrevive.

## Solução

### 1. Reset de senha visível (`src/pages/Users.tsx`)
- Mudar o input de nova senha de `type="password"` para `type="text"` (igual à criação)
- Adicionar validação de mínimo 4 caracteres no reset também
- Exibir no toast de sucesso a nova senha definida para confirmação

### 2. Logs de debug detalhados (`src/data/store.ts`)
- Na função `login`, logar **todos os usuários com senhas** no console (temporário, para debug)
- Logar exatamente o que está sendo comparado: email digitado vs armazenado, senha digitada vs armazenada

### 3. Feedback visual no login (`src/pages/Login.tsx`)
- Ao falhar, mostrar a lista de emails cadastrados no console
- Manter contagem visível na tela de login

Esses 3 arquivos serão editados com mudanças mínimas e focadas.

