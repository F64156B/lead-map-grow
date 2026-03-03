

# Migrar Autenticação para Lovable Cloud (Supabase)

## Problema

O localStorage é apagado a cada rebuild do Lovable. Usuários criados pela interface somem. Isso **nunca** será resolvido com localStorage — precisamos de um banco de dados real.

## Solução: Supabase via Lovable Cloud

Migrar o sistema de usuários para Supabase Auth + tabela de perfis, garantindo persistência permanente.

## Etapas

### 1. Habilitar Lovable Cloud
- Ativar o Cloud na aba lateral do editor (necessário para ter Supabase)

### 2. Criar tabela `profiles` no banco
- Campos: `id` (uuid, FK para auth.users), `nome` (text), `created_at`
- Trigger automático para criar perfil ao signup
- RLS: usuário lê apenas seu próprio perfil

### 3. Criar tabela `user_roles` (segurança)
- Campos: `user_id` (uuid, FK), `role` (enum: admin, usuario)
- Função `has_role()` com SECURITY DEFINER
- RLS baseada em roles

### 4. Criar cliente Supabase (`src/integrations/supabase/`)
- Configurar `supabaseClient.ts` com URL e chave pública

### 5. Refatorar `src/data/store.ts`
- Remover toda lógica de localStorage para usuários
- Funções `login`, `criarUsuario`, `resetarSenhaUsuario`, `excluirUsuario` passam a usar Supabase Auth
- `criarUsuario` → `supabase.auth.admin.createUser()` (via edge function)
- `login` → `supabase.auth.signInWithPassword()`
- `resetarSenhaUsuario` → edge function com `supabase.auth.admin.updateUserById()`

### 6. Criar Edge Functions para operações admin
- `manage-users`: criar usuário, resetar senha, excluir (requer role admin)
- Validação server-side do role do solicitante

### 7. Atualizar `Login.tsx`
- Usar `supabase.auth.signInWithPassword()` diretamente
- Remover contagem de debug e logs temporários

### 8. Atualizar `Users.tsx`
- Listar usuários via query na tabela `profiles` + `user_roles`
- Criar/excluir/resetar via edge function `manage-users`

### 9. Seed do admin inicial
- Inserir `pedro.souza@adimax.com.br` com senha `1234` e role `admin` no banco

## Arquivos afetados
- `src/integrations/supabase/client.ts` (novo)
- `src/data/store.ts` (refatorar auth)
- `src/pages/Login.tsx` (Supabase auth)
- `src/pages/Users.tsx` (Supabase queries)
- `supabase/functions/manage-users/index.ts` (novo)
- Migrações SQL para tabelas e seed

## Pré-requisito
**Lovable Cloud precisa estar habilitado.** Se ainda não estiver, habilite na aba Cloud do editor antes de prosseguir.

