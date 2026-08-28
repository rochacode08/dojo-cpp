-- Problemas da "Lista 3" (condicionais compostas, loops de validação, vetores).
-- Casos de teste verificados rodando o código de referência no compilador (Wandbox/GCC).

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000027',
  'tipos-de-triangulos',
  'Tipos de Triângulos',
  E'Leia 3 valores de ponto flutuante A, B e C e ordene-os em ordem decrescente, de modo que o lado A represente o maior dos três lados.\n\nA seguir, determine o tipo de triângulo que estes três lados formam, com base nos seguintes casos, sempre escrevendo a mensagem adequada:\n\nse A ≥ B+C, apresente a mensagem: NAO FORMA TRIANGULO\nse A² = B² + C², apresente a mensagem: TRIANGULO RETANGULO\nse A² > B² + C², apresente a mensagem: TRIANGULO OBTUSANGULO\nse A² < B² + C², apresente a mensagem: TRIANGULO ACUTANGULO\nse os três lados forem iguais, apresente a mensagem: TRIANGULO EQUILATERO\nse apenas dois dos lados forem iguais, apresente a mensagem: TRIANGULO ISOSCELES\n\nImprima todas as classificações que se aplicam (pode ser mais de uma).',
  'Difícil',
  array['Condicionais', 'Aritmética', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  39
),
(
  '00000000-0000-0000-0000-000000000028',
  'somando-inteiros-consecutivos',
  'Somando Inteiros Consecutivos',
  E'Leia um valor A e um valor N. Imprima a soma de A para cada i com os valores (0 ≤ i ≤ N-1), ou seja: (A+0) + (A+1) + ... + (A+N-1).\n\nEnquanto N for negativo ou zero, um novo N (apenas N, não A) deve ser lido, até encontrar um N válido (positivo).',
  'Médio',
  array['Loops', 'Condicionais', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  40
),
(
  '00000000-0000-0000-0000-000000000029',
  'soma-de-impares-consecutivos-i',
  'Soma de Ímpares Consecutivos I',
  E'Leia 2 valores inteiros X e Y. Calcule e mostre a soma dos números ímpares estritamente entre eles (sem incluir X nem Y).',
  'Médio',
  array['Loops', 'Aritmética', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  41
),
(
  '00000000-0000-0000-0000-00000000002a',
  'pula-sapo',
  'Pula Sapo',
  E'Em cada fase do jogo do Pula Sapo você deve conduzir seu anfíbio através de uma sequência de canos de alturas diferentes até chegar a salvo no cano mais à direita.\n\nO sapo só consegue sobreviver se a diferença de altura entre canos consecutivos for, no máximo, a altura do pulo do sapo. A distância entre os canos é irrelevante — o sapo sempre consegue alcançar o próximo cano com um pulo, desde que a altura permita.\n\nEscreva um programa que, dadas as alturas dos canos e a altura do pulo do sapo, diga se a fase pode ser vencida ou não.',
  'Médio',
  array['Vetores', 'Loops', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  42
),
(
  '00000000-0000-0000-0000-00000000002b',
  'media-3',
  'Média 3',
  E'Leia quatro números (N1, N2, N3, N4), cada um correspondente a uma nota de um aluno. Calcule a média com pesos 2, 3, 4 e 1, respectivamente, e mostre essa média acompanhada da mensagem "Media: ".\n\nSe a média for maior ou igual a 7.0, imprima "Aluno aprovado.". Se for inferior a 5.0, imprima "Aluno reprovado.". Se a média estiver entre 5.0 e 6.9 (inclusive), imprima "Aluno em exame.".\n\nNo caso do aluno estar em exame, leia a nota do exame e imprima "Nota do exame: " acompanhada da nota. Recalcule a média (some a nota do exame com a média anterior e divida por 2) e imprima "Aluno aprovado." (se a média final for 5.0 ou mais) ou "Aluno reprovado." (caso contrário). Para esses dois casos, apresente por último a mensagem "Media final: " seguida da média final.\n\nTodas as respostas devem ter uma casa decimal.',
  'Difícil',
  array['Condicionais', 'Aritmética', 'Formatação', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  43
),
(
  '00000000-0000-0000-0000-00000000002c',
  'formula-de-bhaskara',
  'Fórmula de Bhaskara',
  E'Leia 3 valores de ponto flutuante A, B e C e calcule as raízes da equação de Bhaskara.\n\nSe não for possível calcular as raízes (divisão por zero ou raiz de número negativo), mostre a mensagem "Impossivel calcular". Caso contrário, imprima:\n\nR1 = <raiz1>\nR2 = <raiz2>\n\ncom 5 dígitos após o ponto.',
  'Médio',
  array['Condicionais', 'Aritmética', 'Formatação', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  44
),
(
  '00000000-0000-0000-0000-00000000002d',
  'coordenadas-de-um-ponto',
  'Coordenadas de um Ponto',
  E'Leia 2 valores com uma casa decimal (x e y), que representam as coordenadas de um ponto em um plano. Determine a qual quadrante o ponto pertence, ou se está sobre um dos eixos cartesianos ou na origem (x = y = 0).\n\nSe o ponto estiver na origem, escreva a mensagem "Origem". Se estiver sobre um dos eixos, escreva "Eixo X" ou "Eixo Y", conforme a situação. Caso contrário, escreva o quadrante: "Q1", "Q2", "Q3" ou "Q4".',
  'Fácil',
  array['Condicionais', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  45
),
(
  '00000000-0000-0000-0000-00000000002e',
  'converter-para-hexadecimal',
  'Converter para Hexadecimal',
  E'Escreva um programa que, dado um número inteiro positivo V na base 10, mostre sua representação em hexadecimal (base 16), usando letras maiúsculas.',
  'Fácil',
  array['Aritmética', 'Lista 3 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  46
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000027', '7.0 5.0 7.0', E'TRIANGULO ACUTANGULO\nTRIANGULO ISOSCELES', true, 1),
  ('00000000-0000-0000-0000-000000000027', '3 4 5', 'TRIANGULO RETANGULO', false, 2),
  ('00000000-0000-0000-0000-000000000027', '5 5 5', E'TRIANGULO ACUTANGULO\nTRIANGULO EQUILATERO', false, 3),
  ('00000000-0000-0000-0000-000000000027', '1 1 5', 'NAO FORMA TRIANGULO', false, 4),
  ('00000000-0000-0000-0000-000000000027', '2 3 4', 'TRIANGULO OBTUSANGULO', false, 5),

  ('00000000-0000-0000-0000-000000000028', '3 2', '7', true, 1),
  ('00000000-0000-0000-0000-000000000028', '5 -3 -1 0 3', '18', false, 2),
  ('00000000-0000-0000-0000-000000000028', '0 4', '6', false, 3),

  ('00000000-0000-0000-0000-000000000029', E'6\n-5', '5', true, 1),
  ('00000000-0000-0000-0000-000000000029', E'1\n10', '24', false, 2),
  ('00000000-0000-0000-0000-000000000029', E'20\n2', '99', false, 3),

  ('00000000-0000-0000-0000-00000000002a', E'5 10\n1 3 6 9 7 2 4 5 8 3', 'YOU WIN', true, 1),
  ('00000000-0000-0000-0000-00000000002a', E'2 4\n1 5 3 2', 'GAME OVER', false, 2),
  ('00000000-0000-0000-0000-00000000002a', E'10 3\n10 1 10', 'YOU WIN', false, 3),

  ('00000000-0000-0000-0000-00000000002b', E'2.0 4.0 7.5 8.0\n6.4', E'Media: 5.4\nAluno em exame.\nNota do exame: 6.4\nAluno aprovado.\nMedia final: 5.9', true, 1),
  ('00000000-0000-0000-0000-00000000002b', '10.0 10.0 10.0 10.0', E'Media: 10.0\nAluno aprovado.', false, 2),
  ('00000000-0000-0000-0000-00000000002b', '0.0 0.0 0.0 0.0', E'Media: 0.0\nAluno reprovado.', false, 3),
  ('00000000-0000-0000-0000-00000000002b', E'6.0 6.0 6.0 6.0\n2.0', E'Media: 6.0\nAluno em exame.\nNota do exame: 2.0\nAluno reprovado.\nMedia final: 4.0', false, 4),

  ('00000000-0000-0000-0000-00000000002c', '10.0 20.1 5.1', E'R1 = -0.29788\nR2 = -1.71212', true, 1),
  ('00000000-0000-0000-0000-00000000002c', '0 5 3', 'Impossivel calcular', false, 2),
  ('00000000-0000-0000-0000-00000000002c', '1 1 1', 'Impossivel calcular', false, 3),
  ('00000000-0000-0000-0000-00000000002c', '1 -3 2', E'R1 = 2.00000\nR2 = 1.00000', false, 4),

  ('00000000-0000-0000-0000-00000000002d', '4.5 -2.2', 'Q4', true, 1),
  ('00000000-0000-0000-0000-00000000002d', '0 0', 'Origem', false, 2),
  ('00000000-0000-0000-0000-00000000002d', '3.0 0.0', 'Eixo X', false, 3),

  ('00000000-0000-0000-0000-00000000002e', '10', 'A', true, 1),
  ('00000000-0000-0000-0000-00000000002e', '255', 'FF', false, 2),
  ('00000000-0000-0000-0000-00000000002e', '2000000000', '77359400', false, 3);
