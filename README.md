# C++ Dojo

Plataforma de estudo de C++ do grupo — estilo Beecrowd, com editor Monaco, execução real de código via Wandbox e dados no Supabase.

## Setup

### 1. Instalar dependências

```
npm install
```

### 2. Criar o projeto no Supabase

1. Crie um projeto grátis em https://supabase.com.
2. Em **Project Settings → API**, copie a `URL` e a `anon public key`.
3. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
4. Rode a migration `supabase/migrations/0001_init.sql` no SQL Editor do Supabase (cria as tabelas, RLS e já cadastra o primeiro problema).
5. Em **Authentication → Users**, crie as 4 contas do grupo (e-mail/senha).
6. Para cada conta criada, insira uma linha na tabela `profiles` (SQL Editor), por exemplo:
   ```sql
   insert into profiles (id, display_name, avatar_color, avatar_initials)
   values ('<uuid do usuário em auth.users>', 'Alice', '#2d5f3f', 'AL');
   ```

### 3. Execução de código (Wandbox)

Não precisa de conta nem chave — a Edge Function `run-code` chama a API pública gratuita da [Wandbox](https://wandbox.org) (`wandbox.org/api/compile.json`) direto. Só falta fazer o deploy da função:

```
supabase login
supabase link --project-ref <seu-project-ref>
supabase functions deploy run-code
```

### 4. Rodar localmente

```
npm run dev
```

Para testar a Edge Function localmente antes de fazer deploy:

```
supabase functions serve run-code --env-file supabase/.env.local
```

### 5. Deploy

- **Frontend**: conecte o repositório no Vercel, defina as env vars `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- **Backend**: já está no Supabase (banco, auth e a Edge Function `run-code`) — nenhum servidor extra é necessário.
