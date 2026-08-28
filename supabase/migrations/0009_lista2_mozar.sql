-- Problemas da "Lista 2" (E/S formatada, aritmética, strings) — todos os casos
-- de teste foram verificados rodando o código de referência no compilador de
-- verdade (Wandbox/GCC), não calculados na mão.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000016',
  'salario',
  'Salário',
  E'Escreva um programa que leia o número de um funcionário, seu número de horas trabalhadas e o valor que recebe por hora, e calcule o salário desse funcionário.\n\nA seguir, mostre o número e o salário do funcionário, com duas casas decimais, no formato:\n\nNUMBER = <numero>\nSALARY = U$ <salario>',
  'Fácil',
  array['Formatação', 'Aritmética', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  22
),
(
  '00000000-0000-0000-0000-000000000017',
  'o-maior',
  'O Maior',
  E'Faça um programa que leia três valores inteiros e apresente o maior dos três valores lidos seguido da mensagem "eh o maior".\n\nUtilize a fórmula MaiorAB = (a + b + abs(a - b)) / 2 (com divisão inteira) para achar o maior entre dois valores, e aplique a mesma ideia para achar o maior entre os três.',
  'Fácil',
  array['Aritmética', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  23
),
(
  '00000000-0000-0000-0000-000000000018',
  'notas-e-moedas',
  'Notas e Moedas',
  E'Leia um valor de ponto flutuante com duas casas decimais, representando um valor monetário.\n\nCalcule o menor número de notas e moedas possível no qual o valor pode ser decomposto. As notas consideradas são de R$ 100, 50, 20, 10, 5 e 2. As moedas possíveis são de R$ 1, 0.50, 0.25, 0.10, 0.05 e 0.01.\n\nImprima "NOTAS:" seguido de uma linha por nota no formato "<quantidade> nota(s) de R$ <valor>", depois "MOEDAS:" seguido de uma linha por moeda no formato "<quantidade> moeda(s) de R$ <valor>" (nessa ordem, do maior valor pro menor).',
  'Difícil',
  array['Aritmética', 'Loops', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  24
),
(
  '00000000-0000-0000-0000-000000000019',
  'idade-em-dias',
  'Idade em Dias',
  E'Leia um valor inteiro correspondente à idade de uma pessoa em dias e informe-a em anos, meses e dias.\n\nPara simplificar o cálculo, considere todo ano com 365 dias e todo mês com 30 dias. Não haverá casos em que sobrem 12 meses ou mais de dias.\n\nImprima:\n\n<anos> ano(s)\n<meses> mes(es)\n<dias> dia(s)',
  'Fácil',
  array['Aritmética', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  25
),
(
  '00000000-0000-0000-0000-00000000001a',
  'gasto-de-combustivel',
  'Gasto de Combustível',
  E'Joãozinho quer calcular a quantidade de litros de combustível gastos em uma viagem, usando um automóvel que faz 12 km por litro.\n\nLeia o tempo gasto na viagem em horas (inteiro) e a velocidade média em km/h (inteiro). Calcule a distância percorrida e, a partir dela, quantos litros seriam necessários.\n\nImprima apenas o valor, com 3 casas decimais.',
  'Fácil',
  array['Aritmética', 'Formatação', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  26
),
(
  '00000000-0000-0000-0000-00000000001b',
  'lendo-e-pulando-nomes',
  'Entrada e Saída: Lendo e Pulando Nomes',
  E'Leia 10 nomes (palavras sem espaço em branco).\n\nImprima, em três linhas:\n\n1. O terceiro nome da lista\n2. O sétimo nome da lista\n3. O nono nome da lista',
  'Fácil',
  array['Strings', 'Loops', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  27
),
(
  '00000000-0000-0000-0000-00000000001c',
  'entrada-e-saida-numeros-inteiros',
  'Entrada e Saída de Números Inteiros',
  E'Leia três números inteiros A, B e C (em linhas separadas).\n\nImprima, nessa ordem:\n\n1. "A = <a>, B = <b>, C = <c>" sem nenhuma formatação especial.\n2. A mesma linha, mas com cada número ocupando um espaço de 10 colunas, alinhado à direita (padrão do C++).\n3. A mesma linha, com cada número ocupando 10 colunas, preenchido com zeros à esquerda (use setfill(\x27\x30\x27) e internal).\n4. A mesma linha, com cada número ocupando 10 colunas, alinhado à esquerda e preenchido com espaços.',
  'Médio',
  array['Formatação', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  28
),
(
  '00000000-0000-0000-0000-00000000001d',
  'entrada-e-saida-caracter',
  'Entrada e Saída de Carácter',
  E'Leia três caracteres A, B e C.\n\nImprima, em três linhas, as três rotações da ordem original:\n\n"A = <a>, B = <b>, C = <c>"\n"A = <b>, B = <c>, C = <a>"\n"A = <c>, B = <a>, C = <b>"',
  'Fácil',
  array['Strings', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  29
),
(
  '00000000-0000-0000-0000-00000000001e',
  'entrada-e-saida-cpf',
  'Entrada e Saída: CPF',
  E'Leia os dados de um CPF no formato XXX.YYY.ZZZ-DD (uma única linha, com pontos e traço).\n\nImprima os quatro grupos de números, um por linha, na ordem em que aparecem (sem os pontos e o traço).',
  'Médio',
  array['Strings', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  30
),
(
  '00000000-0000-0000-0000-00000000001f',
  'entrada-e-saida-com-virgula',
  'Entrada e Saída com Vírgula',
  E'Leia, até o fim da entrada, uma frase por linha — cada frase contém exatamente uma vírgula no meio do texto.\n\nPara cada linha lida, imprima:\n\n1. A parte da frase antes da vírgula.\n2. A parte da frase depois da vírgula (o texto pode conter um espaço logo após a vírgula — mantenha ele).',
  'Médio',
  array['Strings', 'Loops', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  31
),
(
  '00000000-0000-0000-0000-000000000020',
  'cedulas',
  'Cédulas',
  E'Leia um valor inteiro N (0 < N < 1000000).\n\nCalcule a menor quantidade de cédulas (notas) possível para compor esse valor. As notas consideradas são de 100, 50, 20, 10, 5, 2 e 1.\n\nImprima o valor lido e, em seguida, uma linha por nota no formato "<quantidade> nota(s) de R$ <valor>" (do maior valor pro menor). Não esqueça de imprimir o fim de linha após cada linha.',
  'Médio',
  array['Aritmética', 'Loops', 'Lista 2 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  32
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000016', E'25\n100\n5.50', E'NUMBER = 25\nSALARY = U$ 550.00', true, 1),
  ('00000000-0000-0000-0000-000000000016', E'1\n40\n10.00', E'NUMBER = 1\nSALARY = U$ 400.00', false, 2),
  ('00000000-0000-0000-0000-000000000016', E'7\n160\n7.25', E'NUMBER = 7\nSALARY = U$ 1160.00', false, 3),

  ('00000000-0000-0000-0000-000000000017', '7 14 106', '106 eh o maior', true, 1),
  ('00000000-0000-0000-0000-000000000017', '50 20 10', '50 eh o maior', false, 2),
  ('00000000-0000-0000-0000-000000000017', '3 3 3', '3 eh o maior', false, 3),

  ('00000000-0000-0000-0000-000000000018', '576.73', E'NOTAS:\n5 nota(s) de R$ 100.00\n1 nota(s) de R$ 50.00\n1 nota(s) de R$ 20.00\n0 nota(s) de R$ 10.00\n1 nota(s) de R$ 5.00\n0 nota(s) de R$ 2.00\nMOEDAS:\n1 moeda(s) de R$ 1.00\n1 moeda(s) de R$ 0.50\n0 moeda(s) de R$ 0.25\n2 moeda(s) de R$ 0.10\n0 moeda(s) de R$ 0.05\n3 moeda(s) de R$ 0.01', true, 1),
  ('00000000-0000-0000-0000-000000000018', '2.00', E'NOTAS:\n0 nota(s) de R$ 100.00\n0 nota(s) de R$ 50.00\n0 nota(s) de R$ 20.00\n0 nota(s) de R$ 10.00\n0 nota(s) de R$ 5.00\n1 nota(s) de R$ 2.00\nMOEDAS:\n0 moeda(s) de R$ 1.00\n0 moeda(s) de R$ 0.50\n0 moeda(s) de R$ 0.25\n0 moeda(s) de R$ 0.10\n0 moeda(s) de R$ 0.05\n0 moeda(s) de R$ 0.01', false, 2),
  ('00000000-0000-0000-0000-000000000018', '0.07', E'NOTAS:\n0 nota(s) de R$ 100.00\n0 nota(s) de R$ 50.00\n0 nota(s) de R$ 20.00\n0 nota(s) de R$ 10.00\n0 nota(s) de R$ 5.00\n0 nota(s) de R$ 2.00\nMOEDAS:\n0 moeda(s) de R$ 1.00\n0 moeda(s) de R$ 0.50\n0 moeda(s) de R$ 0.25\n0 moeda(s) de R$ 0.10\n1 moeda(s) de R$ 0.05\n2 moeda(s) de R$ 0.01', false, 3),

  ('00000000-0000-0000-0000-000000000019', '400', E'1 ano(s)\n1 mes(es)\n5 dia(s)', true, 1),
  ('00000000-0000-0000-0000-000000000019', '0', E'0 ano(s)\n0 mes(es)\n0 dia(s)', false, 2),
  ('00000000-0000-0000-0000-000000000019', '1000', E'2 ano(s)\n9 mes(es)\n0 dia(s)', false, 3),

  ('00000000-0000-0000-0000-00000000001a', '10 85', '70.833', true, 1),
  ('00000000-0000-0000-0000-00000000001a', '1 12', '1.000', false, 2),
  ('00000000-0000-0000-0000-00000000001a', '5 100', '41.667', false, 3),

  ('00000000-0000-0000-0000-00000000001b', E'UFPE\nUSP\nUFCG\nUFRN\nUFRJ\nIME\nITA\nURI\nUNB\nUFC', E'UFCG\nITA\nUNB', true, 1),
  ('00000000-0000-0000-0000-00000000001b', E'A\nB\nC\nD\nE\nF\nG\nH\nI\nJ', E'C\nG\nI', false, 2),
  ('00000000-0000-0000-0000-00000000001b', E'um\ndois\ntres\nquatro\ncinco\nseis\nsete\noito\nnove\ndez', E'tres\nsete\nnove', false, 3),

  ('00000000-0000-0000-0000-00000000001c', E'1234\n12\n123', E'A = 1234, B = 12, C = 123\nA =       1234, B =         12, C =        123\nA = 0000001234, B = 0000000012, C = 0000000123\nA = 1234      , B = 12        , C = 123', true, 1),
  ('00000000-0000-0000-0000-00000000001c', E'-7\n3\n50', E'A = -7, B = 3, C = 50\nA =         -7, B =          3, C =         50\nA = -000000007, B = 0000000003, C = 0000000050\nA = -7        , B = 3         , C = 50', false, 2),

  ('00000000-0000-0000-0000-00000000001d', E'a\nb\nc', E'A = a, B = b, C = c\nA = b, B = c, C = a\nA = c, B = a, C = b', true, 1),
  ('00000000-0000-0000-0000-00000000001d', E'x\ny\nz', E'A = x, B = y, C = z\nA = y, B = z, C = x\nA = z, B = x, C = y', false, 2),

  ('00000000-0000-0000-0000-00000000001e', '123.456.789-00', E'123\n456\n789\n00', true, 1),
  ('00000000-0000-0000-0000-00000000001e', '000.000.000-00', E'000\n000\n000\n00', false, 2),

  ('00000000-0000-0000-0000-00000000001f', 'O URI, eh o melhor', E'O URI\n eh o melhor', true, 1),
  ('00000000-0000-0000-0000-00000000001f', E'Ola, mundo\nTeste, dois', E'Ola\n mundo\nTeste\n dois', false, 2),

  ('00000000-0000-0000-0000-000000000020', '576', E'576\n5 nota(s) de R$ 100,00\n1 nota(s) de R$ 50,00\n1 nota(s) de R$ 20,00\n0 nota(s) de R$ 10,00\n1 nota(s) de R$ 5,00\n0 nota(s) de R$ 2,00\n1 nota(s) de R$ 1,00', true, 1),
  ('00000000-0000-0000-0000-000000000020', '1', E'1\n0 nota(s) de R$ 100,00\n0 nota(s) de R$ 50,00\n0 nota(s) de R$ 20,00\n0 nota(s) de R$ 10,00\n0 nota(s) de R$ 5,00\n0 nota(s) de R$ 2,00\n1 nota(s) de R$ 1,00', false, 2),
  ('00000000-0000-0000-0000-000000000020', '999', E'999\n9 nota(s) de R$ 100,00\n1 nota(s) de R$ 50,00\n2 nota(s) de R$ 20,00\n0 nota(s) de R$ 10,00\n1 nota(s) de R$ 5,00\n2 nota(s) de R$ 2,00\n0 nota(s) de R$ 1,00', false, 3);
