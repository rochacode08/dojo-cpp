-- Guarda o código em progresso de cada problema (compartilhado pelo grupo,
-- já que a resolução é colaborativa), pra não se perder quando todo mundo sai
-- da sala antes de terminar.

create table problem_drafts (
  problem_id uuid primary key references problems (id) on delete cascade,
  code text not null,
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now()
);

alter table problem_drafts enable row level security;

create policy "drafts are readable by authenticated users"
  on problem_drafts for select
  to authenticated
  using (true);

create policy "drafts can be created by authenticated users"
  on problem_drafts for insert
  to authenticated
  with check (true);

create policy "drafts can be updated by authenticated users"
  on problem_drafts for update
  to authenticated
  using (true);
