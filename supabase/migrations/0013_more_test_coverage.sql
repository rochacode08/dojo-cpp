-- Casos de teste adicionais pra cobrir os ramos/regras do enunciado que ainda
-- não tinham teste (limites, branches de if/switch não exercitados, negativos,
-- resultado vazio, etc). Todos verificados rodando a solução de referência no
-- compilador de verdade (Wandbox/GCC), não calculados na mão.

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  -- filtragem-de-vetores-com-loops: negativos (par negativo também conta)
  ('00000000-0000-0000-0000-000000000001', E'4\n-2 -3 -4 5', '-2 -4', false, 10),

  -- contando-vogais: maiúsculas e minúsculas misturadas
  ('00000000-0000-0000-0000-000000000002', 'Ubuntu', '3', false, 10),

  -- pilha-de-chamados: esvaziar, ficar vazia, empilhar de novo
  ('00000000-0000-0000-0000-000000000003', E'6\nE 1\nD\nD\nE 2\nE 3\nD', E'1\nVAZIA\n3', false, 10),

  -- maior-e-menor-do-vetor: todos os valores iguais
  ('00000000-0000-0000-0000-000000000004', E'4\n5 5 5 5', '5 5', false, 10),

  -- fatorial-recursivo: n = 1
  ('00000000-0000-0000-0000-000000000005', '1', '1', false, 10),

  -- validador-de-senha: exatamente 8 caracteres, válida (limite)
  ('00000000-0000-0000-0000-000000000006', 'Abcdefg1', 'VALIDA', false, 10),

  -- frequencia-de-numeros: múltiplos valores distintos, ordem crescente
  ('00000000-0000-0000-0000-000000000007', E'6\n10 5 10 1 5 5', E'1 aparece 1 vez(es)\n5 aparece 3 vez(es)\n10 aparece 2 vez(es)', false, 10),

  -- selecao-em-vetor: nenhum valor qualifica (saída vazia)
  ('00000000-0000-0000-0000-000000000009', E'2 1.0\n5.0 6.0', '', false, 10),

  -- ordenacao-por-tamanho: uma única palavra
  ('00000000-0000-0000-0000-00000000000a', E'1\nabc', 'abc', false, 10),

  -- coluna-na-matriz: média com resultado quebrado
  ('00000000-0000-0000-0000-00000000000b', E'2 2\n1 2\n2 3\n0 M', '1.50', false, 10),

  -- lanchonete: código 2 e código 4 (ramos ainda não testados)
  ('00000000-0000-0000-0000-00000000000e', '2 1', 'Total: R$ 4.50', false, 10),
  ('00000000-0000-0000-0000-00000000000e', '4 10', 'Total: R$ 20.00', false, 11),

  -- tabuada: n = 0
  ('00000000-0000-0000-0000-000000000010', '0', E'1 x 0 = 0\n2 x 0 = 0\n3 x 0 = 0\n4 x 0 = 0\n5 x 0 = 0\n6 x 0 = 0\n7 x 0 = 0\n8 x 0 = 0\n9 x 0 = 0\n10 x 0 = 0', false, 10),

  -- numeros-positivos: inclui zeros (regra é >= 0)
  ('00000000-0000-0000-0000-000000000011', E'0 2 0 3 -1 9', '5 valores positivos', false, 10),

  -- intervalo: limites exatos e o ramo (25,50] ainda não testado
  ('00000000-0000-0000-0000-000000000012', '25', 'Intervalo [0,25]', false, 10),
  ('00000000-0000-0000-0000-000000000012', '40', 'Intervalo (25,50]', false, 11),
  ('00000000-0000-0000-0000-000000000012', '90', 'Intervalo (75,100]', false, 12),
  ('00000000-0000-0000-0000-000000000012', '0', 'Intervalo [0,25]', false, 13),

  -- quadrante-do-ponto: Eixo Y, Q1, Q2 (ramos ainda não testados)
  ('00000000-0000-0000-0000-000000000013', '0 5', 'Eixo Y', false, 10),
  ('00000000-0000-0000-0000-000000000013', '3 4', 'Q1', false, 11),
  ('00000000-0000-0000-0000-000000000013', '-3 4', 'Q2', false, 12),

  -- soma-de-impares-no-intervalo: intervalo cruzando o zero
  ('00000000-0000-0000-0000-000000000014', E'-5\n5', '0', false, 10),

  -- menu-com-switch-case: opções 2 e 4 (ramos ainda não testados)
  ('00000000-0000-0000-0000-000000000015', '2', 'Desligar', false, 10),
  ('00000000-0000-0000-0000-000000000015', '4', 'Cancelar', false, 11),

  -- o-maior: valores negativos
  ('00000000-0000-0000-0000-000000000017', '-5 -2 -10', '-2 eh o maior', false, 10),

  -- entrada-e-saida-numeros-inteiros: todos zero
  ('00000000-0000-0000-0000-00000000001c', E'0\n0\n0', E'A = 0, B = 0, C = 0\nA =          0, B =          0, C =          0\nA = 0000000000, B = 0000000000, C = 0000000000\nA = 0         , B = 0         , C = 0', false, 10),

  -- entrada-e-saida-caracter: os três caracteres iguais
  ('00000000-0000-0000-0000-00000000001d', E'a\na\na', E'A = a, B = a, C = a\nA = a, B = a, C = a\nA = a, B = a, C = a', false, 10),

  -- entrada-e-saida-cpf: outro conjunto de dígitos
  ('00000000-0000-0000-0000-00000000001e', '111.222.333-44', E'111\n222\n333\n44', false, 10),

  -- extremamente-basico: soma com resultado negativo
  ('00000000-0000-0000-0000-000000000021', '-5 3', 'X = -2', false, 10),

  -- soma-simples: dois negativos
  ('00000000-0000-0000-0000-000000000022', E'-3\n-7', 'SOMA = -10', false, 10),

  -- produto-simples: produto por zero
  ('00000000-0000-0000-0000-000000000023', '0 100', 'PROD = 0', false, 10),

  -- media-1: notas zero
  ('00000000-0000-0000-0000-000000000024', '0 0', 'MEDIA = 0.00000', false, 10),

  -- media-2: notas zero
  ('00000000-0000-0000-0000-000000000025', '0 0 0', 'MEDIA = 0.0', false, 10),

  -- diferenca: resultado negativo
  ('00000000-0000-0000-0000-000000000026', '1 2 3 4', 'DIFERENCA = -10', false, 10),

  -- soma-de-impares-consecutivos-i: intervalo cruzando o zero
  ('00000000-0000-0000-0000-000000000029', E'-5\n5', '0', false, 10),

  -- pula-sapo: caso mínimo (2 canos) vencível
  ('00000000-0000-0000-0000-00000000002a', E'1 2\n5 5', 'YOU WIN', false, 10),

  -- coordenadas-de-um-ponto: Eixo Y, Q1, Q2 (ramos ainda não testados)
  ('00000000-0000-0000-0000-00000000002d', '0 5', 'Eixo Y', false, 10),
  ('00000000-0000-0000-0000-00000000002d', '3 4', 'Q1', false, 11),
  ('00000000-0000-0000-0000-00000000002d', '-3 4', 'Q2', false, 12),

  -- converter-para-hexadecimal: menor valor possível
  ('00000000-0000-0000-0000-00000000002e', '1', '1', false, 10);
