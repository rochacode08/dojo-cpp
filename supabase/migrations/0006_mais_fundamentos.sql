-- Mais 4 problemas de fundamentos (if/else-if em cadeia, switch-case, loops com
-- acumulador), inspirados nos clássicos Beecrowd 1037, 1041 e 1071, mais um
-- exercício original de switch-case (pedido explícito da Aula #6 do grupo).
-- A partir desta migration, o código inicial fica só com o esqueleto — sem TODOs.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000012',
  'intervalo',
  'Intervalo',
  E'Leia um número real X.\n\nClassifique-o em um dos intervalos abaixo e imprima a mensagem correspondente:\n\n0 ≤ X ≤ 25  → "Intervalo [0,25]"\n25 < X ≤ 50 → "Intervalo (25,50]"\n50 < X ≤ 75 → "Intervalo (50,75]"\n75 < X ≤ 100 → "Intervalo (75,100]"\nfora desses casos → "Fora de intervalo"',
  'Fácil',
  array['Condicionais'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  18
),
(
  '00000000-0000-0000-0000-000000000013',
  'quadrante-do-ponto',
  'Quadrante do Ponto',
  E'Leia as coordenadas X e Y de um ponto (números reais).\n\nImprima em qual região do plano cartesiano ele está:\n\nX=0 e Y=0   → "Origem"\nX≠0 e Y=0   → "Eixo X"\nX=0 e Y≠0   → "Eixo Y"\nX>0 e Y>0   → "Q1"\nX<0 e Y>0   → "Q2"\nX<0 e Y<0   → "Q3"\nX>0 e Y<0   → "Q4"',
  'Fácil',
  array['Condicionais'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  19
),
(
  '00000000-0000-0000-0000-000000000014',
  'soma-de-impares-no-intervalo',
  'Soma de Ímpares no Intervalo',
  E'Leia dois números inteiros X e Y, em qualquer ordem.\n\nSomando o menor deles como início e o maior como fim, calcule a soma de todos os números ímpares estritamente entre os dois (sem incluir X nem Y) e imprima o resultado.',
  'Médio',
  array['Loops', 'Aritmética'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  20
),
(
  '00000000-0000-0000-0000-000000000015',
  'menu-com-switch-case',
  'Menu com Switch-Case',
  E'Leia um número inteiro representando uma opção de menu e, usando switch-case, imprima a ação correspondente:\n\n1 → "Ligar"\n2 → "Desligar"\n3 → "Reiniciar"\n4 → "Cancelar"\nqualquer outro valor → "Opcao invalida"',
  'Fácil',
  array['Condicionais'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  21
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000012', '10', 'Intervalo [0,25]', true, 1),
  ('00000000-0000-0000-0000-000000000012', '60', 'Intervalo (50,75]', false, 2),
  ('00000000-0000-0000-0000-000000000012', '150', 'Fora de intervalo', false, 3),

  ('00000000-0000-0000-0000-000000000013', '0 0', 'Origem', true, 1),
  ('00000000-0000-0000-0000-000000000013', '3 4', 'Q1', false, 2),
  ('00000000-0000-0000-0000-000000000013', '-2 -5', 'Q3', false, 3),

  ('00000000-0000-0000-0000-000000000014', '1 10', '24', true, 1),
  ('00000000-0000-0000-0000-000000000014', '10 1', '24', false, 2),
  ('00000000-0000-0000-0000-000000000014', '2 8', '15', false, 3),

  ('00000000-0000-0000-0000-000000000015', '1', 'Ligar', true, 1),
  ('00000000-0000-0000-0000-000000000015', '3', 'Reiniciar', false, 2),
  ('00000000-0000-0000-0000-000000000015', '9', 'Opcao invalida', false, 3);
