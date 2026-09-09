-- Lista 4 do prof. Mozar: repetição, seleção com tabela, vetores, matrizes e
-- strings. 24 problemas.
--
-- Saídas esperadas geradas executando uma solução de referência de cada
-- problema no GCC 13.2 (não foram digitadas à mão). Onde o enunciado traz um
-- exemplo de saída, ele foi comparado com o resultado da referência.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-00000000002f',
  E'numeros-impares',
  E'Números Ímpares',
  E'Leia um valor inteiro X (1 ≤ X ≤ 1000). Em seguida mostre os ímpares de 1 até X, um valor por linha, inclusive o X, se for o caso.\n\nEntrada: um valor inteiro qualquer.\n\nSaída: todos os valores ímpares de 1 até X, inclusive X, se for o caso.',
  E'Fácil',
  array[E'Loops', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  47
),
(
  '00000000-0000-0000-0000-000000000030',
  E'pares-entre-cinco-numeros',
  E'Pares entre Cinco Números',
  E'Faça um programa que leia 5 valores inteiros. Conte quantos destes valores digitados são pares e mostre esta informação.\n\nEntrada: 5 valores inteiros quaisquer.\n\nSaída: a mensagem indicando a quantidade de valores pares lidos, conforme o exemplo.',
  E'Fácil',
  array[E'Loops', E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  48
),
(
  '00000000-0000-0000-0000-000000000031',
  E'fatorial-simples',
  E'Fatorial Simples',
  E'Ler um valor N. Calcular e escrever seu respectivo fatorial. Fatorial de N = N × (N-1) × (N-2) × (N-3) × ... × 1.\n\nEntrada: um valor inteiro N (0 < N < 13).\n\nSaída: um valor inteiro correspondente ao fatorial de N.',
  E'Fácil',
  array[E'Loops', E'Aritmética', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  49
),
(
  '00000000-0000-0000-0000-000000000032',
  E'pum',
  E'PUM',
  E'Escreva um programa que leia um valor inteiro N. Este N é a quantidade de linhas de saída que serão apresentadas na execução do programa.\n\nEntrada: um número inteiro positivo N.\n\nSaída: conforme o exemplo — a cada linha, três números em sequência seguidos de PUM, pulando o quarto número.',
  E'Fácil',
  array[E'Loops', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  50
),
(
  '00000000-0000-0000-0000-000000000033',
  E'mes-por-extenso',
  E'Mês',
  E'Leia um valor inteiro entre 1 e 12, inclusive. Correspondente a este valor, deve ser apresentado como resposta o mês do ano por extenso, em inglês, com a primeira letra maiúscula.\n\nEntrada: um único valor inteiro.\n\nSaída: o nome do mês por extenso correspondente ao número da entrada, com a primeira letra em maiúscula.',
  E'Fácil',
  array[E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  51
),
(
  '00000000-0000-0000-0000-000000000034',
  E'ddd',
  E'DDD',
  E'Leia um número inteiro que representa um código de DDD para discagem interurbana. Em seguida, informe a qual cidade o DDD pertence, considerando a tabela abaixo:\n\n61 = Brasilia\n71 = Salvador\n11 = Sao Paulo\n21 = Rio de Janeiro\n32 = Juiz de Fora\n19 = Campinas\n27 = Vitoria\n31 = Belo Horizonte\n\nSe a entrada for qualquer outro DDD que não esteja na tabela, o programa deverá informar: DDD nao cadastrado\n\nEntrada: um único valor inteiro.\n\nSaída: o nome da cidade correspondente, ou a mensagem de DDD não cadastrado.',
  E'Fácil',
  array[E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  52
),
(
  '00000000-0000-0000-0000-000000000035',
  E'lanche',
  E'Lanche',
  E'Com base na tabela abaixo, escreva um programa que leia o código de um item e a quantidade deste item. A seguir, calcule e mostre o valor da conta a pagar.\n\n1 = Cachorro Quente, R$ 4.00\n2 = X-Salada, R$ 4.50\n3 = X-Bacon, R$ 5.00\n4 = Torrada simples, R$ 2.00\n5 = Refrigerante, R$ 1.50\n\nEntrada: dois valores inteiros correspondentes ao código e à quantidade de um item.\n\nSaída: a mensagem "Total: R$ " seguida pelo valor a ser pago, com 2 casas após o ponto decimal.',
  E'Fácil',
  array[E'Condicionais', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  53
),
(
  '00000000-0000-0000-0000-000000000036',
  E'tcc-depressao-natalino',
  E'TCC da Depressão Natalino',
  E'Larissa é uma acadêmica muito inteligente e estudiosa, e por isso é engajada em várias atividades. Chegou o final do ano, mês da apresentação do TCC. Ela, muito atarefada, precisa saber se vai conseguir realizar sua apresentação antes do Natal. Mas antes de apresentar, deve passar por uma verificação com sua orientadora, a Prof. Takanada.\n\nEntrada: um valor E (0 < E < 25) representando o dia em que o TCC foi entregue para verificação, e um valor D (0 < D < 25) representando a data final para entregar para verificação.\n\nRegras:\n- Se a entrega passou do prazo (E > D), não há orientação possível: imprima "Eu odeio a professora!"\n- Se ela entregou com 3 dias ou mais de antecedência (D - E >= 3), imprima "Muito bem! Apresenta antes do Natal!"\n- Caso contrário (entregou em cima do prazo), imprima "Parece o trabalho do meu filho!". Nesse caso são adicionados mais dois dias para correções; se a data final somada aos dois dias for menor que 24, imprima também "TCC Apresentado!", caso contrário imprima "Fail! Entao eh nataaaaal!"',
  E'Médio',
  array[E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  54
),
(
  '00000000-0000-0000-0000-000000000037',
  E'animal',
  E'Animal',
  E'Leia 3 palavras que definem o tipo de animal possível, segundo o esquema abaixo, da esquerda para a direita. Em seguida conclua qual dos animais foi escolhido através das três palavras fornecidas.\n\nvertebrado / ave / carnivoro = aguia\nvertebrado / ave / onivoro = pomba\nvertebrado / mamifero / onivoro = homem\nvertebrado / mamifero / herbivoro = vaca\ninvertebrado / inseto / hematofago = pulga\ninvertebrado / inseto / herbivoro = lagarta\ninvertebrado / anelideo / hematofago = sanguessuga\ninvertebrado / anelideo / onivoro = minhoca\n\nEntrada: 3 palavras, uma em cada linha, todas em letras minúsculas.\n\nSaída: o nome do animal correspondente à entrada fornecida.',
  E'Médio',
  array[E'Condicionais', E'Strings', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  55
),
(
  '00000000-0000-0000-0000-000000000038',
  E'desvendando-monty-hall',
  E'Desvendando Monty Hall',
  E'Há três portas fechadas: porta 1, porta 2 e porta 3. Atrás de uma delas há um carro; atrás das outras duas, bodes. O jogador escolhe uma porta. Como só há um carro, atrás de pelo menos uma das duas portas não escolhidas há um bode. O apresentador então abre uma das portas não escolhidas que contém um bode e pergunta se o jogador quer trocar de porta.\n\nVamos simular esse jogo milhares de vezes e contar quantas vezes o jogador ganhou o carro, supondo que:\n- O jogador sempre escolhe inicialmente a porta 1;\n- O jogador sempre troca de porta depois que o apresentador revela um bode.\n\nEntrada: a primeira linha contém um inteiro N (1 ≤ N ≤ 10000), o número de jogos. Cada uma das N linhas seguintes contém um inteiro 1, 2 ou 3, representando a porta que contém o carro naquele jogo.\n\nSaída: uma única linha com o número de vezes que o jogador ganhou o carro.',
  E'Médio',
  array[E'Loops', E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  56
),
(
  '00000000-0000-0000-0000-000000000039',
  E'fibonacci-facil',
  E'Fibonacci Fácil',
  E'A sequência 0 1 1 2 3 5 8 13 21... é conhecida como série de Fibonacci. Nessa sequência, cada número, depois dos 2 primeiros, é igual à soma dos 2 anteriores. Escreva um algoritmo que leia um inteiro N (N < 46) e mostre os N primeiros números dessa série.\n\nEntrada: um valor inteiro N (0 < N < 46).\n\nSaída: os valores mostrados na mesma linha, separados por um espaço em branco. Não deve haver espaço após o último valor.',
  E'Médio',
  array[E'Loops', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  57
),
(
  '00000000-0000-0000-0000-00000000003a',
  E'grenais',
  E'Grenais',
  E'A Federação Gaúcha de Futebol contratou você para escrever um programa que faça uma estatística do resultado de vários GRENAIS. Leia o número de gols marcados pelo Inter e pelo Grêmio em um GRENAL. Logo após, escreva a mensagem "Novo grenal (1-sim 2-nao)" e solicite uma resposta. Se a resposta for 1, o algoritmo deve ser executado novamente solicitando o número de gols de uma nova partida; caso contrário deve ser encerrado imprimindo:\n\n- Quantos GRENAIS fizeram parte da estatística\n- O número de vitórias do Inter\n- O número de vitórias do Grêmio\n- O número de Empates\n- Uma mensagem indicando qual time venceu o maior número de GRENAIS, ou "Nao houve vencedor" caso termine empatado\n\nEntrada: 2 valores inteiros correspondentes aos gols do Inter e do Grêmio. Em seguida um inteiro (1 ou 2) correspondente à repetição do programa.\n\nSaída: após cada leitura dos gols, imprima "Novo grenal (1-sim 2-nao)". Ao encerrar, mostre as estatísticas. A palavra Gremio deve ser impressa sem acento.',
  E'Médio',
  array[E'Loops', E'Condicionais', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  58
),
(
  '00000000-0000-0000-0000-00000000003b',
  E'preenchimento-de-vetor-i',
  E'Preenchimento de Vetor I',
  E'Leia um valor e faça um programa que coloque o valor lido na primeira posição de um vetor N[10]. Em cada posição subsequente, coloque o dobro do valor da posição anterior. Por exemplo, se o valor lido for 1, os valores do vetor devem ser 1, 2, 4, 8 e assim sucessivamente. Mostre o vetor em seguida.\n\nEntrada: um valor inteiro (V ≤ 50).\n\nSaída: para cada posição do vetor, escreva "N[i] = X", onde i é a posição e X é o valor armazenado. O primeiro número (N[0]) recebe o valor de V.',
  E'Fácil',
  array[E'Vetores', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  59
),
(
  '00000000-0000-0000-0000-00000000003c',
  E'preenchimento-de-vetor-ii',
  E'Preenchimento de Vetor II',
  E'Faça um programa que leia um valor T e preencha um vetor N[1000] com a sequência de valores de 0 até T-1 repetidas vezes. Imprima o vetor N.\n\nPor exemplo, com T = 3 o vetor fica 0, 1, 2, 0, 1, 2, 0, 1, 2, e assim por diante até a posição 999.\n\nEntrada: um valor inteiro T (2 ≤ T ≤ 50).\n\nSaída: para cada posição do vetor, escreva "N[i] = x".',
  E'Fácil',
  array[E'Vetores', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  60
),
(
  '00000000-0000-0000-0000-00000000003d',
  E'album-da-copa',
  E'Álbum da Copa',
  E'O álbum contém espaços numerados de 1 a N para colar figurinhas; cada figurinha, também numerada de 1 a N, é a foto de um jogador. O objetivo é colar todas as figurinhas nos respectivos espaços.\n\nAs figurinhas são vendidas em envelopes fechados, então o comprador não sabe quais está comprando, e pode ocorrer de comprar uma figurinha que já tenha colado.\n\nDados o número total de espaços e figurinhas do álbum, e uma lista das figurinhas já compradas (que pode conter repetidas), determine quantas figurinhas faltam para completar o álbum.\n\nEntrada: a primeira linha contém um inteiro N (1 ≤ N ≤ 100) indicando o número total de figurinhas e espaços. A segunda linha contém um inteiro M (1 ≤ M ≤ 300) indicando o número de figurinhas já compradas. Cada uma das M linhas seguintes contém um inteiro X (1 ≤ X ≤ N) indicando uma figurinha já comprada.\n\nSaída: uma única linha contendo o número de figurinhas que falta.',
  E'Médio',
  array[E'Vetores', E'Loops', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  61
),
(
  '00000000-0000-0000-0000-00000000003e',
  E'fibonacci-em-vetor-60',
  E'Fibonacci em Vetor',
  E'Faça um programa que leia um valor e apresente o número de Fibonacci correspondente a este valor lido. Lembre que os 2 primeiros elementos da série são 0 e 1, e cada próximo termo é a soma dos 2 anteriores. Todos os valores calculados devem caber em um inteiro de 64 bits sem sinal.\n\nEntrada: a primeira linha contém um inteiro T, o número de casos de teste. Cada caso contém um único inteiro N (0 ≤ N ≤ 60), correspondente ao N-ésimo termo da série.\n\nSaída: para cada caso de teste, imprima a mensagem "Fib(N) = X", onde X é o N-ésimo termo da série.\n\nObs: o dojo ja tem um "Fibonacci em Vetor" mais simples, que vai so ate Fib(30) e ja vem com parte do codigo pronta. Este aqui e do zero e vai ate Fib(60), que nao cabe mais num int.',
  E'Médio',
  array[E'Vetores', E'Loops', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  62
),
(
  '00000000-0000-0000-0000-00000000003f',
  E'preenchimento-de-vetor-iv',
  E'Preenchimento de Vetor IV',
  E'Leia 15 valores e coloque-os em 2 vetores conforme forem pares ou ímpares. O tamanho de cada um dos dois vetores é de 5 posições. Cada vez que um dos dois vetores encher, imprima todo o vetor e utilize-o novamente para os próximos números lidos. Terminada a leitura, imprima o conteúdo que restou em cada um dos dois vetores, imprimindo primeiro os valores do vetor ímpar. Cada vetor pode ser preenchido tantas vezes quantas forem necessárias.\n\nEntrada: 15 números inteiros.\n\nSaída: conforme o exemplo, no formato "par[i] = X" e "impar[i] = X".',
  E'Difícil',
  array[E'Vetores', E'Loops', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  63
),
(
  '00000000-0000-0000-0000-000000000040',
  E'linha-na-matriz',
  E'Linha na Matriz',
  E'Leia um número indicando uma linha da matriz na qual uma operação deve ser realizada, um caractere maiúsculo indicando a operação, e todos os elementos da matriz M[12][12] de ponto flutuante de dupla precisão. Em seguida, calcule e mostre a soma ou a média dos elementos que estão na linha indicada.\n\nA matriz é preenchida linha por linha, da linha 0 até a linha 11, sempre da esquerda para a direita.\n\nEntrada: a primeira linha contém um número L (0 ≤ L ≤ 11) indicando a linha considerada. A segunda linha contém um único caractere maiúsculo T (''S'' ou ''M''), indicando a operação (Soma ou Média). Seguem os 144 valores de ponto flutuante que compõem a matriz.\n\nSaída: o resultado solicitado, com 1 casa após o ponto decimal.',
  E'Médio',
  array[E'Matrizes', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  64
),
(
  '00000000-0000-0000-0000-000000000041',
  E'abaixo-da-diagonal-principal',
  E'Abaixo da Diagonal Principal',
  E'Leia um caractere maiúsculo, que indica uma operação a ser realizada, e uma matriz M[12][12] de ponto flutuante de dupla precisão. Em seguida, calcule e mostre a soma ou a média considerando somente os elementos que estão abaixo da diagonal principal da matriz.\n\nAbaixo da diagonal principal são os elementos em que a linha é maior que a coluna (i > j).\n\nEntrada: a primeira linha contém um único caractere maiúsculo O (''S'' ou ''M''), indicando a operação (Soma ou Média). Seguem os 144 valores de ponto flutuante que compõem a matriz.\n\nSaída: o resultado solicitado, com 1 casa após o ponto decimal.',
  E'Médio',
  array[E'Matrizes', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  65
),
(
  '00000000-0000-0000-0000-000000000042',
  E'area-superior',
  E'Área Superior',
  E'Leia um caractere maiúsculo, que indica uma operação a ser realizada, e uma matriz M[12][12] de ponto flutuante de dupla precisão. Em seguida, calcule e mostre a soma ou a média considerando somente os elementos que estão na área superior da matriz.\n\nA área superior é o triângulo estritamente entre as duas diagonais, na parte de cima. As duas diagonais ficam de fora. A condição é: i < j e i + j < 11.\n\nSão 30 elementos ao todo: 10 na linha 0, 8 na linha 1, 6 na linha 2, 4 na linha 3, 2 na linha 4, e nenhum da linha 5 em diante.\n\nEntrada: a primeira linha contém um único caractere maiúsculo O (''S'' ou ''M''), indicando a operação (Soma ou Média). Seguem os 144 valores de ponto flutuante que compõem a matriz.\n\nSaída: o resultado solicitado, com 1 casa após o ponto decimal.',
  E'Difícil',
  array[E'Matrizes', E'Formatação', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  66
),
(
  '00000000-0000-0000-0000-000000000043',
  E'crescimento-populacional',
  E'Crescimento Populacional',
  E'Dadas as informações de população e a taxa de crescimento de duas cidades A e B, determine quantos anos levará para que a cidade menor (sempre a cidade A) ultrapasse a cidade B em população. Os casos de teste fornecidos já têm a taxa de crescimento maior para a cidade A.\n\nEm alguns casos o tempo pode ser muito grande. Nessa situação, informe a mensagem "Mais de 1 seculo."\n\nEntrada: a primeira linha contém um único inteiro T, o número de casos de teste. Cada caso contém 4 números: dois inteiros PA e PB (100 ≤ PA < PB ≤ 1000000) indicando a população de A e B, e dois valores G1 e G2 (0.1 ≤ G1 ≤ 10.0, 0.0 ≤ G2 ≤ 10.0, G2 < G1) com um dígito após o ponto decimal, indicando o crescimento populacional de A e B em percentual.\n\nAtenção: a população é sempre um valor inteiro. Um crescimento de 2.5% sobre 100 pessoas resulta em 102 pessoas, e não 102.5; um crescimento de 2.5% sobre 1000 resulta em 1025. Além disso, não utilize variáveis de precisão simples para as taxas.\n\nSaída: para cada caso de teste, quantos anos levará para que A ultrapasse B, no formato "N anos." Se o tempo for mais de 100 anos, apresente "Mais de 1 seculo." Interrompa o cálculo imediatamente após passar de 100 anos.',
  E'Difícil',
  array[E'Loops', E'Aritmética', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  67
),
(
  '00000000-0000-0000-0000-000000000044',
  E'sentenca-dancante',
  E'Sentença Dançante',
  E'Uma sentença é chamada de dançante se sua primeira letra for maiúscula e cada letra subsequente for o oposto da letra anterior. Espaços devem ser ignorados ao determinar o case da letra. Por exemplo, "A b Cd" é uma sentença dançante porque a primeira letra é maiúscula, a próxima é minúscula, a próxima é maiúscula, e a próxima é minúscula.\n\nEntrada: vários casos de teste, até o fim da entrada. Cada caso é composto por uma linha com uma sentença, entre 1 e 50 caracteres (''A''-''Z'', ''a''-''z'' ou espaço '' ''), com no mínimo uma letra.\n\nSaída: transforme a sentença em dançante, trocando as letras para minúscula ou maiúscula onde for necessário. Todos os espaços da sentença original devem ser preservados — " sentence " deve virar " SeNtEnCe ".',
  E'Difícil',
  array[E'Strings', E'Loops', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  68
),
(
  '00000000-0000-0000-0000-000000000045',
  E'cifra-de-cesar',
  E'Cifra de César',
  E'Júlio César usava um sistema de criptografia, hoje conhecido como Cifra de César, que trocava cada letra pelo equivalente em duas posições à esquerda no alfabeto (por exemplo, ''C'' vira ''A'', ''T'' vira ''R''). No começo do alfabeto voltamos para o fim, isto é, ''A'' vira ''Y''. Podemos, é claro, trocar as letras com qualquer número de posições.\n\nEntrada: a primeira linha contém um inteiro N indicando a quantidade de casos. Cada caso é composto por duas linhas. A primeira contém uma string com caracteres maiúsculos (''A''-''Z''), que é a sentença já cifrada. A segunda linha contém um inteiro de 0 a 25 e representa quantas posições cada letra foi deslocada para a direita ao cifrar.\n\nSaída: para cada caso de teste, imprima uma linha com o texto decodificado — ou seja, deslocando cada letra de volta para a esquerda pelo número dado.',
  E'Difícil',
  array[E'Strings', E'Aritmética', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  69
),
(
  '00000000-0000-0000-0000-000000000046',
  E'de-dentro-para-fora',
  E'De Dentro para Fora',
  E'Sua impressora foi infectada por um vírus e está imprimindo cada linha de dentro para fora. A metade esquerda de cada linha está sendo impressa a partir do meio da página até a margem esquerda. Do mesmo modo, a metade direita de cada linha está sendo impressa a partir da margem direita e prosseguindo em direção ao centro da página.\n\nPor exemplo, a linha "THIS LINE IS GIBBERISH" está sendo impressa como "I ENIL SIHTHSIREBBIG S".\n\nSua tarefa é desembaralhar a string a partir da forma como ela foi impressa para sua forma original. Você pode assumir que cada linha conterá um número par de caracteres.\n\nEntrada: a primeira linha contém um inteiro N indicando a quantidade de casos. Seguem N linhas, cada uma com uma frase de no mínimo 2 e no máximo 100 caracteres, letras maiúsculas e espaços.\n\nSaída: para cada linha de entrada, imprima uma linha com a frase decifrada.\n\nAtenção: espaços no fim da linha fazem parte da frase e devem ser preservados.',
  E'Difícil',
  array[E'Strings', E'Lista 4 Mozar'],
  E'#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  2000,
  256,
  70
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index)
values
  ('00000000-0000-0000-0000-00000000002f', E'8', E'1\n3\n5\n7', true, 1),
  ('00000000-0000-0000-0000-00000000002f', E'1', E'1', false, 2),
  ('00000000-0000-0000-0000-00000000002f', E'9', E'1\n3\n5\n7\n9', false, 3),
  ('00000000-0000-0000-0000-00000000002f', E'2', E'1', false, 4),
  ('00000000-0000-0000-0000-00000000002f', E'15', E'1\n3\n5\n7\n9\n11\n13\n15', false, 5),
  ('00000000-0000-0000-0000-000000000030', E'7\n-5\n6\n-4\n12', E'3 valores pares', true, 1),
  ('00000000-0000-0000-0000-000000000030', E'1\n3\n5\n7\n9', E'0 valores pares', false, 2),
  ('00000000-0000-0000-0000-000000000030', E'2\n4\n6\n8\n10', E'5 valores pares', false, 3),
  ('00000000-0000-0000-0000-000000000030', E'0\n-1\n-2\n-3\n-4', E'3 valores pares', false, 4),
  ('00000000-0000-0000-0000-000000000031', E'4', E'24', true, 1),
  ('00000000-0000-0000-0000-000000000031', E'1', E'1', false, 2),
  ('00000000-0000-0000-0000-000000000031', E'12', E'479001600', false, 3),
  ('00000000-0000-0000-0000-000000000031', E'7', E'5040', false, 4),
  ('00000000-0000-0000-0000-000000000032', E'7', E'1 2 3 PUM\n5 6 7 PUM\n9 10 11 PUM\n13 14 15 PUM\n17 18 19 PUM\n21 22 23 PUM\n25 26 27 PUM', true, 1),
  ('00000000-0000-0000-0000-000000000032', E'1', E'1 2 3 PUM', false, 2),
  ('00000000-0000-0000-0000-000000000032', E'3', E'1 2 3 PUM\n5 6 7 PUM\n9 10 11 PUM', false, 3),
  ('00000000-0000-0000-0000-000000000033', E'4', E'April', true, 1),
  ('00000000-0000-0000-0000-000000000033', E'1', E'January', false, 2),
  ('00000000-0000-0000-0000-000000000033', E'12', E'December', false, 3),
  ('00000000-0000-0000-0000-000000000033', E'9', E'September', false, 4),
  ('00000000-0000-0000-0000-000000000034', E'11', E'Sao Paulo', true, 1),
  ('00000000-0000-0000-0000-000000000034', E'61', E'Brasilia', false, 2),
  ('00000000-0000-0000-0000-000000000034', E'99', E'DDD nao cadastrado', false, 3),
  ('00000000-0000-0000-0000-000000000034', E'31', E'Belo Horizonte', false, 4),
  ('00000000-0000-0000-0000-000000000034', E'32', E'Juiz de Fora', false, 5),
  ('00000000-0000-0000-0000-000000000035', E'3 2', E'Total: R$ 10.00', true, 1),
  ('00000000-0000-0000-0000-000000000035', E'1 1', E'Total: R$ 4.00', false, 2),
  ('00000000-0000-0000-0000-000000000035', E'2 3', E'Total: R$ 13.50', false, 3),
  ('00000000-0000-0000-0000-000000000035', E'5 7', E'Total: R$ 10.50', false, 4),
  ('00000000-0000-0000-0000-000000000035', E'4 10', E'Total: R$ 20.00', false, 5),
  ('00000000-0000-0000-0000-000000000036', E'13 19', E'Muito bem! Apresenta antes do Natal!', true, 1),
  ('00000000-0000-0000-0000-000000000036', E'20 10', E'Eu odeio a professora!', false, 2),
  ('00000000-0000-0000-0000-000000000036', E'10 11', E'Parece o trabalho do meu filho!\nTCC Apresentado!', false, 3),
  ('00000000-0000-0000-0000-000000000036', E'20 22', E'Parece o trabalho do meu filho!\nFail! Entao eh nataaaaal!', false, 4),
  ('00000000-0000-0000-0000-000000000036', E'1 24', E'Muito bem! Apresenta antes do Natal!', false, 5),
  ('00000000-0000-0000-0000-000000000037', E'vertebrado\nmamifero\nonivoro', E'homem', true, 1),
  ('00000000-0000-0000-0000-000000000037', E'vertebrado\nave\ncarnivoro', E'aguia', false, 2),
  ('00000000-0000-0000-0000-000000000037', E'invertebrado\nanelideo\nonivoro', E'minhoca', false, 3),
  ('00000000-0000-0000-0000-000000000037', E'invertebrado\ninseto\nherbivoro', E'lagarta', false, 4),
  ('00000000-0000-0000-0000-000000000037', E'vertebrado\nmamifero\nherbivoro', E'vaca', false, 5),
  ('00000000-0000-0000-0000-000000000038', E'5\n1\n3\n2\n2\n1', E'3', true, 1),
  ('00000000-0000-0000-0000-000000000038', E'1\n1', E'0', false, 2),
  ('00000000-0000-0000-0000-000000000038', E'1\n2', E'1', false, 3),
  ('00000000-0000-0000-0000-000000000038', E'6\n1\n1\n1\n1\n1\n1', E'0', false, 4),
  ('00000000-0000-0000-0000-000000000038', E'4\n2\n3\n2\n3', E'4', false, 5),
  ('00000000-0000-0000-0000-000000000039', E'5', E'0 1 1 2 3', true, 1),
  ('00000000-0000-0000-0000-000000000039', E'1', E'0', false, 2),
  ('00000000-0000-0000-0000-000000000039', E'2', E'0 1', false, 3),
  ('00000000-0000-0000-0000-000000000039', E'10', E'0 1 1 2 3 5 8 13 21 34', false, 4),
  ('00000000-0000-0000-0000-000000000039', E'45', E'0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155 165580141 267914296 433494437 701408733', false, 5),
  ('00000000-0000-0000-0000-00000000003a', E'3 2\n1\n2 3\n1\n3 1\n2', E'Novo grenal (1-sim 2-nao)\nNovo grenal (1-sim 2-nao)\nNovo grenal (1-sim 2-nao)\n3 grenais\nInter:2\nGremio:1\nEmpates:0\nInter venceu mais', true, 1),
  ('00000000-0000-0000-0000-00000000003a', E'1 1\n2', E'Novo grenal (1-sim 2-nao)\n1 grenais\nInter:0\nGremio:0\nEmpates:1\nNao houve vencedor', false, 2),
  ('00000000-0000-0000-0000-00000000003a', E'0 3\n1\n1 2\n2', E'Novo grenal (1-sim 2-nao)\nNovo grenal (1-sim 2-nao)\n2 grenais\nInter:0\nGremio:2\nEmpates:0\nGremio venceu mais', false, 3),
  ('00000000-0000-0000-0000-00000000003a', E'2 1\n1\n1 2\n2', E'Novo grenal (1-sim 2-nao)\nNovo grenal (1-sim 2-nao)\n2 grenais\nInter:1\nGremio:1\nEmpates:0\nNao houve vencedor', false, 4),
  ('00000000-0000-0000-0000-00000000003b', E'1', E'N[0] = 1\nN[1] = 2\nN[2] = 4\nN[3] = 8\nN[4] = 16\nN[5] = 32\nN[6] = 64\nN[7] = 128\nN[8] = 256\nN[9] = 512', true, 1),
  ('00000000-0000-0000-0000-00000000003b', E'3', E'N[0] = 3\nN[1] = 6\nN[2] = 12\nN[3] = 24\nN[4] = 48\nN[5] = 96\nN[6] = 192\nN[7] = 384\nN[8] = 768\nN[9] = 1536', false, 2),
  ('00000000-0000-0000-0000-00000000003b', E'50', E'N[0] = 50\nN[1] = 100\nN[2] = 200\nN[3] = 400\nN[4] = 800\nN[5] = 1600\nN[6] = 3200\nN[7] = 6400\nN[8] = 12800\nN[9] = 25600', false, 3),
  ('00000000-0000-0000-0000-00000000003c', E'3', E'N[0] = 0\nN[1] = 1\nN[2] = 2\nN[3] = 0\nN[4] = 1\nN[5] = 2\nN[6] = 0\nN[7] = 1\nN[8] = 2\nN[9] = 0\nN[10] = 1\nN[11] = 2\nN[12] = 0\nN[13] = 1\nN[14] = 2\nN[15] = 0\nN[16] = 1\nN[17] = 2\nN[18] = 0\nN[19] = 1\nN[20] = 2\nN[21] = 0\nN[22] = 1\nN[23] = 2\nN[24] = 0\nN[25] = 1\nN[26] = 2\nN[27] = 0\nN[28] = 1\nN[29] = 2\nN[30] = 0\nN[31] = 1\nN[32] = 2\nN[33] = 0\nN[34] = 1\nN[35] = 2\nN[36] = 0\nN[37] = 1\nN[38] = 2\nN[39] = 0\nN[40] = 1\nN[41] = 2\nN[42] = 0\nN[43] = 1\nN[44] = 2\nN[45] = 0\nN[46] = 1\nN[47] = 2\nN[48] = 0\nN[49] = 1\nN[50] = 2\nN[51] = 0\nN[52] = 1\nN[53] = 2\nN[54] = 0\nN[55] = 1\nN[56] = 2\nN[57] = 0\nN[58] = 1\nN[59] = 2\nN[60] = 0\nN[61] = 1\nN[62] = 2\nN[63] = 0\nN[64] = 1\nN[65] = 2\nN[66] = 0\nN[67] = 1\nN[68] = 2\nN[69] = 0\nN[70] = 1\nN[71] = 2\nN[72] = 0\nN[73] = 1\nN[74] = 2\nN[75] = 0\nN[76] = 1\nN[77] = 2\nN[78] = 0\nN[79] = 1\nN[80] = 2\nN[81] = 0\nN[82] = 1\nN[83] = 2\nN[84] = 0\nN[85] = 1\nN[86] = 2\nN[87] = 0\nN[88] = 1\nN[89] = 2\nN[90] = 0\nN[91] = 1\nN[92] = 2\nN[93] = 0\nN[94] = 1\nN[95] = 2\nN[96] = 0\nN[97] = 1\nN[98] = 2\nN[99] = 0\nN[100] = 1\nN[101] = 2\nN[102] = 0\nN[103] = 1\nN[104] = 2\nN[105] = 0\nN[106] = 1\nN[107] = 2\nN[108] = 0\nN[109] = 1\nN[110] = 2\nN[111] = 0\nN[112] = 1\nN[113] = 2\nN[114] = 0\nN[115] = 1\nN[116] = 2\nN[117] = 0\nN[118] = 1\nN[119] = 2\nN[120] = 0\nN[121] = 1\nN[122] = 2\nN[123] = 0\nN[124] = 1\nN[125] = 2\nN[126] = 0\nN[127] = 1\nN[128] = 2\nN[129] = 0\nN[130] = 1\nN[131] = 2\nN[132] = 0\nN[133] = 1\nN[134] = 2\nN[135] = 0\nN[136] = 1\nN[137] = 2\nN[138] = 0\nN[139] = 1\nN[140] = 2\nN[141] = 0\nN[142] = 1\nN[143] = 2\nN[144] = 0\nN[145] = 1\nN[146] = 2\nN[147] = 0\nN[148] = 1\nN[149] = 2\nN[150] = 0\nN[151] = 1\nN[152] = 2\nN[153] = 0\nN[154] = 1\nN[155] = 2\nN[156] = 0\nN[157] = 1\nN[158] = 2\nN[159] = 0\nN[160] = 1\nN[161] = 2\nN[162] = 0\nN[163] = 1\nN[164] = 2\nN[165] = 0\nN[166] = 1\nN[167] = 2\nN[168] = 0\nN[169] = 1\nN[170] = 2\nN[171] = 0\nN[172] = 1\nN[173] = 2\nN[174] = 0\nN[175] = 1\nN[176] = 2\nN[177] = 0\nN[178] = 1\nN[179] = 2\nN[180] = 0\nN[181] = 1\nN[182] = 2\nN[183] = 0\nN[184] = 1\nN[185] = 2\nN[186] = 0\nN[187] = 1\nN[188] = 2\nN[189] = 0\nN[190] = 1\nN[191] = 2\nN[192] = 0\nN[193] = 1\nN[194] = 2\nN[195] = 0\nN[196] = 1\nN[197] = 2\nN[198] = 0\nN[199] = 1\nN[200] = 2\nN[201] = 0\nN[202] = 1\nN[203] = 2\nN[204] = 0\nN[205] = 1\nN[206] = 2\nN[207] = 0\nN[208] = 1\nN[209] = 2\nN[210] = 0\nN[211] = 1\nN[212] = 2\nN[213] = 0\nN[214] = 1\nN[215] = 2\nN[216] = 0\nN[217] = 1\nN[218] = 2\nN[219] = 0\nN[220] = 1\nN[221] = 2\nN[222] = 0\nN[223] = 1\nN[224] = 2\nN[225] = 0\nN[226] = 1\nN[227] = 2\nN[228] = 0\nN[229] = 1\nN[230] = 2\nN[231] = 0\nN[232] = 1\nN[233] = 2\nN[234] = 0\nN[235] = 1\nN[236] = 2\nN[237] = 0\nN[238] = 1\nN[239] = 2\nN[240] = 0\nN[241] = 1\nN[242] = 2\nN[243] = 0\nN[244] = 1\nN[245] = 2\nN[246] = 0\nN[247] = 1\nN[248] = 2\nN[249] = 0\nN[250] = 1\nN[251] = 2\nN[252] = 0\nN[253] = 1\nN[254] = 2\nN[255] = 0\nN[256] = 1\nN[257] = 2\nN[258] = 0\nN[259] = 1\nN[260] = 2\nN[261] = 0\nN[262] = 1\nN[263] = 2\nN[264] = 0\nN[265] = 1\nN[266] = 2\nN[267] = 0\nN[268] = 1\nN[269] = 2\nN[270] = 0\nN[271] = 1\nN[272] = 2\nN[273] = 0\nN[274] = 1\nN[275] = 2\nN[276] = 0\nN[277] = 1\nN[278] = 2\nN[279] = 0\nN[280] = 1\nN[281] = 2\nN[282] = 0\nN[283] = 1\nN[284] = 2\nN[285] = 0\nN[286] = 1\nN[287] = 2\nN[288] = 0\nN[289] = 1\nN[290] = 2\nN[291] = 0\nN[292] = 1\nN[293] = 2\nN[294] = 0\nN[295] = 1\nN[296] = 2\nN[297] = 0\nN[298] = 1\nN[299] = 2\nN[300] = 0\nN[301] = 1\nN[302] = 2\nN[303] = 0\nN[304] = 1\nN[305] = 2\nN[306] = 0\nN[307] = 1\nN[308] = 2\nN[309] = 0\nN[310] = 1\nN[311] = 2\nN[312] = 0\nN[313] = 1\nN[314] = 2\nN[315] = 0\nN[316] = 1\nN[317] = 2\nN[318] = 0\nN[319] = 1\nN[320] = 2\nN[321] = 0\nN[322] = 1\nN[323] = 2\nN[324] = 0\nN[325] = 1\nN[326] = 2\nN[327] = 0\nN[328] = 1\nN[329] = 2\nN[330] = 0\nN[331] = 1\nN[332] = 2\nN[333] = 0\nN[334] = 1\nN[335] = 2\nN[336] = 0\nN[337] = 1\nN[338] = 2\nN[339] = 0\nN[340] = 1\nN[341] = 2\nN[342] = 0\nN[343] = 1\nN[344] = 2\nN[345] = 0\nN[346] = 1\nN[347] = 2\nN[348] = 0\nN[349] = 1\nN[350] = 2\nN[351] = 0\nN[352] = 1\nN[353] = 2\nN[354] = 0\nN[355] = 1\nN[356] = 2\nN[357] = 0\nN[358] = 1\nN[359] = 2\nN[360] = 0\nN[361] = 1\nN[362] = 2\nN[363] = 0\nN[364] = 1\nN[365] = 2\nN[366] = 0\nN[367] = 1\nN[368] = 2\nN[369] = 0\nN[370] = 1\nN[371] = 2\nN[372] = 0\nN[373] = 1\nN[374] = 2\nN[375] = 0\nN[376] = 1\nN[377] = 2\nN[378] = 0\nN[379] = 1\nN[380] = 2\nN[381] = 0\nN[382] = 1\nN[383] = 2\nN[384] = 0\nN[385] = 1\nN[386] = 2\nN[387] = 0\nN[388] = 1\nN[389] = 2\nN[390] = 0\nN[391] = 1\nN[392] = 2\nN[393] = 0\nN[394] = 1\nN[395] = 2\nN[396] = 0\nN[397] = 1\nN[398] = 2\nN[399] = 0\nN[400] = 1\nN[401] = 2\nN[402] = 0\nN[403] = 1\nN[404] = 2\nN[405] = 0\nN[406] = 1\nN[407] = 2\nN[408] = 0\nN[409] = 1\nN[410] = 2\nN[411] = 0\nN[412] = 1\nN[413] = 2\nN[414] = 0\nN[415] = 1\nN[416] = 2\nN[417] = 0\nN[418] = 1\nN[419] = 2\nN[420] = 0\nN[421] = 1\nN[422] = 2\nN[423] = 0\nN[424] = 1\nN[425] = 2\nN[426] = 0\nN[427] = 1\nN[428] = 2\nN[429] = 0\nN[430] = 1\nN[431] = 2\nN[432] = 0\nN[433] = 1\nN[434] = 2\nN[435] = 0\nN[436] = 1\nN[437] = 2\nN[438] = 0\nN[439] = 1\nN[440] = 2\nN[441] = 0\nN[442] = 1\nN[443] = 2\nN[444] = 0\nN[445] = 1\nN[446] = 2\nN[447] = 0\nN[448] = 1\nN[449] = 2\nN[450] = 0\nN[451] = 1\nN[452] = 2\nN[453] = 0\nN[454] = 1\nN[455] = 2\nN[456] = 0\nN[457] = 1\nN[458] = 2\nN[459] = 0\nN[460] = 1\nN[461] = 2\nN[462] = 0\nN[463] = 1\nN[464] = 2\nN[465] = 0\nN[466] = 1\nN[467] = 2\nN[468] = 0\nN[469] = 1\nN[470] = 2\nN[471] = 0\nN[472] = 1\nN[473] = 2\nN[474] = 0\nN[475] = 1\nN[476] = 2\nN[477] = 0\nN[478] = 1\nN[479] = 2\nN[480] = 0\nN[481] = 1\nN[482] = 2\nN[483] = 0\nN[484] = 1\nN[485] = 2\nN[486] = 0\nN[487] = 1\nN[488] = 2\nN[489] = 0\nN[490] = 1\nN[491] = 2\nN[492] = 0\nN[493] = 1\nN[494] = 2\nN[495] = 0\nN[496] = 1\nN[497] = 2\nN[498] = 0\nN[499] = 1\nN[500] = 2\nN[501] = 0\nN[502] = 1\nN[503] = 2\nN[504] = 0\nN[505] = 1\nN[506] = 2\nN[507] = 0\nN[508] = 1\nN[509] = 2\nN[510] = 0\nN[511] = 1\nN[512] = 2\nN[513] = 0\nN[514] = 1\nN[515] = 2\nN[516] = 0\nN[517] = 1\nN[518] = 2\nN[519] = 0\nN[520] = 1\nN[521] = 2\nN[522] = 0\nN[523] = 1\nN[524] = 2\nN[525] = 0\nN[526] = 1\nN[527] = 2\nN[528] = 0\nN[529] = 1\nN[530] = 2\nN[531] = 0\nN[532] = 1\nN[533] = 2\nN[534] = 0\nN[535] = 1\nN[536] = 2\nN[537] = 0\nN[538] = 1\nN[539] = 2\nN[540] = 0\nN[541] = 1\nN[542] = 2\nN[543] = 0\nN[544] = 1\nN[545] = 2\nN[546] = 0\nN[547] = 1\nN[548] = 2\nN[549] = 0\nN[550] = 1\nN[551] = 2\nN[552] = 0\nN[553] = 1\nN[554] = 2\nN[555] = 0\nN[556] = 1\nN[557] = 2\nN[558] = 0\nN[559] = 1\nN[560] = 2\nN[561] = 0\nN[562] = 1\nN[563] = 2\nN[564] = 0\nN[565] = 1\nN[566] = 2\nN[567] = 0\nN[568] = 1\nN[569] = 2\nN[570] = 0\nN[571] = 1\nN[572] = 2\nN[573] = 0\nN[574] = 1\nN[575] = 2\nN[576] = 0\nN[577] = 1\nN[578] = 2\nN[579] = 0\nN[580] = 1\nN[581] = 2\nN[582] = 0\nN[583] = 1\nN[584] = 2\nN[585] = 0\nN[586] = 1\nN[587] = 2\nN[588] = 0\nN[589] = 1\nN[590] = 2\nN[591] = 0\nN[592] = 1\nN[593] = 2\nN[594] = 0\nN[595] = 1\nN[596] = 2\nN[597] = 0\nN[598] = 1\nN[599] = 2\nN[600] = 0\nN[601] = 1\nN[602] = 2\nN[603] = 0\nN[604] = 1\nN[605] = 2\nN[606] = 0\nN[607] = 1\nN[608] = 2\nN[609] = 0\nN[610] = 1\nN[611] = 2\nN[612] = 0\nN[613] = 1\nN[614] = 2\nN[615] = 0\nN[616] = 1\nN[617] = 2\nN[618] = 0\nN[619] = 1\nN[620] = 2\nN[621] = 0\nN[622] = 1\nN[623] = 2\nN[624] = 0\nN[625] = 1\nN[626] = 2\nN[627] = 0\nN[628] = 1\nN[629] = 2\nN[630] = 0\nN[631] = 1\nN[632] = 2\nN[633] = 0\nN[634] = 1\nN[635] = 2\nN[636] = 0\nN[637] = 1\nN[638] = 2\nN[639] = 0\nN[640] = 1\nN[641] = 2\nN[642] = 0\nN[643] = 1\nN[644] = 2\nN[645] = 0\nN[646] = 1\nN[647] = 2\nN[648] = 0\nN[649] = 1\nN[650] = 2\nN[651] = 0\nN[652] = 1\nN[653] = 2\nN[654] = 0\nN[655] = 1\nN[656] = 2\nN[657] = 0\nN[658] = 1\nN[659] = 2\nN[660] = 0\nN[661] = 1\nN[662] = 2\nN[663] = 0\nN[664] = 1\nN[665] = 2\nN[666] = 0\nN[667] = 1\nN[668] = 2\nN[669] = 0\nN[670] = 1\nN[671] = 2\nN[672] = 0\nN[673] = 1\nN[674] = 2\nN[675] = 0\nN[676] = 1\nN[677] = 2\nN[678] = 0\nN[679] = 1\nN[680] = 2\nN[681] = 0\nN[682] = 1\nN[683] = 2\nN[684] = 0\nN[685] = 1\nN[686] = 2\nN[687] = 0\nN[688] = 1\nN[689] = 2\nN[690] = 0\nN[691] = 1\nN[692] = 2\nN[693] = 0\nN[694] = 1\nN[695] = 2\nN[696] = 0\nN[697] = 1\nN[698] = 2\nN[699] = 0\nN[700] = 1\nN[701] = 2\nN[702] = 0\nN[703] = 1\nN[704] = 2\nN[705] = 0\nN[706] = 1\nN[707] = 2\nN[708] = 0\nN[709] = 1\nN[710] = 2\nN[711] = 0\nN[712] = 1\nN[713] = 2\nN[714] = 0\nN[715] = 1\nN[716] = 2\nN[717] = 0\nN[718] = 1\nN[719] = 2\nN[720] = 0\nN[721] = 1\nN[722] = 2\nN[723] = 0\nN[724] = 1\nN[725] = 2\nN[726] = 0\nN[727] = 1\nN[728] = 2\nN[729] = 0\nN[730] = 1\nN[731] = 2\nN[732] = 0\nN[733] = 1\nN[734] = 2\nN[735] = 0\nN[736] = 1\nN[737] = 2\nN[738] = 0\nN[739] = 1\nN[740] = 2\nN[741] = 0\nN[742] = 1\nN[743] = 2\nN[744] = 0\nN[745] = 1\nN[746] = 2\nN[747] = 0\nN[748] = 1\nN[749] = 2\nN[750] = 0\nN[751] = 1\nN[752] = 2\nN[753] = 0\nN[754] = 1\nN[755] = 2\nN[756] = 0\nN[757] = 1\nN[758] = 2\nN[759] = 0\nN[760] = 1\nN[761] = 2\nN[762] = 0\nN[763] = 1\nN[764] = 2\nN[765] = 0\nN[766] = 1\nN[767] = 2\nN[768] = 0\nN[769] = 1\nN[770] = 2\nN[771] = 0\nN[772] = 1\nN[773] = 2\nN[774] = 0\nN[775] = 1\nN[776] = 2\nN[777] = 0\nN[778] = 1\nN[779] = 2\nN[780] = 0\nN[781] = 1\nN[782] = 2\nN[783] = 0\nN[784] = 1\nN[785] = 2\nN[786] = 0\nN[787] = 1\nN[788] = 2\nN[789] = 0\nN[790] = 1\nN[791] = 2\nN[792] = 0\nN[793] = 1\nN[794] = 2\nN[795] = 0\nN[796] = 1\nN[797] = 2\nN[798] = 0\nN[799] = 1\nN[800] = 2\nN[801] = 0\nN[802] = 1\nN[803] = 2\nN[804] = 0\nN[805] = 1\nN[806] = 2\nN[807] = 0\nN[808] = 1\nN[809] = 2\nN[810] = 0\nN[811] = 1\nN[812] = 2\nN[813] = 0\nN[814] = 1\nN[815] = 2\nN[816] = 0\nN[817] = 1\nN[818] = 2\nN[819] = 0\nN[820] = 1\nN[821] = 2\nN[822] = 0\nN[823] = 1\nN[824] = 2\nN[825] = 0\nN[826] = 1\nN[827] = 2\nN[828] = 0\nN[829] = 1\nN[830] = 2\nN[831] = 0\nN[832] = 1\nN[833] = 2\nN[834] = 0\nN[835] = 1\nN[836] = 2\nN[837] = 0\nN[838] = 1\nN[839] = 2\nN[840] = 0\nN[841] = 1\nN[842] = 2\nN[843] = 0\nN[844] = 1\nN[845] = 2\nN[846] = 0\nN[847] = 1\nN[848] = 2\nN[849] = 0\nN[850] = 1\nN[851] = 2\nN[852] = 0\nN[853] = 1\nN[854] = 2\nN[855] = 0\nN[856] = 1\nN[857] = 2\nN[858] = 0\nN[859] = 1\nN[860] = 2\nN[861] = 0\nN[862] = 1\nN[863] = 2\nN[864] = 0\nN[865] = 1\nN[866] = 2\nN[867] = 0\nN[868] = 1\nN[869] = 2\nN[870] = 0\nN[871] = 1\nN[872] = 2\nN[873] = 0\nN[874] = 1\nN[875] = 2\nN[876] = 0\nN[877] = 1\nN[878] = 2\nN[879] = 0\nN[880] = 1\nN[881] = 2\nN[882] = 0\nN[883] = 1\nN[884] = 2\nN[885] = 0\nN[886] = 1\nN[887] = 2\nN[888] = 0\nN[889] = 1\nN[890] = 2\nN[891] = 0\nN[892] = 1\nN[893] = 2\nN[894] = 0\nN[895] = 1\nN[896] = 2\nN[897] = 0\nN[898] = 1\nN[899] = 2\nN[900] = 0\nN[901] = 1\nN[902] = 2\nN[903] = 0\nN[904] = 1\nN[905] = 2\nN[906] = 0\nN[907] = 1\nN[908] = 2\nN[909] = 0\nN[910] = 1\nN[911] = 2\nN[912] = 0\nN[913] = 1\nN[914] = 2\nN[915] = 0\nN[916] = 1\nN[917] = 2\nN[918] = 0\nN[919] = 1\nN[920] = 2\nN[921] = 0\nN[922] = 1\nN[923] = 2\nN[924] = 0\nN[925] = 1\nN[926] = 2\nN[927] = 0\nN[928] = 1\nN[929] = 2\nN[930] = 0\nN[931] = 1\nN[932] = 2\nN[933] = 0\nN[934] = 1\nN[935] = 2\nN[936] = 0\nN[937] = 1\nN[938] = 2\nN[939] = 0\nN[940] = 1\nN[941] = 2\nN[942] = 0\nN[943] = 1\nN[944] = 2\nN[945] = 0\nN[946] = 1\nN[947] = 2\nN[948] = 0\nN[949] = 1\nN[950] = 2\nN[951] = 0\nN[952] = 1\nN[953] = 2\nN[954] = 0\nN[955] = 1\nN[956] = 2\nN[957] = 0\nN[958] = 1\nN[959] = 2\nN[960] = 0\nN[961] = 1\nN[962] = 2\nN[963] = 0\nN[964] = 1\nN[965] = 2\nN[966] = 0\nN[967] = 1\nN[968] = 2\nN[969] = 0\nN[970] = 1\nN[971] = 2\nN[972] = 0\nN[973] = 1\nN[974] = 2\nN[975] = 0\nN[976] = 1\nN[977] = 2\nN[978] = 0\nN[979] = 1\nN[980] = 2\nN[981] = 0\nN[982] = 1\nN[983] = 2\nN[984] = 0\nN[985] = 1\nN[986] = 2\nN[987] = 0\nN[988] = 1\nN[989] = 2\nN[990] = 0\nN[991] = 1\nN[992] = 2\nN[993] = 0\nN[994] = 1\nN[995] = 2\nN[996] = 0\nN[997] = 1\nN[998] = 2\nN[999] = 0', true, 1),
  ('00000000-0000-0000-0000-00000000003c', E'2', E'N[0] = 0\nN[1] = 1\nN[2] = 0\nN[3] = 1\nN[4] = 0\nN[5] = 1\nN[6] = 0\nN[7] = 1\nN[8] = 0\nN[9] = 1\nN[10] = 0\nN[11] = 1\nN[12] = 0\nN[13] = 1\nN[14] = 0\nN[15] = 1\nN[16] = 0\nN[17] = 1\nN[18] = 0\nN[19] = 1\nN[20] = 0\nN[21] = 1\nN[22] = 0\nN[23] = 1\nN[24] = 0\nN[25] = 1\nN[26] = 0\nN[27] = 1\nN[28] = 0\nN[29] = 1\nN[30] = 0\nN[31] = 1\nN[32] = 0\nN[33] = 1\nN[34] = 0\nN[35] = 1\nN[36] = 0\nN[37] = 1\nN[38] = 0\nN[39] = 1\nN[40] = 0\nN[41] = 1\nN[42] = 0\nN[43] = 1\nN[44] = 0\nN[45] = 1\nN[46] = 0\nN[47] = 1\nN[48] = 0\nN[49] = 1\nN[50] = 0\nN[51] = 1\nN[52] = 0\nN[53] = 1\nN[54] = 0\nN[55] = 1\nN[56] = 0\nN[57] = 1\nN[58] = 0\nN[59] = 1\nN[60] = 0\nN[61] = 1\nN[62] = 0\nN[63] = 1\nN[64] = 0\nN[65] = 1\nN[66] = 0\nN[67] = 1\nN[68] = 0\nN[69] = 1\nN[70] = 0\nN[71] = 1\nN[72] = 0\nN[73] = 1\nN[74] = 0\nN[75] = 1\nN[76] = 0\nN[77] = 1\nN[78] = 0\nN[79] = 1\nN[80] = 0\nN[81] = 1\nN[82] = 0\nN[83] = 1\nN[84] = 0\nN[85] = 1\nN[86] = 0\nN[87] = 1\nN[88] = 0\nN[89] = 1\nN[90] = 0\nN[91] = 1\nN[92] = 0\nN[93] = 1\nN[94] = 0\nN[95] = 1\nN[96] = 0\nN[97] = 1\nN[98] = 0\nN[99] = 1\nN[100] = 0\nN[101] = 1\nN[102] = 0\nN[103] = 1\nN[104] = 0\nN[105] = 1\nN[106] = 0\nN[107] = 1\nN[108] = 0\nN[109] = 1\nN[110] = 0\nN[111] = 1\nN[112] = 0\nN[113] = 1\nN[114] = 0\nN[115] = 1\nN[116] = 0\nN[117] = 1\nN[118] = 0\nN[119] = 1\nN[120] = 0\nN[121] = 1\nN[122] = 0\nN[123] = 1\nN[124] = 0\nN[125] = 1\nN[126] = 0\nN[127] = 1\nN[128] = 0\nN[129] = 1\nN[130] = 0\nN[131] = 1\nN[132] = 0\nN[133] = 1\nN[134] = 0\nN[135] = 1\nN[136] = 0\nN[137] = 1\nN[138] = 0\nN[139] = 1\nN[140] = 0\nN[141] = 1\nN[142] = 0\nN[143] = 1\nN[144] = 0\nN[145] = 1\nN[146] = 0\nN[147] = 1\nN[148] = 0\nN[149] = 1\nN[150] = 0\nN[151] = 1\nN[152] = 0\nN[153] = 1\nN[154] = 0\nN[155] = 1\nN[156] = 0\nN[157] = 1\nN[158] = 0\nN[159] = 1\nN[160] = 0\nN[161] = 1\nN[162] = 0\nN[163] = 1\nN[164] = 0\nN[165] = 1\nN[166] = 0\nN[167] = 1\nN[168] = 0\nN[169] = 1\nN[170] = 0\nN[171] = 1\nN[172] = 0\nN[173] = 1\nN[174] = 0\nN[175] = 1\nN[176] = 0\nN[177] = 1\nN[178] = 0\nN[179] = 1\nN[180] = 0\nN[181] = 1\nN[182] = 0\nN[183] = 1\nN[184] = 0\nN[185] = 1\nN[186] = 0\nN[187] = 1\nN[188] = 0\nN[189] = 1\nN[190] = 0\nN[191] = 1\nN[192] = 0\nN[193] = 1\nN[194] = 0\nN[195] = 1\nN[196] = 0\nN[197] = 1\nN[198] = 0\nN[199] = 1\nN[200] = 0\nN[201] = 1\nN[202] = 0\nN[203] = 1\nN[204] = 0\nN[205] = 1\nN[206] = 0\nN[207] = 1\nN[208] = 0\nN[209] = 1\nN[210] = 0\nN[211] = 1\nN[212] = 0\nN[213] = 1\nN[214] = 0\nN[215] = 1\nN[216] = 0\nN[217] = 1\nN[218] = 0\nN[219] = 1\nN[220] = 0\nN[221] = 1\nN[222] = 0\nN[223] = 1\nN[224] = 0\nN[225] = 1\nN[226] = 0\nN[227] = 1\nN[228] = 0\nN[229] = 1\nN[230] = 0\nN[231] = 1\nN[232] = 0\nN[233] = 1\nN[234] = 0\nN[235] = 1\nN[236] = 0\nN[237] = 1\nN[238] = 0\nN[239] = 1\nN[240] = 0\nN[241] = 1\nN[242] = 0\nN[243] = 1\nN[244] = 0\nN[245] = 1\nN[246] = 0\nN[247] = 1\nN[248] = 0\nN[249] = 1\nN[250] = 0\nN[251] = 1\nN[252] = 0\nN[253] = 1\nN[254] = 0\nN[255] = 1\nN[256] = 0\nN[257] = 1\nN[258] = 0\nN[259] = 1\nN[260] = 0\nN[261] = 1\nN[262] = 0\nN[263] = 1\nN[264] = 0\nN[265] = 1\nN[266] = 0\nN[267] = 1\nN[268] = 0\nN[269] = 1\nN[270] = 0\nN[271] = 1\nN[272] = 0\nN[273] = 1\nN[274] = 0\nN[275] = 1\nN[276] = 0\nN[277] = 1\nN[278] = 0\nN[279] = 1\nN[280] = 0\nN[281] = 1\nN[282] = 0\nN[283] = 1\nN[284] = 0\nN[285] = 1\nN[286] = 0\nN[287] = 1\nN[288] = 0\nN[289] = 1\nN[290] = 0\nN[291] = 1\nN[292] = 0\nN[293] = 1\nN[294] = 0\nN[295] = 1\nN[296] = 0\nN[297] = 1\nN[298] = 0\nN[299] = 1\nN[300] = 0\nN[301] = 1\nN[302] = 0\nN[303] = 1\nN[304] = 0\nN[305] = 1\nN[306] = 0\nN[307] = 1\nN[308] = 0\nN[309] = 1\nN[310] = 0\nN[311] = 1\nN[312] = 0\nN[313] = 1\nN[314] = 0\nN[315] = 1\nN[316] = 0\nN[317] = 1\nN[318] = 0\nN[319] = 1\nN[320] = 0\nN[321] = 1\nN[322] = 0\nN[323] = 1\nN[324] = 0\nN[325] = 1\nN[326] = 0\nN[327] = 1\nN[328] = 0\nN[329] = 1\nN[330] = 0\nN[331] = 1\nN[332] = 0\nN[333] = 1\nN[334] = 0\nN[335] = 1\nN[336] = 0\nN[337] = 1\nN[338] = 0\nN[339] = 1\nN[340] = 0\nN[341] = 1\nN[342] = 0\nN[343] = 1\nN[344] = 0\nN[345] = 1\nN[346] = 0\nN[347] = 1\nN[348] = 0\nN[349] = 1\nN[350] = 0\nN[351] = 1\nN[352] = 0\nN[353] = 1\nN[354] = 0\nN[355] = 1\nN[356] = 0\nN[357] = 1\nN[358] = 0\nN[359] = 1\nN[360] = 0\nN[361] = 1\nN[362] = 0\nN[363] = 1\nN[364] = 0\nN[365] = 1\nN[366] = 0\nN[367] = 1\nN[368] = 0\nN[369] = 1\nN[370] = 0\nN[371] = 1\nN[372] = 0\nN[373] = 1\nN[374] = 0\nN[375] = 1\nN[376] = 0\nN[377] = 1\nN[378] = 0\nN[379] = 1\nN[380] = 0\nN[381] = 1\nN[382] = 0\nN[383] = 1\nN[384] = 0\nN[385] = 1\nN[386] = 0\nN[387] = 1\nN[388] = 0\nN[389] = 1\nN[390] = 0\nN[391] = 1\nN[392] = 0\nN[393] = 1\nN[394] = 0\nN[395] = 1\nN[396] = 0\nN[397] = 1\nN[398] = 0\nN[399] = 1\nN[400] = 0\nN[401] = 1\nN[402] = 0\nN[403] = 1\nN[404] = 0\nN[405] = 1\nN[406] = 0\nN[407] = 1\nN[408] = 0\nN[409] = 1\nN[410] = 0\nN[411] = 1\nN[412] = 0\nN[413] = 1\nN[414] = 0\nN[415] = 1\nN[416] = 0\nN[417] = 1\nN[418] = 0\nN[419] = 1\nN[420] = 0\nN[421] = 1\nN[422] = 0\nN[423] = 1\nN[424] = 0\nN[425] = 1\nN[426] = 0\nN[427] = 1\nN[428] = 0\nN[429] = 1\nN[430] = 0\nN[431] = 1\nN[432] = 0\nN[433] = 1\nN[434] = 0\nN[435] = 1\nN[436] = 0\nN[437] = 1\nN[438] = 0\nN[439] = 1\nN[440] = 0\nN[441] = 1\nN[442] = 0\nN[443] = 1\nN[444] = 0\nN[445] = 1\nN[446] = 0\nN[447] = 1\nN[448] = 0\nN[449] = 1\nN[450] = 0\nN[451] = 1\nN[452] = 0\nN[453] = 1\nN[454] = 0\nN[455] = 1\nN[456] = 0\nN[457] = 1\nN[458] = 0\nN[459] = 1\nN[460] = 0\nN[461] = 1\nN[462] = 0\nN[463] = 1\nN[464] = 0\nN[465] = 1\nN[466] = 0\nN[467] = 1\nN[468] = 0\nN[469] = 1\nN[470] = 0\nN[471] = 1\nN[472] = 0\nN[473] = 1\nN[474] = 0\nN[475] = 1\nN[476] = 0\nN[477] = 1\nN[478] = 0\nN[479] = 1\nN[480] = 0\nN[481] = 1\nN[482] = 0\nN[483] = 1\nN[484] = 0\nN[485] = 1\nN[486] = 0\nN[487] = 1\nN[488] = 0\nN[489] = 1\nN[490] = 0\nN[491] = 1\nN[492] = 0\nN[493] = 1\nN[494] = 0\nN[495] = 1\nN[496] = 0\nN[497] = 1\nN[498] = 0\nN[499] = 1\nN[500] = 0\nN[501] = 1\nN[502] = 0\nN[503] = 1\nN[504] = 0\nN[505] = 1\nN[506] = 0\nN[507] = 1\nN[508] = 0\nN[509] = 1\nN[510] = 0\nN[511] = 1\nN[512] = 0\nN[513] = 1\nN[514] = 0\nN[515] = 1\nN[516] = 0\nN[517] = 1\nN[518] = 0\nN[519] = 1\nN[520] = 0\nN[521] = 1\nN[522] = 0\nN[523] = 1\nN[524] = 0\nN[525] = 1\nN[526] = 0\nN[527] = 1\nN[528] = 0\nN[529] = 1\nN[530] = 0\nN[531] = 1\nN[532] = 0\nN[533] = 1\nN[534] = 0\nN[535] = 1\nN[536] = 0\nN[537] = 1\nN[538] = 0\nN[539] = 1\nN[540] = 0\nN[541] = 1\nN[542] = 0\nN[543] = 1\nN[544] = 0\nN[545] = 1\nN[546] = 0\nN[547] = 1\nN[548] = 0\nN[549] = 1\nN[550] = 0\nN[551] = 1\nN[552] = 0\nN[553] = 1\nN[554] = 0\nN[555] = 1\nN[556] = 0\nN[557] = 1\nN[558] = 0\nN[559] = 1\nN[560] = 0\nN[561] = 1\nN[562] = 0\nN[563] = 1\nN[564] = 0\nN[565] = 1\nN[566] = 0\nN[567] = 1\nN[568] = 0\nN[569] = 1\nN[570] = 0\nN[571] = 1\nN[572] = 0\nN[573] = 1\nN[574] = 0\nN[575] = 1\nN[576] = 0\nN[577] = 1\nN[578] = 0\nN[579] = 1\nN[580] = 0\nN[581] = 1\nN[582] = 0\nN[583] = 1\nN[584] = 0\nN[585] = 1\nN[586] = 0\nN[587] = 1\nN[588] = 0\nN[589] = 1\nN[590] = 0\nN[591] = 1\nN[592] = 0\nN[593] = 1\nN[594] = 0\nN[595] = 1\nN[596] = 0\nN[597] = 1\nN[598] = 0\nN[599] = 1\nN[600] = 0\nN[601] = 1\nN[602] = 0\nN[603] = 1\nN[604] = 0\nN[605] = 1\nN[606] = 0\nN[607] = 1\nN[608] = 0\nN[609] = 1\nN[610] = 0\nN[611] = 1\nN[612] = 0\nN[613] = 1\nN[614] = 0\nN[615] = 1\nN[616] = 0\nN[617] = 1\nN[618] = 0\nN[619] = 1\nN[620] = 0\nN[621] = 1\nN[622] = 0\nN[623] = 1\nN[624] = 0\nN[625] = 1\nN[626] = 0\nN[627] = 1\nN[628] = 0\nN[629] = 1\nN[630] = 0\nN[631] = 1\nN[632] = 0\nN[633] = 1\nN[634] = 0\nN[635] = 1\nN[636] = 0\nN[637] = 1\nN[638] = 0\nN[639] = 1\nN[640] = 0\nN[641] = 1\nN[642] = 0\nN[643] = 1\nN[644] = 0\nN[645] = 1\nN[646] = 0\nN[647] = 1\nN[648] = 0\nN[649] = 1\nN[650] = 0\nN[651] = 1\nN[652] = 0\nN[653] = 1\nN[654] = 0\nN[655] = 1\nN[656] = 0\nN[657] = 1\nN[658] = 0\nN[659] = 1\nN[660] = 0\nN[661] = 1\nN[662] = 0\nN[663] = 1\nN[664] = 0\nN[665] = 1\nN[666] = 0\nN[667] = 1\nN[668] = 0\nN[669] = 1\nN[670] = 0\nN[671] = 1\nN[672] = 0\nN[673] = 1\nN[674] = 0\nN[675] = 1\nN[676] = 0\nN[677] = 1\nN[678] = 0\nN[679] = 1\nN[680] = 0\nN[681] = 1\nN[682] = 0\nN[683] = 1\nN[684] = 0\nN[685] = 1\nN[686] = 0\nN[687] = 1\nN[688] = 0\nN[689] = 1\nN[690] = 0\nN[691] = 1\nN[692] = 0\nN[693] = 1\nN[694] = 0\nN[695] = 1\nN[696] = 0\nN[697] = 1\nN[698] = 0\nN[699] = 1\nN[700] = 0\nN[701] = 1\nN[702] = 0\nN[703] = 1\nN[704] = 0\nN[705] = 1\nN[706] = 0\nN[707] = 1\nN[708] = 0\nN[709] = 1\nN[710] = 0\nN[711] = 1\nN[712] = 0\nN[713] = 1\nN[714] = 0\nN[715] = 1\nN[716] = 0\nN[717] = 1\nN[718] = 0\nN[719] = 1\nN[720] = 0\nN[721] = 1\nN[722] = 0\nN[723] = 1\nN[724] = 0\nN[725] = 1\nN[726] = 0\nN[727] = 1\nN[728] = 0\nN[729] = 1\nN[730] = 0\nN[731] = 1\nN[732] = 0\nN[733] = 1\nN[734] = 0\nN[735] = 1\nN[736] = 0\nN[737] = 1\nN[738] = 0\nN[739] = 1\nN[740] = 0\nN[741] = 1\nN[742] = 0\nN[743] = 1\nN[744] = 0\nN[745] = 1\nN[746] = 0\nN[747] = 1\nN[748] = 0\nN[749] = 1\nN[750] = 0\nN[751] = 1\nN[752] = 0\nN[753] = 1\nN[754] = 0\nN[755] = 1\nN[756] = 0\nN[757] = 1\nN[758] = 0\nN[759] = 1\nN[760] = 0\nN[761] = 1\nN[762] = 0\nN[763] = 1\nN[764] = 0\nN[765] = 1\nN[766] = 0\nN[767] = 1\nN[768] = 0\nN[769] = 1\nN[770] = 0\nN[771] = 1\nN[772] = 0\nN[773] = 1\nN[774] = 0\nN[775] = 1\nN[776] = 0\nN[777] = 1\nN[778] = 0\nN[779] = 1\nN[780] = 0\nN[781] = 1\nN[782] = 0\nN[783] = 1\nN[784] = 0\nN[785] = 1\nN[786] = 0\nN[787] = 1\nN[788] = 0\nN[789] = 1\nN[790] = 0\nN[791] = 1\nN[792] = 0\nN[793] = 1\nN[794] = 0\nN[795] = 1\nN[796] = 0\nN[797] = 1\nN[798] = 0\nN[799] = 1\nN[800] = 0\nN[801] = 1\nN[802] = 0\nN[803] = 1\nN[804] = 0\nN[805] = 1\nN[806] = 0\nN[807] = 1\nN[808] = 0\nN[809] = 1\nN[810] = 0\nN[811] = 1\nN[812] = 0\nN[813] = 1\nN[814] = 0\nN[815] = 1\nN[816] = 0\nN[817] = 1\nN[818] = 0\nN[819] = 1\nN[820] = 0\nN[821] = 1\nN[822] = 0\nN[823] = 1\nN[824] = 0\nN[825] = 1\nN[826] = 0\nN[827] = 1\nN[828] = 0\nN[829] = 1\nN[830] = 0\nN[831] = 1\nN[832] = 0\nN[833] = 1\nN[834] = 0\nN[835] = 1\nN[836] = 0\nN[837] = 1\nN[838] = 0\nN[839] = 1\nN[840] = 0\nN[841] = 1\nN[842] = 0\nN[843] = 1\nN[844] = 0\nN[845] = 1\nN[846] = 0\nN[847] = 1\nN[848] = 0\nN[849] = 1\nN[850] = 0\nN[851] = 1\nN[852] = 0\nN[853] = 1\nN[854] = 0\nN[855] = 1\nN[856] = 0\nN[857] = 1\nN[858] = 0\nN[859] = 1\nN[860] = 0\nN[861] = 1\nN[862] = 0\nN[863] = 1\nN[864] = 0\nN[865] = 1\nN[866] = 0\nN[867] = 1\nN[868] = 0\nN[869] = 1\nN[870] = 0\nN[871] = 1\nN[872] = 0\nN[873] = 1\nN[874] = 0\nN[875] = 1\nN[876] = 0\nN[877] = 1\nN[878] = 0\nN[879] = 1\nN[880] = 0\nN[881] = 1\nN[882] = 0\nN[883] = 1\nN[884] = 0\nN[885] = 1\nN[886] = 0\nN[887] = 1\nN[888] = 0\nN[889] = 1\nN[890] = 0\nN[891] = 1\nN[892] = 0\nN[893] = 1\nN[894] = 0\nN[895] = 1\nN[896] = 0\nN[897] = 1\nN[898] = 0\nN[899] = 1\nN[900] = 0\nN[901] = 1\nN[902] = 0\nN[903] = 1\nN[904] = 0\nN[905] = 1\nN[906] = 0\nN[907] = 1\nN[908] = 0\nN[909] = 1\nN[910] = 0\nN[911] = 1\nN[912] = 0\nN[913] = 1\nN[914] = 0\nN[915] = 1\nN[916] = 0\nN[917] = 1\nN[918] = 0\nN[919] = 1\nN[920] = 0\nN[921] = 1\nN[922] = 0\nN[923] = 1\nN[924] = 0\nN[925] = 1\nN[926] = 0\nN[927] = 1\nN[928] = 0\nN[929] = 1\nN[930] = 0\nN[931] = 1\nN[932] = 0\nN[933] = 1\nN[934] = 0\nN[935] = 1\nN[936] = 0\nN[937] = 1\nN[938] = 0\nN[939] = 1\nN[940] = 0\nN[941] = 1\nN[942] = 0\nN[943] = 1\nN[944] = 0\nN[945] = 1\nN[946] = 0\nN[947] = 1\nN[948] = 0\nN[949] = 1\nN[950] = 0\nN[951] = 1\nN[952] = 0\nN[953] = 1\nN[954] = 0\nN[955] = 1\nN[956] = 0\nN[957] = 1\nN[958] = 0\nN[959] = 1\nN[960] = 0\nN[961] = 1\nN[962] = 0\nN[963] = 1\nN[964] = 0\nN[965] = 1\nN[966] = 0\nN[967] = 1\nN[968] = 0\nN[969] = 1\nN[970] = 0\nN[971] = 1\nN[972] = 0\nN[973] = 1\nN[974] = 0\nN[975] = 1\nN[976] = 0\nN[977] = 1\nN[978] = 0\nN[979] = 1\nN[980] = 0\nN[981] = 1\nN[982] = 0\nN[983] = 1\nN[984] = 0\nN[985] = 1\nN[986] = 0\nN[987] = 1\nN[988] = 0\nN[989] = 1\nN[990] = 0\nN[991] = 1\nN[992] = 0\nN[993] = 1\nN[994] = 0\nN[995] = 1\nN[996] = 0\nN[997] = 1\nN[998] = 0\nN[999] = 1', false, 2),
  ('00000000-0000-0000-0000-00000000003c', E'50', E'N[0] = 0\nN[1] = 1\nN[2] = 2\nN[3] = 3\nN[4] = 4\nN[5] = 5\nN[6] = 6\nN[7] = 7\nN[8] = 8\nN[9] = 9\nN[10] = 10\nN[11] = 11\nN[12] = 12\nN[13] = 13\nN[14] = 14\nN[15] = 15\nN[16] = 16\nN[17] = 17\nN[18] = 18\nN[19] = 19\nN[20] = 20\nN[21] = 21\nN[22] = 22\nN[23] = 23\nN[24] = 24\nN[25] = 25\nN[26] = 26\nN[27] = 27\nN[28] = 28\nN[29] = 29\nN[30] = 30\nN[31] = 31\nN[32] = 32\nN[33] = 33\nN[34] = 34\nN[35] = 35\nN[36] = 36\nN[37] = 37\nN[38] = 38\nN[39] = 39\nN[40] = 40\nN[41] = 41\nN[42] = 42\nN[43] = 43\nN[44] = 44\nN[45] = 45\nN[46] = 46\nN[47] = 47\nN[48] = 48\nN[49] = 49\nN[50] = 0\nN[51] = 1\nN[52] = 2\nN[53] = 3\nN[54] = 4\nN[55] = 5\nN[56] = 6\nN[57] = 7\nN[58] = 8\nN[59] = 9\nN[60] = 10\nN[61] = 11\nN[62] = 12\nN[63] = 13\nN[64] = 14\nN[65] = 15\nN[66] = 16\nN[67] = 17\nN[68] = 18\nN[69] = 19\nN[70] = 20\nN[71] = 21\nN[72] = 22\nN[73] = 23\nN[74] = 24\nN[75] = 25\nN[76] = 26\nN[77] = 27\nN[78] = 28\nN[79] = 29\nN[80] = 30\nN[81] = 31\nN[82] = 32\nN[83] = 33\nN[84] = 34\nN[85] = 35\nN[86] = 36\nN[87] = 37\nN[88] = 38\nN[89] = 39\nN[90] = 40\nN[91] = 41\nN[92] = 42\nN[93] = 43\nN[94] = 44\nN[95] = 45\nN[96] = 46\nN[97] = 47\nN[98] = 48\nN[99] = 49\nN[100] = 0\nN[101] = 1\nN[102] = 2\nN[103] = 3\nN[104] = 4\nN[105] = 5\nN[106] = 6\nN[107] = 7\nN[108] = 8\nN[109] = 9\nN[110] = 10\nN[111] = 11\nN[112] = 12\nN[113] = 13\nN[114] = 14\nN[115] = 15\nN[116] = 16\nN[117] = 17\nN[118] = 18\nN[119] = 19\nN[120] = 20\nN[121] = 21\nN[122] = 22\nN[123] = 23\nN[124] = 24\nN[125] = 25\nN[126] = 26\nN[127] = 27\nN[128] = 28\nN[129] = 29\nN[130] = 30\nN[131] = 31\nN[132] = 32\nN[133] = 33\nN[134] = 34\nN[135] = 35\nN[136] = 36\nN[137] = 37\nN[138] = 38\nN[139] = 39\nN[140] = 40\nN[141] = 41\nN[142] = 42\nN[143] = 43\nN[144] = 44\nN[145] = 45\nN[146] = 46\nN[147] = 47\nN[148] = 48\nN[149] = 49\nN[150] = 0\nN[151] = 1\nN[152] = 2\nN[153] = 3\nN[154] = 4\nN[155] = 5\nN[156] = 6\nN[157] = 7\nN[158] = 8\nN[159] = 9\nN[160] = 10\nN[161] = 11\nN[162] = 12\nN[163] = 13\nN[164] = 14\nN[165] = 15\nN[166] = 16\nN[167] = 17\nN[168] = 18\nN[169] = 19\nN[170] = 20\nN[171] = 21\nN[172] = 22\nN[173] = 23\nN[174] = 24\nN[175] = 25\nN[176] = 26\nN[177] = 27\nN[178] = 28\nN[179] = 29\nN[180] = 30\nN[181] = 31\nN[182] = 32\nN[183] = 33\nN[184] = 34\nN[185] = 35\nN[186] = 36\nN[187] = 37\nN[188] = 38\nN[189] = 39\nN[190] = 40\nN[191] = 41\nN[192] = 42\nN[193] = 43\nN[194] = 44\nN[195] = 45\nN[196] = 46\nN[197] = 47\nN[198] = 48\nN[199] = 49\nN[200] = 0\nN[201] = 1\nN[202] = 2\nN[203] = 3\nN[204] = 4\nN[205] = 5\nN[206] = 6\nN[207] = 7\nN[208] = 8\nN[209] = 9\nN[210] = 10\nN[211] = 11\nN[212] = 12\nN[213] = 13\nN[214] = 14\nN[215] = 15\nN[216] = 16\nN[217] = 17\nN[218] = 18\nN[219] = 19\nN[220] = 20\nN[221] = 21\nN[222] = 22\nN[223] = 23\nN[224] = 24\nN[225] = 25\nN[226] = 26\nN[227] = 27\nN[228] = 28\nN[229] = 29\nN[230] = 30\nN[231] = 31\nN[232] = 32\nN[233] = 33\nN[234] = 34\nN[235] = 35\nN[236] = 36\nN[237] = 37\nN[238] = 38\nN[239] = 39\nN[240] = 40\nN[241] = 41\nN[242] = 42\nN[243] = 43\nN[244] = 44\nN[245] = 45\nN[246] = 46\nN[247] = 47\nN[248] = 48\nN[249] = 49\nN[250] = 0\nN[251] = 1\nN[252] = 2\nN[253] = 3\nN[254] = 4\nN[255] = 5\nN[256] = 6\nN[257] = 7\nN[258] = 8\nN[259] = 9\nN[260] = 10\nN[261] = 11\nN[262] = 12\nN[263] = 13\nN[264] = 14\nN[265] = 15\nN[266] = 16\nN[267] = 17\nN[268] = 18\nN[269] = 19\nN[270] = 20\nN[271] = 21\nN[272] = 22\nN[273] = 23\nN[274] = 24\nN[275] = 25\nN[276] = 26\nN[277] = 27\nN[278] = 28\nN[279] = 29\nN[280] = 30\nN[281] = 31\nN[282] = 32\nN[283] = 33\nN[284] = 34\nN[285] = 35\nN[286] = 36\nN[287] = 37\nN[288] = 38\nN[289] = 39\nN[290] = 40\nN[291] = 41\nN[292] = 42\nN[293] = 43\nN[294] = 44\nN[295] = 45\nN[296] = 46\nN[297] = 47\nN[298] = 48\nN[299] = 49\nN[300] = 0\nN[301] = 1\nN[302] = 2\nN[303] = 3\nN[304] = 4\nN[305] = 5\nN[306] = 6\nN[307] = 7\nN[308] = 8\nN[309] = 9\nN[310] = 10\nN[311] = 11\nN[312] = 12\nN[313] = 13\nN[314] = 14\nN[315] = 15\nN[316] = 16\nN[317] = 17\nN[318] = 18\nN[319] = 19\nN[320] = 20\nN[321] = 21\nN[322] = 22\nN[323] = 23\nN[324] = 24\nN[325] = 25\nN[326] = 26\nN[327] = 27\nN[328] = 28\nN[329] = 29\nN[330] = 30\nN[331] = 31\nN[332] = 32\nN[333] = 33\nN[334] = 34\nN[335] = 35\nN[336] = 36\nN[337] = 37\nN[338] = 38\nN[339] = 39\nN[340] = 40\nN[341] = 41\nN[342] = 42\nN[343] = 43\nN[344] = 44\nN[345] = 45\nN[346] = 46\nN[347] = 47\nN[348] = 48\nN[349] = 49\nN[350] = 0\nN[351] = 1\nN[352] = 2\nN[353] = 3\nN[354] = 4\nN[355] = 5\nN[356] = 6\nN[357] = 7\nN[358] = 8\nN[359] = 9\nN[360] = 10\nN[361] = 11\nN[362] = 12\nN[363] = 13\nN[364] = 14\nN[365] = 15\nN[366] = 16\nN[367] = 17\nN[368] = 18\nN[369] = 19\nN[370] = 20\nN[371] = 21\nN[372] = 22\nN[373] = 23\nN[374] = 24\nN[375] = 25\nN[376] = 26\nN[377] = 27\nN[378] = 28\nN[379] = 29\nN[380] = 30\nN[381] = 31\nN[382] = 32\nN[383] = 33\nN[384] = 34\nN[385] = 35\nN[386] = 36\nN[387] = 37\nN[388] = 38\nN[389] = 39\nN[390] = 40\nN[391] = 41\nN[392] = 42\nN[393] = 43\nN[394] = 44\nN[395] = 45\nN[396] = 46\nN[397] = 47\nN[398] = 48\nN[399] = 49\nN[400] = 0\nN[401] = 1\nN[402] = 2\nN[403] = 3\nN[404] = 4\nN[405] = 5\nN[406] = 6\nN[407] = 7\nN[408] = 8\nN[409] = 9\nN[410] = 10\nN[411] = 11\nN[412] = 12\nN[413] = 13\nN[414] = 14\nN[415] = 15\nN[416] = 16\nN[417] = 17\nN[418] = 18\nN[419] = 19\nN[420] = 20\nN[421] = 21\nN[422] = 22\nN[423] = 23\nN[424] = 24\nN[425] = 25\nN[426] = 26\nN[427] = 27\nN[428] = 28\nN[429] = 29\nN[430] = 30\nN[431] = 31\nN[432] = 32\nN[433] = 33\nN[434] = 34\nN[435] = 35\nN[436] = 36\nN[437] = 37\nN[438] = 38\nN[439] = 39\nN[440] = 40\nN[441] = 41\nN[442] = 42\nN[443] = 43\nN[444] = 44\nN[445] = 45\nN[446] = 46\nN[447] = 47\nN[448] = 48\nN[449] = 49\nN[450] = 0\nN[451] = 1\nN[452] = 2\nN[453] = 3\nN[454] = 4\nN[455] = 5\nN[456] = 6\nN[457] = 7\nN[458] = 8\nN[459] = 9\nN[460] = 10\nN[461] = 11\nN[462] = 12\nN[463] = 13\nN[464] = 14\nN[465] = 15\nN[466] = 16\nN[467] = 17\nN[468] = 18\nN[469] = 19\nN[470] = 20\nN[471] = 21\nN[472] = 22\nN[473] = 23\nN[474] = 24\nN[475] = 25\nN[476] = 26\nN[477] = 27\nN[478] = 28\nN[479] = 29\nN[480] = 30\nN[481] = 31\nN[482] = 32\nN[483] = 33\nN[484] = 34\nN[485] = 35\nN[486] = 36\nN[487] = 37\nN[488] = 38\nN[489] = 39\nN[490] = 40\nN[491] = 41\nN[492] = 42\nN[493] = 43\nN[494] = 44\nN[495] = 45\nN[496] = 46\nN[497] = 47\nN[498] = 48\nN[499] = 49\nN[500] = 0\nN[501] = 1\nN[502] = 2\nN[503] = 3\nN[504] = 4\nN[505] = 5\nN[506] = 6\nN[507] = 7\nN[508] = 8\nN[509] = 9\nN[510] = 10\nN[511] = 11\nN[512] = 12\nN[513] = 13\nN[514] = 14\nN[515] = 15\nN[516] = 16\nN[517] = 17\nN[518] = 18\nN[519] = 19\nN[520] = 20\nN[521] = 21\nN[522] = 22\nN[523] = 23\nN[524] = 24\nN[525] = 25\nN[526] = 26\nN[527] = 27\nN[528] = 28\nN[529] = 29\nN[530] = 30\nN[531] = 31\nN[532] = 32\nN[533] = 33\nN[534] = 34\nN[535] = 35\nN[536] = 36\nN[537] = 37\nN[538] = 38\nN[539] = 39\nN[540] = 40\nN[541] = 41\nN[542] = 42\nN[543] = 43\nN[544] = 44\nN[545] = 45\nN[546] = 46\nN[547] = 47\nN[548] = 48\nN[549] = 49\nN[550] = 0\nN[551] = 1\nN[552] = 2\nN[553] = 3\nN[554] = 4\nN[555] = 5\nN[556] = 6\nN[557] = 7\nN[558] = 8\nN[559] = 9\nN[560] = 10\nN[561] = 11\nN[562] = 12\nN[563] = 13\nN[564] = 14\nN[565] = 15\nN[566] = 16\nN[567] = 17\nN[568] = 18\nN[569] = 19\nN[570] = 20\nN[571] = 21\nN[572] = 22\nN[573] = 23\nN[574] = 24\nN[575] = 25\nN[576] = 26\nN[577] = 27\nN[578] = 28\nN[579] = 29\nN[580] = 30\nN[581] = 31\nN[582] = 32\nN[583] = 33\nN[584] = 34\nN[585] = 35\nN[586] = 36\nN[587] = 37\nN[588] = 38\nN[589] = 39\nN[590] = 40\nN[591] = 41\nN[592] = 42\nN[593] = 43\nN[594] = 44\nN[595] = 45\nN[596] = 46\nN[597] = 47\nN[598] = 48\nN[599] = 49\nN[600] = 0\nN[601] = 1\nN[602] = 2\nN[603] = 3\nN[604] = 4\nN[605] = 5\nN[606] = 6\nN[607] = 7\nN[608] = 8\nN[609] = 9\nN[610] = 10\nN[611] = 11\nN[612] = 12\nN[613] = 13\nN[614] = 14\nN[615] = 15\nN[616] = 16\nN[617] = 17\nN[618] = 18\nN[619] = 19\nN[620] = 20\nN[621] = 21\nN[622] = 22\nN[623] = 23\nN[624] = 24\nN[625] = 25\nN[626] = 26\nN[627] = 27\nN[628] = 28\nN[629] = 29\nN[630] = 30\nN[631] = 31\nN[632] = 32\nN[633] = 33\nN[634] = 34\nN[635] = 35\nN[636] = 36\nN[637] = 37\nN[638] = 38\nN[639] = 39\nN[640] = 40\nN[641] = 41\nN[642] = 42\nN[643] = 43\nN[644] = 44\nN[645] = 45\nN[646] = 46\nN[647] = 47\nN[648] = 48\nN[649] = 49\nN[650] = 0\nN[651] = 1\nN[652] = 2\nN[653] = 3\nN[654] = 4\nN[655] = 5\nN[656] = 6\nN[657] = 7\nN[658] = 8\nN[659] = 9\nN[660] = 10\nN[661] = 11\nN[662] = 12\nN[663] = 13\nN[664] = 14\nN[665] = 15\nN[666] = 16\nN[667] = 17\nN[668] = 18\nN[669] = 19\nN[670] = 20\nN[671] = 21\nN[672] = 22\nN[673] = 23\nN[674] = 24\nN[675] = 25\nN[676] = 26\nN[677] = 27\nN[678] = 28\nN[679] = 29\nN[680] = 30\nN[681] = 31\nN[682] = 32\nN[683] = 33\nN[684] = 34\nN[685] = 35\nN[686] = 36\nN[687] = 37\nN[688] = 38\nN[689] = 39\nN[690] = 40\nN[691] = 41\nN[692] = 42\nN[693] = 43\nN[694] = 44\nN[695] = 45\nN[696] = 46\nN[697] = 47\nN[698] = 48\nN[699] = 49\nN[700] = 0\nN[701] = 1\nN[702] = 2\nN[703] = 3\nN[704] = 4\nN[705] = 5\nN[706] = 6\nN[707] = 7\nN[708] = 8\nN[709] = 9\nN[710] = 10\nN[711] = 11\nN[712] = 12\nN[713] = 13\nN[714] = 14\nN[715] = 15\nN[716] = 16\nN[717] = 17\nN[718] = 18\nN[719] = 19\nN[720] = 20\nN[721] = 21\nN[722] = 22\nN[723] = 23\nN[724] = 24\nN[725] = 25\nN[726] = 26\nN[727] = 27\nN[728] = 28\nN[729] = 29\nN[730] = 30\nN[731] = 31\nN[732] = 32\nN[733] = 33\nN[734] = 34\nN[735] = 35\nN[736] = 36\nN[737] = 37\nN[738] = 38\nN[739] = 39\nN[740] = 40\nN[741] = 41\nN[742] = 42\nN[743] = 43\nN[744] = 44\nN[745] = 45\nN[746] = 46\nN[747] = 47\nN[748] = 48\nN[749] = 49\nN[750] = 0\nN[751] = 1\nN[752] = 2\nN[753] = 3\nN[754] = 4\nN[755] = 5\nN[756] = 6\nN[757] = 7\nN[758] = 8\nN[759] = 9\nN[760] = 10\nN[761] = 11\nN[762] = 12\nN[763] = 13\nN[764] = 14\nN[765] = 15\nN[766] = 16\nN[767] = 17\nN[768] = 18\nN[769] = 19\nN[770] = 20\nN[771] = 21\nN[772] = 22\nN[773] = 23\nN[774] = 24\nN[775] = 25\nN[776] = 26\nN[777] = 27\nN[778] = 28\nN[779] = 29\nN[780] = 30\nN[781] = 31\nN[782] = 32\nN[783] = 33\nN[784] = 34\nN[785] = 35\nN[786] = 36\nN[787] = 37\nN[788] = 38\nN[789] = 39\nN[790] = 40\nN[791] = 41\nN[792] = 42\nN[793] = 43\nN[794] = 44\nN[795] = 45\nN[796] = 46\nN[797] = 47\nN[798] = 48\nN[799] = 49\nN[800] = 0\nN[801] = 1\nN[802] = 2\nN[803] = 3\nN[804] = 4\nN[805] = 5\nN[806] = 6\nN[807] = 7\nN[808] = 8\nN[809] = 9\nN[810] = 10\nN[811] = 11\nN[812] = 12\nN[813] = 13\nN[814] = 14\nN[815] = 15\nN[816] = 16\nN[817] = 17\nN[818] = 18\nN[819] = 19\nN[820] = 20\nN[821] = 21\nN[822] = 22\nN[823] = 23\nN[824] = 24\nN[825] = 25\nN[826] = 26\nN[827] = 27\nN[828] = 28\nN[829] = 29\nN[830] = 30\nN[831] = 31\nN[832] = 32\nN[833] = 33\nN[834] = 34\nN[835] = 35\nN[836] = 36\nN[837] = 37\nN[838] = 38\nN[839] = 39\nN[840] = 40\nN[841] = 41\nN[842] = 42\nN[843] = 43\nN[844] = 44\nN[845] = 45\nN[846] = 46\nN[847] = 47\nN[848] = 48\nN[849] = 49\nN[850] = 0\nN[851] = 1\nN[852] = 2\nN[853] = 3\nN[854] = 4\nN[855] = 5\nN[856] = 6\nN[857] = 7\nN[858] = 8\nN[859] = 9\nN[860] = 10\nN[861] = 11\nN[862] = 12\nN[863] = 13\nN[864] = 14\nN[865] = 15\nN[866] = 16\nN[867] = 17\nN[868] = 18\nN[869] = 19\nN[870] = 20\nN[871] = 21\nN[872] = 22\nN[873] = 23\nN[874] = 24\nN[875] = 25\nN[876] = 26\nN[877] = 27\nN[878] = 28\nN[879] = 29\nN[880] = 30\nN[881] = 31\nN[882] = 32\nN[883] = 33\nN[884] = 34\nN[885] = 35\nN[886] = 36\nN[887] = 37\nN[888] = 38\nN[889] = 39\nN[890] = 40\nN[891] = 41\nN[892] = 42\nN[893] = 43\nN[894] = 44\nN[895] = 45\nN[896] = 46\nN[897] = 47\nN[898] = 48\nN[899] = 49\nN[900] = 0\nN[901] = 1\nN[902] = 2\nN[903] = 3\nN[904] = 4\nN[905] = 5\nN[906] = 6\nN[907] = 7\nN[908] = 8\nN[909] = 9\nN[910] = 10\nN[911] = 11\nN[912] = 12\nN[913] = 13\nN[914] = 14\nN[915] = 15\nN[916] = 16\nN[917] = 17\nN[918] = 18\nN[919] = 19\nN[920] = 20\nN[921] = 21\nN[922] = 22\nN[923] = 23\nN[924] = 24\nN[925] = 25\nN[926] = 26\nN[927] = 27\nN[928] = 28\nN[929] = 29\nN[930] = 30\nN[931] = 31\nN[932] = 32\nN[933] = 33\nN[934] = 34\nN[935] = 35\nN[936] = 36\nN[937] = 37\nN[938] = 38\nN[939] = 39\nN[940] = 40\nN[941] = 41\nN[942] = 42\nN[943] = 43\nN[944] = 44\nN[945] = 45\nN[946] = 46\nN[947] = 47\nN[948] = 48\nN[949] = 49\nN[950] = 0\nN[951] = 1\nN[952] = 2\nN[953] = 3\nN[954] = 4\nN[955] = 5\nN[956] = 6\nN[957] = 7\nN[958] = 8\nN[959] = 9\nN[960] = 10\nN[961] = 11\nN[962] = 12\nN[963] = 13\nN[964] = 14\nN[965] = 15\nN[966] = 16\nN[967] = 17\nN[968] = 18\nN[969] = 19\nN[970] = 20\nN[971] = 21\nN[972] = 22\nN[973] = 23\nN[974] = 24\nN[975] = 25\nN[976] = 26\nN[977] = 27\nN[978] = 28\nN[979] = 29\nN[980] = 30\nN[981] = 31\nN[982] = 32\nN[983] = 33\nN[984] = 34\nN[985] = 35\nN[986] = 36\nN[987] = 37\nN[988] = 38\nN[989] = 39\nN[990] = 40\nN[991] = 41\nN[992] = 42\nN[993] = 43\nN[994] = 44\nN[995] = 45\nN[996] = 46\nN[997] = 47\nN[998] = 48\nN[999] = 49', false, 3),
  ('00000000-0000-0000-0000-00000000003d', E'10\n3\n5\n8\n3', E'7', true, 1),
  ('00000000-0000-0000-0000-00000000003d', E'1\n1\n1', E'0', false, 2),
  ('00000000-0000-0000-0000-00000000003d', E'5\n5\n1\n1\n1\n1\n1', E'4', false, 3),
  ('00000000-0000-0000-0000-00000000003d', E'4\n4\n1\n2\n3\n4', E'0', false, 4),
  ('00000000-0000-0000-0000-00000000003e', E'3\n0\n4\n2', E'Fib(0) = 0\nFib(4) = 3\nFib(2) = 1', true, 1),
  ('00000000-0000-0000-0000-00000000003e', E'1\n60', E'Fib(60) = 1548008755920', false, 2),
  ('00000000-0000-0000-0000-00000000003e', E'2\n1\n10', E'Fib(1) = 1\nFib(10) = 55', false, 3),
  ('00000000-0000-0000-0000-00000000003e', E'4\n5\n6\n7\n8', E'Fib(5) = 5\nFib(6) = 8\nFib(7) = 13\nFib(8) = 21', false, 4),
  ('00000000-0000-0000-0000-00000000003f', E'1\n3\n4\n-4\n2\n3\n8\n2\n5\n-7\n54\n76\n789\n23\n98', E'par[0] = 4\npar[1] = -4\npar[2] = 2\npar[3] = 8\npar[4] = 2\nimpar[0] = 1\nimpar[1] = 3\nimpar[2] = 3\nimpar[3] = 5\nimpar[4] = -7\nimpar[0] = 789\nimpar[1] = 23\npar[0] = 54\npar[1] = 76\npar[2] = 98', true, 1),
  ('00000000-0000-0000-0000-00000000003f', E'2\n4\n6\n8\n10\n12\n14\n16\n18\n20\n1\n3\n5\n7\n9', E'par[0] = 2\npar[1] = 4\npar[2] = 6\npar[3] = 8\npar[4] = 10\npar[0] = 12\npar[1] = 14\npar[2] = 16\npar[3] = 18\npar[4] = 20\nimpar[0] = 1\nimpar[1] = 3\nimpar[2] = 5\nimpar[3] = 7\nimpar[4] = 9', false, 2),
  ('00000000-0000-0000-0000-00000000003f', E'1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15', E'impar[0] = 1\nimpar[1] = 3\nimpar[2] = 5\nimpar[3] = 7\nimpar[4] = 9\npar[0] = 2\npar[1] = 4\npar[2] = 6\npar[3] = 8\npar[4] = 10\nimpar[0] = 11\nimpar[1] = 13\nimpar[2] = 15\npar[0] = 12\npar[1] = 14', false, 3),
  ('00000000-0000-0000-0000-000000000040', E'2\nS\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'36.0', true, 1),
  ('00000000-0000-0000-0000-000000000040', E'0\nM\n-18.8\n-37.6\n-68.0\n-62.9\n-28.0\n46.6\n-78.2\n-11.0\n57.1\n-75.0\n-47.8\n-40.8\n61.3\n47.8\n21.6\n-10.4\n-51.4\n-40.8\n-61.3\n71.8\n-42.4\n-74.7\n97.4\n-70.9\n-9.4\n-95.5\n-2.4\n51.7\n17.4\n-66.4\n-31.0\n49.1\n54.2\n-33.1\n83.0\n-78.9\n44.0\n74.7\n7.8\n95.5\n29.3\n-81.1\n13.6\n-57.8\n-55.5\n-85.9\n-33.1\n-4.3\n-58.7\n-86.2\n25.1\n77.3\n-4.3\n21.9\n-29.3\n18.4\n-55.2\n65.4\n-66.1\n88.8\n39.5\n24.8\n10.4\n29.6\n81.1\n-82.1\n21.9\n25.8\n74.1\n93.9\n77.0\n92.6\n-22.9\n-89.4\n-90.4\n3.4\n-10.4\n64.8\n-76.6\n81.1\n43.0\n56.8\n-69.7\n19.4\n91.0\n45.0\n-58.7\n-26.7\n-13.0\n-75.0\n45.9\n-45.9\n37.9\n28.3\n41.8\n-11.0\n-4.0\n72.8\n5.3\n-22.2\n64.5\n-65.1\n3.0\n-36.0\n-5.3\n-41.2\n-86.2\n15.8\n0.2\n-68.0\n59.4\n26.7\n17.1\n93.0\n49.8\n91.0\n-77.9\n-67.7\n34.7\n99.4\n25.4\n-11.0\n-84.0\n-37.3\n-32.2\n-78.2\n68.6\n90.1\n-76.6\n18.1\n-33.4\n43.0\n-79.2\n98.1\n11.7\n74.1\n-85.3\n-28.0\n31.2\n-61.6\n57.4\n94.6\n-54.9\n-14.2', E'-30.4', false, 2),
  ('00000000-0000-0000-0000-000000000040', E'11\nS\n92.0\n19.7\n-93.3\n18.4\n1.1\n-96.8\n-29.6\n44.6\n68.3\n38.9\n-95.5\n-15.5\n-78.9\n69.0\n-13.9\n31.8\n-24.8\n-68.3\n-58.4\n-91.0\n37.6\n93.3\n6.9\n-86.2\n45.9\n-33.8\n-89.8\n-29.3\n-82.7\n-27.0\n-90.7\n-74.2\n-75.7\n90.4\n15.5\n40.5\n-97.8\n54.2\n0.2\n36.3\n-67.4\n-9.4\n83.4\n68.0\n86.6\n7.2\n71.2\n-89.8\n-85.6\n-26.7\n31.8\n69.9\n21.3\n-14.6\n-35.7\n-51.7\n6.6\n52.6\n32.5\n83.7\n20.3\n47.5\n42.1\n8.2\n26.1\n36.3\n38.9\n7.2\n75.4\n-22.6\n86.6\n59.7\n20.6\n26.4\n13.8\n47.2\n-51.4\n-93.0\n74.4\n-55.5\n73.4\n19.7\n-91.0\n0.8\n-6.2\n-53.6\n75.4\n-75.7\n-4.1\n-33.9\n-77.3\n-32.2\n-64.2\n-6.6\n-34.7\n-43.0\n24.8\n-49.4\n68.0\n-24.8\n-16.5\n-50.1\n67.0\n59.7\n7.2\n30.2\n-71.5\n92.3\n-43.0\n45.3\n4.6\n25.4\n37.9\n78.6\n-44.6\n-48.5\n17.8\n82.4\n91.0\n50.4\n-72.5\n-40.5\n48.2\n-44.3\n51.0\n56.8\n-60.3\n82.4\n89.4\n82.4\n-62.6\n-1.4\n92.3\n18.7\n76.3\n63.8\n-59.0\n44.6\n82.4\n78.6\n-14.9\n-72.2\n-90.7\n-55.8', E'164.1', false, 3),
  ('00000000-0000-0000-0000-000000000040', E'5\nM\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'6.0', false, 4),
  ('00000000-0000-0000-0000-000000000041', E'S\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'572.0', true, 1),
  ('00000000-0000-0000-0000-000000000041', E'M\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'8.7', false, 2),
  ('00000000-0000-0000-0000-000000000041', E'S\n-13.6\n11.4\n-1.4\n-90.1\n91.0\n26.7\n-1.1\n-63.5\n-77.9\n30.6\n59.7\n93.0\n-13.3\n48.5\n-59.0\n-11.7\n-41.4\n-15.5\n-87.8\n89.1\n-56.5\n48.2\n85.9\n-66.4\n-34.7\n31.2\n15.8\n63.5\n50.1\n-89.8\n-3.1\n91.7\n-77.3\n-66.4\n20.3\n45.3\n-67.4\n79.5\n-55.6\n3.7\n18.1\n-27.0\n-53.6\n50.7\n-93.6\n-23.8\n-28.3\n-37.6\n14.9\n20.3\n13.6\n10.1\n-96.2\n19.4\n-19.0\n-59.0\n-19.7\n45.9\n84.0\n-15.8\n84.6\n2.7\n-37.0\n-14.2\n34.7\n48.5\n70.9\n74.1\n-48.5\n-90.4\n-58.7\n46.6\n48.2\n81.4\n76.9\n-98.4\n11.7\n-44.6\n-8.2\n53.6\n-82.4\n28.6\n21.6\n59.0\n-47.8\n61.0\n74.7\n-5.0\n97.8\n-33.8\n-89.8\n-40.5\n-55.8\n92.3\n-1.1\n76.0\n30.6\n-86.2\n-93.6\n-72.2\n70.2\n-42.4\n48.2\n21.6\n-8.5\n97.1\n-82.4\n-80.5\n11.7\n-88.5\n-14.6\n-18.4\n70.6\n7.8\n24.2\n-67.4\n92.3\n21.6\n77.6\n-34.1\n-85.9\n-35.7\n-74.7\n-95.5\n-83.4\n88.8\n89.1\n-99.4\n15.5\n34.4\n26.1\n59.7\n-61.0\n76.6\n-42.7\n46.9\n-69.3\n-21.9\n-52.0\n-5.6\n56.8\n-98.1\n-19.7\n27.7', E'-341.2', false, 3),
  ('00000000-0000-0000-0000-000000000041', E'M\n43.1\n-55.8\n-69.6\n-62.9\n-42.4\n-84.6\n69.3\n38.2\n53.0\n-0.8\n-9.8\n-64.8\n76.6\n6.9\n97.4\n-80.2\n-55.2\n-55.5\n65.8\n-80.8\n80.5\n22.9\n20.0\n23.8\n23.8\n88.5\n-11.0\n-85.0\n55.5\n8.5\n-58.5\n75.7\n-16.8\n64.5\n-25.4\n-26.1\n17.1\n53.6\n73.1\n28.3\n-7.2\n42.4\n78.6\n87.8\n4.0\n-78.6\n43.7\n-93.0\n84.0\n2.4\n-86.9\n-91.4\n19.7\n18.7\n-98.7\n-73.8\n48.2\n15.5\n-84.6\n-30.2\n-53.0\n-25.8\n-52.6\n-8.8\n66.7\n-59.7\n42.7\n69.0\n-54.9\n-42.4\n36.6\n-41.1\n-8.5\n-62.6\n66.7\n-82.7\n70.6\n-60.6\n-52.3\n-89.1\n59.7\n-35.7\n42.7\n74.1\n31.5\n-36.3\n-12.0\n79.2\n-15.2\n16.5\n-70.2\n88.5\n69.9\n92.0\n57.1\n14.2\n77.6\n72.8\n-34.1\n28.0\n60.3\n-8.2\n-28.0\n34.7\n-66.7\n33.1\n-36.3\n40.8\n-87.8\n-99.0\n-19.4\n-57.4\n9.1\n-38.6\n-13.3\n-20.0\n33.1\n-38.9\n-40.5\n-50.1\n15.2\n-28.7\n92.3\n78.2\n-42.4\n83.4\n43.4\n62.2\n-9.1\n53.9\n-86.2\n69.6\n28.3\n68.6\n27.7\n-21.9\n84.6\n80.8\n-63.2\n43.4\n85.0\n-26.1\n89.1\n72.8', E'11.2', false, 4),
  ('00000000-0000-0000-0000-000000000042', E'S\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'70.0', true, 1),
  ('00000000-0000-0000-0000-000000000042', E'M\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n1.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n2.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n3.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n4.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n5.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n6.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n7.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n8.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n9.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n10.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n11.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0\n12.0', E'2.3', false, 2),
  ('00000000-0000-0000-0000-000000000042', E'S\n-87.3\n-53.9\n-11.4\n55.2\n62.2\n-65.8\n33.1\n-5.0\n-55.8\n23.5\n-22.2\n-17.4\n41.4\n-63.8\n-90.7\n-61.6\n69.0\n-2.7\n1.8\n-29.9\n-24.2\n88.8\n-61.3\n44.9\n77.0\n26.7\n49.1\n-12.3\n-5.9\n58.4\n88.8\n-97.1\n-76.6\n-56.2\n26.1\n-31.5\n-84.6\n21.9\n-100.0\n-74.1\n-26.7\n27.4\n53.9\n-48.8\n72.2\n-31.8\n42.4\n28.6\n-51.4\n-24.8\n-42.1\n55.8\n46.9\n-67.0\n63.2\n-16.5\n-6.6\n-5.0\n97.1\n95.2\n9.1\n62.9\n60.0\n-14.6\n-2.7\n-59.7\n93.0\n-19.0\n21.6\n-49.4\n68.0\n-98.7\n57.8\n39.2\n-91.4\n-44.0\n-10.4\n86.9\n84.6\n9.4\n33.4\n-13.0\n-50.4\n1.4\n-30.9\n-33.4\n76.0\n-3.0\n-55.8\n86.6\n-11.0\n-7.8\n-67.4\n-73.1\n18.1\n35.7\n-44.3\n-81.1\n-29.0\n-20.3\n-62.6\n-44.3\n-74.7\n-57.1\n-9.4\n7.8\n95.5\n-84.6\n-23.6\n94.6\n8.8\n82.7\n85.6\n67.4\n-86.2\n-93.6\n-23.5\n8.8\n-12.7\n-81.1\n-32.2\n-45.9\n54.9\n78.9\n70.2\n-78.6\n-26.1\n89.4\n-37.9\n84.6\n-57.1\n-91.4\n-8.2\n-45.6\n23.2\n24.5\n14.9\n97.1\n94.6\n-68.0\n96.2\n45.6\n-9.4\n74.4', E'-132.3', false, 3),
  ('00000000-0000-0000-0000-000000000042', E'M\n-78.4\n85.3\n-60.3\n57.8\n-67.0\n29.6\n8.2\n3.0\n-40.5\n-70.9\n70.2\n51.7\n-57.8\n88.2\n86.2\n-77.9\n-18.7\n-65.4\n14.9\n-25.1\n83.4\n-39.5\n33.8\n-7.5\n-13.6\n-41.8\n74.6\n-58.1\n-82.4\n91.4\n-11.0\n-65.1\n-72.5\n79.5\n-12.6\n16.2\n-43.7\n90.4\n97.8\n-59.7\n43.0\n37.6\n18.1\n12.3\n54.2\n-58.4\n10.7\n-98.4\n-1.1\n57.8\n-78.9\n-30.2\n15.8\n12.6\n-68.3\n54.9\n92.6\n-36.0\n-91.4\n-64.2\n-68.0\n-13.3\n15.2\n23.2\n45.6\n-65.8\n99.4\n30.9\n-74.7\n-24.5\n-0.5\n89.4\n-84.6\n-94.6\n5.3\n33.8\n-40.2\n49.4\n83.0\n52.6\n-81.8\n-28.0\n-91.0\n41.8\n70.6\n58.4\n33.1\n-90.4\n58.4\n60.6\n-2.4\n-14.6\n72.2\n86.6\n-56.5\n-54.2\n25.1\n-51.7\n82.7\n43.7\n-29.9\n61.9\n-57.1\n43.7\n85.0\n-27.7\n-57.4\n-39.8\n-98.4\n-82.7\n56.2\n42.7\n10.7\n-0.5\n82.7\n71.2\n13.6\n-99.0\n-9.8\n-17.8\n16.8\n-48.8\n73.1\n77.3\n98.4\n-52.3\n-96.5\n-88.8\n-89.4\n-85.0\n95.8\n-49.4\n43.7\n-14.2\n30.2\n3.0\n-56.2\n98.7\n2.1\n40.8\n-53.0\n77.0\n-2.1\n-62.9', E'-5.6', false, 4),
  ('00000000-0000-0000-0000-000000000043', E'4\n100 150 1.0 0.0\n90000 120000 5.5 3.5\n56700 72000 5.2 3.0\n123 2000 3.0 2.0', E'51 anos.\n16 anos.\n12 anos.\nMais de 1 seculo.', true, 1),
  ('00000000-0000-0000-0000-000000000043', E'1\n100 150 1.0 0.0', E'51 anos.', false, 2),
  ('00000000-0000-0000-0000-000000000043', E'2\n100000 110000 10.0 0.0\n100 101 0.1 0.0', E'2 anos.\nMais de 1 seculo.', false, 3),
  ('00000000-0000-0000-0000-000000000044', E'This is a dancing sentence\n  This   is         a  dancing   sentence  \naaaaaaaaaaa\nz', E'ThIs Is A dAnCiNg SeNtEnCe\n  ThIs   Is         A  dAnCiNg   SeNtEnCe  \nAaAaAaAaAaA\nZ', true, 1),
  ('00000000-0000-0000-0000-000000000044', E'A b Cd', E'A b Cd', false, 2),
  ('00000000-0000-0000-0000-000000000044', E'hello world\nHELLO WORLD', E'HeLlO wOrLd\nHeLlO wOrLd', false, 3),
  ('00000000-0000-0000-0000-000000000045', E'4\nVQREQFGT\n2\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n10\nTOPCODER\n0\nZWBGLZ\n25', E'TOPCODER\nQRSTUVWXYZABCDEFGHIJKLMNOP\nTOPCODER\nAXCHMA', true, 1),
  ('00000000-0000-0000-0000-000000000045', E'1\nA\n1', E'Z', false, 2),
  ('00000000-0000-0000-0000-000000000045', E'2\nAAAA\n25\nZZZZ\n1', E'BBBB\nYYYY', false, 3),
  ('00000000-0000-0000-0000-000000000046', E'5\nI ENIL SIHTHSIREBBIG S\nLEVELKAYAK\nH YPPAHSYADILO\nABCDEFGHIJKLMNOPQRSTUVWXYZ\nVOD OWT SNEH HCNERF EGDIRTRAP A DNA SE\n', E'THIS LINE IS GIBBERISH\nLEVELKAYAK\nHAPPY HOLIDAYS\nMLKJIHGFEDCBAZYXWVUTSRQPON\nFRENCH HENS TWO DOVES AND A PARTRIDGE', true, 1),
  ('00000000-0000-0000-0000-000000000046', E'1\nNAMSOG\n', E'MANGOS', false, 2),
  ('00000000-0000-0000-0000-000000000046', E'2\nBA\nDCBA\n', E'BA\nCDAB', false, 3);

update problems set hints = array[
    E'Um for que começa em 1 e vai somando 2 já passa só pelos ímpares — não precisa testar cada número.',
    E'Se preferir testar, a condição de ímpar é i % 2 != 0.',
    E'Cada valor sai em sua própria linha: use endl (ou \\n) depois de cada um.'
] where id = '00000000-0000-0000-0000-00000000002f';

update problems set hints = array[
    E'Você não precisa guardar os 5 valores: leia um de cada vez dentro de um for e vá contando.',
    E'Cuidado com números negativos: em C++, -5 % 2 vale -1, então teste v % 2 == 0 para par em vez de == 1 para ímpar.',
    E'A saída é o número seguido de " valores pares" — sem quebrar em duas linhas.'
] where id = '00000000-0000-0000-0000-000000000030';

update problems set hints = array[
    E'O acumulador do produto começa em 1, não em 0 — senão tudo vira zero.',
    E'Um for de 1 até N multiplicando o acumulador por i resolve.',
    E'N < 13 é justamente o limite pra caber num int; não precisa de long long aqui.'
] where id = '00000000-0000-0000-0000-000000000031';

update problems set hints = array[
    E'Repare no padrão: a cada linha os números avançam de 4 em 4. A linha 1 começa em 1, a linha 2 em 5, a linha 3 em 9.',
    E'Um for externo conta as N linhas; dentro dele, imprima três números e depois PUM.',
    E'Os itens são separados por espaço e não há espaço antes do fim da linha.'
] where id = '00000000-0000-0000-0000-000000000032';

update problems set hints = array[
    E'É o caso clássico de switch: um case para cada número de 1 a 12.',
    E'Não esqueça o break em cada case, senão a execução escorrega para o mês seguinte.',
    E'Uma alternativa mais curta: um vetor de strings com os 12 nomes e imprimir nomes[n-1].'
] where id = '00000000-0000-0000-0000-000000000033';

update problems set hints = array[
    E'switch com um case por DDD, e o default cuidando dos não cadastrados.',
    E'Os nomes vão sem acento: Sao Paulo, Brasilia, Vitoria.',
    E'A mensagem de erro é exatamente "DDD nao cadastrado" — sem acento e sem ponto final.'
] where id = '00000000-0000-0000-0000-000000000034';

update problems set hints = array[
    E'Descubra o preço unitário com um switch sobre o código e depois multiplique pela quantidade.',
    E'O preço precisa ser double — 4.50 num int viraria 4.',
    E'Formate com fixed << setprecision(2) (biblioteca iomanip). Repare no espaço depois do "R$".'
] where id = '00000000-0000-0000-0000-000000000035';

update problems set hints = array[
    E'São três situações mutuamente exclusivas: atrasou, entregou com folga, ou entregou em cima da hora. Um if / else if / else dá conta.',
    E'A folga é a diferença D - E. Com 3 ou mais dias, ela apresenta tranquila.',
    E'No caso apertado saem DUAS linhas: a mensagem do filho e, depois, o resultado de D + 2 comparado com 24.'
] where id = '00000000-0000-0000-0000-000000000036';

update problems set hints = array[
    E'Leia as três palavras em três strings; em C++ dá pra comparar string com == direto.',
    E'Vá afunilando: primeiro decida vertebrado ou invertebrado, depois o segundo nível, depois o terceiro.',
    E'São 8 combinações possíveis — cada uma leva a exatamente um animal.'
] where id = '00000000-0000-0000-0000-000000000037';

update problems set hints = array[
    E'Não precisa simular o apresentador. Pense no que acontece quando o jogador sempre troca.',
    E'Se o carro estava na porta 1 (a escolhida), trocar sempre perde. Se estava em outra, trocar sempre ganha.',
    E'Ou seja: basta contar quantos jogos têm o carro numa porta diferente de 1.'
] where id = '00000000-0000-0000-0000-000000000038';

update problems set hints = array[
    E'Guarde só os dois anteriores em duas variáveis — não precisa de vetor.',
    E'Para não sobrar espaço no fim: imprima o primeiro valor fora do laço e, nos seguintes, imprima o espaço ANTES do número.',
    E'Cuidado com N = 1: a saída é só o 0.'
] where id = '00000000-0000-0000-0000-000000000039';

update problems set hints = array[
    E'É o caso de uso do do-while: você sempre lê pelo menos um grenal antes de perguntar se tem outro.',
    E'Três contadores (Inter, Gremio, empates) e mais um do total — ou some os três no fim.',
    E'Repare no formato exato: "3 grenais" tem espaço, mas "Inter:2" e "Gremio:1" não têm espaço em volta dos dois-pontos.'
] where id = '00000000-0000-0000-0000-00000000003a';

update problems set hints = array[
    E'Preencha primeiro (n[0] = v, e depois n[i] = n[i-1] * 2), e só então percorra o vetor imprimindo.',
    E'Dá pra fazer tudo num laço só, mas separar preencher de imprimir deixa mais claro.',
    E'O formato tem espaços em volta do igual: N[0] = 1.'
] where id = '00000000-0000-0000-0000-00000000003b';

update problems set hints = array[
    E'O valor da posição i é simplesmente o resto de i dividido por T.',
    E'Ou seja: n[i] = i % t — sem precisar de contador auxiliar que zera.',
    E'São 1000 linhas de saída; confie no laço e não tente conferir uma a uma.'
] where id = '00000000-0000-0000-0000-00000000003c';

update problems set hints = array[
    E'Repetidas não contam duas vezes — então não dá pra simplesmente fazer N menos M.',
    E'Use um vetor de marcação: tem[x] = true quando a figurinha x aparece.',
    E'No fim, conte quantas posições de 1 a N continuaram falsas.'
] where id = '00000000-0000-0000-0000-00000000003d';

update problems set hints = array[
    E'Calcule os 61 termos UMA vez, num vetor, antes de ler os casos de teste.',
    E'Fib(60) não cabe num int — use unsigned long long (ou long long).',
    E'Depois é só responder cada consulta lendo fib[n] direto do vetor.'
] where id = '00000000-0000-0000-0000-00000000003e';

update problems set hints = array[
    E'Cada vetor precisa do seu próprio contador de quantos elementos já tem.',
    E'Ao encher (contador chega a 5): imprima os 5 e zere o contador — é isso que faz o índice voltar para 0.',
    E'No fim, imprima o que sobrou: primeiro o vetor ímpar, depois o par. Se um deles estiver vazio, não imprime nada dele.'
] where id = '00000000-0000-0000-0000-00000000003f';

update problems set hints = array[
    E'Leia a matriz inteira com dois for encaixados antes de calcular qualquer coisa.',
    E'Para somar só a linha L, você nem precisa do for externo: percorra as 12 colunas de m[L].',
    E'A média é a soma dividida por 12. Formate com fixed << setprecision(1).'
] where id = '00000000-0000-0000-0000-000000000040';

update problems set hints = array[
    E'A condição é i > j — a diagonal em si (i == j) fica de fora.',
    E'Conte os elementos com um qtd++ dentro do if, em vez de usar o número 66 fixo.',
    E'A média divide pela quantidade que você contou, não por 144.'
] where id = '00000000-0000-0000-0000-000000000041';

update problems set hints = array[
    E'São duas condições ao mesmo tempo: acima da diagonal principal (i < j) e acima da secundária (i + j < 11).',
    E'Confira o desenho: a linha 0 contribui com 10 elementos, e da linha 5 em diante não entra nenhum.',
    E'Conte com qtd++ em vez de dividir por 30 fixo — assim o mesmo código serve para as outras áreas.'
] where id = '00000000-0000-0000-0000-000000000042';

update problems set hints = array[
    E'A cada ano: pa = pa + pa * g1 / 100, e o mesmo para B. O resultado é truncado para inteiro.',
    E'Use double para as taxas (não float) e int para as populações — é o truncamento que faz a conta bater.',
    E'Pare o while assim que os anos passarem de 100, senão os casos grandes estouram o tempo limite.'
] where id = '00000000-0000-0000-0000-000000000043';

update problems set hints = array[
    E'Leia a linha inteira com getline, porque a sentença tem espaços.',
    E'Mantenha um contador só das LETRAS vistas: espaço não avança a alternância.',
    E'Letra de índice par vira maiúscula (toupper), ímpar vira minúscula (tolower). Espaço é copiado como está.'
] where id = '00000000-0000-0000-0000-000000000044';

update problems set hints = array[
    E'Trabalhe com a letra como número: c - ''A'' dá um valor de 0 a 25.',
    E'Para voltar N posições sem ficar negativo, some 26 antes de tirar o resto: (c - ''A'' - n + 26) % 26.',
    E'Depois é só somar ''A'' de volta e converter para char na hora de imprimir.'
] where id = '00000000-0000-0000-0000-000000000045';

update problems set hints = array[
    E'Divida a linha ao meio: as duas metades foram invertidas de forma independente.',
    E'Inverter a primeira metade e inverter a segunda metade, separadamente, já devolve o original.',
    E'Use getline para ler as linhas (elas têm espaços) e cuidado com o \\n que sobra depois de ler o N.'
] where id = '00000000-0000-0000-0000-000000000046';
