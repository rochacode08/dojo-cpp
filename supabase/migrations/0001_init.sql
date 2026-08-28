-- Schema do C++ Dojo: perfis, problemas, casos de teste e submissões.

create type difficulty as enum ('Fácil', 'Médio', 'Difícil');
create type submission_status as enum ('pending', 'accepted', 'wrong_answer', 'compile_error', 'runtime_error');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_color text not null default '#2a4a6b',
  avatar_initials text not null
);

create table problems (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  difficulty difficulty not null default 'Médio',
  tags text[] not null default '{}',
  starter_code text not null,
  time_limit_ms int not null default 2000,
  memory_limit_mb int not null default 256,
  order_index int not null default 0
);

create table test_cases (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references problems (id) on delete cascade,
  input text not null,
  expected_output text not null,
  is_sample boolean not null default false,
  order_index int not null default 0
);

create table submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  problem_id uuid not null references problems (id) on delete cascade,
  code text not null,
  status submission_status not null default 'pending',
  results jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table problems enable row level security;
alter table test_cases enable row level security;
alter table submissions enable row level security;

create policy "profiles are readable by authenticated users"
  on profiles for select
  to authenticated
  using (true);

create policy "problems are readable by authenticated users"
  on problems for select
  to authenticated
  using (true);

create policy "sample test cases are readable by authenticated users"
  on test_cases for select
  to authenticated
  using (is_sample = true);

create policy "submissions are readable by authenticated users"
  on submissions for select
  to authenticated
  using (true);

create policy "users can insert their own submissions"
  on submissions for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Seed: problema "Filtragem de Vetores com Loops" (o mesmo do mockup).
insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values (
  '00000000-0000-0000-0000-000000000001',
  'filtragem-de-vetores-com-loops',
  'Filtragem de Vetores com Loops',
  E'Você recebe uma sequência de N números inteiros. Implemente a classe Filtro que armazena esses números em um vector<int> e devolve apenas os elementos pares, em ordem de entrada.\n\nA filtragem deve ser feita com um único laço de repetição, sem uso de funções da biblioteca de algoritmos.\n\nRegras:\n1. A classe Filtro deve ter o vetor como atributo privado.\n2. Exponha os métodos públicos adicionar(int) e pares().\n3. Imprima os pares na mesma linha, separados por um espaço.\n4. Se não houver nenhum par, imprima VAZIO.',
  'Médio',
  array['Loops', 'POO'],
  E'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Filtro {\nprivate:\n    vector<int> dados;\n\npublic:\n    void adicionar(int valor) {\n        dados.push_back(valor);\n    }\n\n    vector<int> pares() {\n        vector<int> saida;\n        // TODO: percorra "dados" com um loop e\n        // guarde apenas os valores pares em "saida"\n        return saida;\n    }\n};\n\nint main() {\n    int n;\n    cin >> n;\n\n    Filtro filtro;\n    for (int i = 0; i < n; i++) {\n        int valor;\n        cin >> valor;\n        filtro.adicionar(valor);\n    }\n\n    vector<int> resultado = filtro.pares();\n    for (size_t i = 0; i < resultado.size(); i++) {\n        cout << resultado[i] << " ";\n    }\n    cout << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  1
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000001', E'6\n4 7 10 3 12 5', '4 10 12', true, 1),
  ('00000000-0000-0000-0000-000000000001', E'3\n1 3 5', 'VAZIO', false, 2),
  ('00000000-0000-0000-0000-000000000001', E'1\n8', '8', false, 3),
  ('00000000-0000-0000-0000-000000000001', E'5\n2 4 6 8 10', '2 4 6 8 10', false, 4);
