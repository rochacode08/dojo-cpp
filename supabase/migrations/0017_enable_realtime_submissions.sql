-- Habilita eventos de Realtime (postgres_changes) na tabela submissions, pra
-- que o front-end possa notificar o grupo em tempo real quando alguém resolve
-- um problema. Idempotente (não quebra se já estiver habilitado).

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'submissions'
  ) then
    alter publication supabase_realtime add table submissions;
  end if;
end $$;
