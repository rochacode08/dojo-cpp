-- Permite resolver os problemas em C além de C++. A linguagem é do envio (e do
-- rascunho compartilhado), não do problema: o mesmo enunciado pode ser feito
-- nas duas.

alter table submissions
  add column language text not null default 'cpp'
  check (language in ('cpp', 'c'));

alter table problem_drafts
  add column language text not null default 'cpp'
  check (language in ('cpp', 'c'));

comment on column submissions.language is 'cpp = GCC 13.2 C++17, c = GCC 13.2 C11 (ver supabase/functions/run-code)';
