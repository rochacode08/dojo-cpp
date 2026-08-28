-- Problemas de fundamentos (E/S formatada, aritmética, condicionais, loops),
-- inspirados nos clássicos Beecrowd 1002, 1017, 1038, 1044, 1078 e 1060.
-- Sem vetores/POO de propósito: o grupo ainda está na parte inicial da disciplina.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-00000000000c',
  'area-do-circulo',
  'Área do Círculo',
  E'Leia o raio R de um círculo (um número real).\n\nCalcule a área do círculo usando π = 3.14159 e imprima:\n\nA=<area>\n\ncom exatamente 4 casas decimais.',
  'Fácil',
  array['Aritmética', 'Formatação'],
  E'#include <iostream>\n#include <iomanip>\n\nusing namespace std;\n\nint main() {\n    double raio;\n    cin >> raio;\n\n    const double pi = 3.14159;\n    double area = 0.0;\n    // TODO: calcule area = pi * raio * raio\n\n    cout << fixed << setprecision(4);\n    cout << "A=" << area << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  12
),
(
  '00000000-0000-0000-0000-00000000000d',
  'consumo-de-combustivel',
  'Consumo de Combustível',
  E'Leia o tempo de viagem (horas, inteiro) e a velocidade média (km/h, inteiro).\n\nCalcule a distância percorrida (tempo × velocidade) e o consumo de combustível, sabendo que o carro roda 12 km por litro.\n\nImprima apenas o consumo, com 3 casas decimais.',
  'Fácil',
  array['Aritmética', 'Formatação'],
  E'#include <iostream>\n#include <iomanip>\n\nusing namespace std;\n\nint main() {\n    int tempo, velocidade;\n    cin >> tempo >> velocidade;\n\n    double consumo = 0.0;\n    // TODO: calcule a distancia (tempo * velocidade) e o consumo (distancia / 12)\n\n    cout << fixed << setprecision(3);\n    cout << consumo << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  13
),
(
  '00000000-0000-0000-0000-00000000000e',
  'lanchonete',
  'Lanchonete',
  E'Leia o código de um lanche (1 a 5) e a quantidade pedida.\n\nTabela de preços:\n1 - X-Salada: R$ 4.00\n2 - X-Bacon: R$ 4.50\n3 - X-Tudo: R$ 5.00\n4 - Hambúrguer: R$ 2.00\n5 - Cachorro Quente: R$ 1.50\n\nImprima:\n\nTotal: R$ <valor>\n\ncom 2 casas decimais.',
  'Fácil',
  array['Condicionais', 'Formatação'],
  E'#include <iostream>\n#include <iomanip>\n\nusing namespace std;\n\nint main() {\n    int codigo, quantidade;\n    cin >> codigo >> quantidade;\n\n    double total = 0.0;\n    // TODO: de acordo com "codigo", calcule total = preco * quantidade\n    // 1: 4.00   2: 4.50   3: 5.00   4: 2.00   5: 1.50\n\n    cout << fixed << setprecision(2);\n    cout << "Total: R$ " << total << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  14
),
(
  '00000000-0000-0000-0000-00000000000f',
  'multiplos',
  'Múltiplos',
  E'Leia dois números inteiros A e B.\n\nVerifique se um deles é múltiplo do outro (em qualquer direção — A múltiplo de B, ou B múltiplo de A).\n\nImprima "Sao Multiplos" se for o caso, ou "Nao sao Multiplos" caso contrário.',
  'Fácil',
  array['Condicionais'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n\n    // TODO: verifique se "a" e multiplo de "b" ou "b" e multiplo de "a"\n    // (use o operador % — resto da divisao)\n\n    cout << "Nao sao Multiplos" << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  15
),
(
  '00000000-0000-0000-0000-000000000010',
  'tabuada',
  'Tabuada',
  E'Leia um número inteiro N e imprima sua tabuada de multiplicação, do 1 ao 10.\n\nCada linha deve ter o formato:\n\ni x N = resultado',
  'Fácil',
  array['Loops', 'Formatação'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    // TODO: use um loop de 1 a 10 e imprima "i x n = resultado" em cada linha\n\n    return 0;\n}\n',
  2000,
  256,
  16
),
(
  '00000000-0000-0000-0000-000000000011',
  'numeros-positivos',
  'Números Positivos',
  E'Leia 6 números reais.\n\nConte quantos deles são maiores ou iguais a zero e imprima:\n\n<quantidade> valores positivos',
  'Fácil',
  array['Loops', 'Condicionais'],
  E'#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int positivos = 0;\n    double valor;\n\n    // TODO: use um loop para ler 6 valores e contar quantos sao >= 0\n\n    cout << positivos << " valores positivos" << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  17
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-00000000000c', '2.0', 'A=12.5664', true, 1),
  ('00000000-0000-0000-0000-00000000000c', '1.0', 'A=3.1416', false, 2),
  ('00000000-0000-0000-0000-00000000000c', '3.0', 'A=28.2743', false, 3),

  ('00000000-0000-0000-0000-00000000000d', '2 60', '10.000', true, 1),
  ('00000000-0000-0000-0000-00000000000d', '1 12', '1.000', false, 2),
  ('00000000-0000-0000-0000-00000000000d', '5 100', '41.667', false, 3),

  ('00000000-0000-0000-0000-00000000000e', '1 2', 'Total: R$ 8.00', true, 1),
  ('00000000-0000-0000-0000-00000000000e', '3 3', 'Total: R$ 15.00', false, 2),
  ('00000000-0000-0000-0000-00000000000e', '5 4', 'Total: R$ 6.00', false, 3),

  ('00000000-0000-0000-0000-00000000000f', '6 3', 'Sao Multiplos', true, 1),
  ('00000000-0000-0000-0000-00000000000f', '5 7', 'Nao sao Multiplos', false, 2),
  ('00000000-0000-0000-0000-00000000000f', '9 9', 'Sao Multiplos', false, 3),

  ('00000000-0000-0000-0000-000000000010', '5', E'1 x 5 = 5\n2 x 5 = 10\n3 x 5 = 15\n4 x 5 = 20\n5 x 5 = 25\n6 x 5 = 30\n7 x 5 = 35\n8 x 5 = 40\n9 x 5 = 45\n10 x 5 = 50', true, 1),
  ('00000000-0000-0000-0000-000000000010', '1', E'1 x 1 = 1\n2 x 1 = 2\n3 x 1 = 3\n4 x 1 = 4\n5 x 1 = 5\n6 x 1 = 6\n7 x 1 = 7\n8 x 1 = 8\n9 x 1 = 9\n10 x 1 = 10', false, 2),
  ('00000000-0000-0000-0000-000000000010', '7', E'1 x 7 = 7\n2 x 7 = 14\n3 x 7 = 21\n4 x 7 = 28\n5 x 7 = 35\n6 x 7 = 42\n7 x 7 = 49\n8 x 7 = 56\n9 x 7 = 63\n10 x 7 = 70', false, 3),

  ('00000000-0000-0000-0000-000000000011', E'1 -2 3 -4 5 -6', '3 valores positivos', true, 1),
  ('00000000-0000-0000-0000-000000000011', E'-1 -2 -3 -4 -5 -6', '0 valores positivos', false, 2),
  ('00000000-0000-0000-0000-000000000011', E'1 2 3 4 5 6', '6 valores positivos', false, 3);
