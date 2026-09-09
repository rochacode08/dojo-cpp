-- Permite resolver os problemas em C além de C++. A linguagem é do envio (e do
-- rascunho compartilhado), não do problema: o mesmo enunciado pode ser feito
-- nas duas.
--
-- Escrita de forma idempotente: rodar de novo não dá erro. Sem isso, uma
-- execução que falha no meio deixa o banco num estado que nem reaplicar
-- resolve ("column already exists").

alter table submissions
  add column if not exists language text not null default 'cpp';

alter table problem_drafts
  add column if not exists language text not null default 'cpp';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'submissions_language_check'
  ) then
    alter table submissions
      add constraint submissions_language_check check (language in ('cpp', 'c'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'problem_drafts_language_check'
  ) then
    alter table problem_drafts
      add constraint problem_drafts_language_check check (language in ('cpp', 'c'));
  end if;
end
$$;

comment on column submissions.language is 'cpp = GCC 13.2 C++17, c = GCC 13.2 C11 (ver supabase/functions/run-code)';
