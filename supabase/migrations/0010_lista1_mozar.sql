-- Problemas da "Lista 1" (fundamentos: entrada/saída, aritmética simples).
-- "Área do Círculo" já existe no Dojo (migration 0005) — só ganha a tag da lista.
-- Casos de teste verificados rodando o código de referência no compilador (Wandbox/GCC).

update problems
set tags = array_append(tags, 'Lista 1 Mozar')
where slug = 'area-do-circulo' and not ('Lista 1 Mozar' = any(tags));

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000021',
  'extremamente-basico',
  'Extremamente Básico',
  E'Faça um programa que leia dois números inteiros A e B e imprima a soma deles.\n\nImprima:\n\nX = <soma>',
  'Fácil',
  array['Aritmética', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  33
),
(
  '00000000-0000-0000-0000-000000000022',
  'soma-simples',
  'Soma Simples',
  E'Faça um programa que leia dois valores inteiros A e B (em linhas separadas) e imprima a soma deles.\n\nImprima:\n\nSOMA = <soma>',
  'Fácil',
  array['Aritmética', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  34
),
(
  '00000000-0000-0000-0000-000000000023',
  'produto-simples',
  'Produto Simples',
  E'Faça um programa que leia dois valores inteiros A e B e imprima o produto entre eles.\n\nImprima:\n\nPROD = <produto>',
  'Fácil',
  array['Aritmética', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  35
),
(
  '00000000-0000-0000-0000-000000000024',
  'media-1',
  'Média 1',
  E'Leia duas notas A e B de um aluno. A nota A tem peso 3.5 e a nota B tem peso 7.5 (peso total 11).\n\nCalcule a média ponderada: MEDIA = ((A × 3.5 / 10) + (B × 7.5 / 10)) × 10 / 11\n\nImprima:\n\nMEDIA = <media>\n\ncom 5 casas decimais.',
  'Médio',
  array['Aritmética', 'Formatação', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  36
),
(
  '00000000-0000-0000-0000-000000000025',
  'media-2',
  'Média 2',
  E'Leia três notas: a primeira com peso 2, a segunda com peso 3 e a terceira com peso 5 (peso total 10).\n\nCalcule a média ponderada e imprima:\n\nMEDIA = <media>\n\ncom 1 casa decimal.',
  'Fácil',
  array['Aritmética', 'Formatação', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  37
),
(
  '00000000-0000-0000-0000-000000000026',
  'diferenca',
  'Diferença',
  E'Leia quatro valores inteiros A, B, C e D.\n\nCalcule a diferença entre o produto de A por B e o produto de C por D: DIFERENCA = (A × B) − (C × D)\n\nImprima:\n\nDIFERENCA = <diferenca>',
  'Fácil',
  array['Aritmética', 'Lista 1 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  38
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000021', '5 3', 'X = 8', true, 1),
  ('00000000-0000-0000-0000-000000000021', '10 20', 'X = 30', false, 2),

  ('00000000-0000-0000-0000-000000000022', E'4\n6', 'SOMA = 10', true, 1),
  ('00000000-0000-0000-0000-000000000022', E'0\n0', 'SOMA = 0', false, 2),

  ('00000000-0000-0000-0000-000000000023', '4 6', 'PROD = 24', true, 1),
  ('00000000-0000-0000-0000-000000000023', '-3 5', 'PROD = -15', false, 2),

  ('00000000-0000-0000-0000-000000000024', '10 10', 'MEDIA = 10.00000', true, 1),
  ('00000000-0000-0000-0000-000000000024', '5 8', 'MEDIA = 7.04545', false, 2),

  ('00000000-0000-0000-0000-000000000025', '10 10 10', 'MEDIA = 10.0', true, 1),
  ('00000000-0000-0000-0000-000000000025', '4 6 8', 'MEDIA = 6.6', false, 2),

  ('00000000-0000-0000-0000-000000000026', '3 5 2 4', 'DIFERENCA = 7', true, 1),
  ('00000000-0000-0000-0000-000000000026', '10 2 3 1', 'DIFERENCA = 17', false, 2);
