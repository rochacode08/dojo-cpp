-- Dicas progressivas pra cada problema (do mais vago pro mais específico,
-- nunca a solução pronta). Ficam escondidas no front-end até o usuário
-- clicar pra revelar, uma de cada vez.

update problems set hints = array[
  'Percorra o vetor com um for e, para cada elemento, verifique se ele é par usando o operador % (resto da divisão).',
  'Se não encontrar nenhum valor par, lembre-se de imprimir VAZIO — não deixe a linha em branco.',
  'Ao imprimir os pares, separe-os por espaço, mas cuidado para não deixar um espaço sobrando no final da linha.'
] where id = '00000000-0000-0000-0000-000000000001';

update problems set hints = array[
  'Percorra a string caractere por caractere com um for.',
  'Use tolower(c) para tratar maiúsculas e minúsculas com uma única comparação.',
  'Compare o caractere com a string "aeiou" usando find(), ou teste um por um com if/else.'
] where id = '00000000-0000-0000-0000-000000000002';

update problems set hints = array[
  'desempilhar() deve olhar o último elemento do vector (dados.back()) antes de removê-lo com pop_back().',
  'Trate o caso de pilha vazia primeiro: se dados.empty(), devolva -1 sem tentar acessar back().',
  'No main, o valor -1 devolvido por desempilhar() é o sinal para imprimir VAZIA em vez do número.'
] where id = '00000000-0000-0000-0000-000000000003';

update problems set hints = array[
  'Inicialize maior e menor com o primeiro elemento do vetor antes do loop.',
  'Dentro do loop, compare cada v[i] com maior e menor e atualize quando for o caso.',
  'Preste atenção à ordem de impressão: primeiro o maior, depois o menor.'
] where id = '00000000-0000-0000-0000-000000000004';

update problems set hints = array[
  'O caso base é fatorial(0) = 1 — sem ele, a recursão nunca para.',
  'O caso recursivo é n vezes fatorial(n - 1).',
  'Use long long no tipo de retorno para não estourar com valores maiores.'
] where id = '00000000-0000-0000-0000-000000000005';

update problems set hints = array[
  'Verifique as regras na ordem exata do enunciado: tamanho primeiro, depois dígito, depois maiúscula.',
  'Use um for percorrendo a senha com isdigit(c) e isupper(c) para detectar dígitos e maiúsculas.',
  'Só devolva VALIDA se nenhuma das três condições de erro anteriores for verdadeira.'
] where id = '00000000-0000-0000-0000-000000000006';

update problems set hints = array[
  'O vetor freq já conta quantas vezes cada valor de 1 a 50 apareceu — você só precisa percorrê-lo.',
  'Percorra freq de 1 a 50 (não de 0) e só imprima quando freq[valor] for maior que zero.',
  'A ordem de impressão é crescente pelo próprio valor, não pela frequência.'
] where id = '00000000-0000-0000-0000-000000000007';

update problems set hints = array[
  'Um loop de i=2 até 30 basta: fib[i] = fib[i-1] + fib[i-2].',
  'Preencha o vetor fib inteiro antes de processar as consultas.',
  'O vetor já é long long, então não precisa se preocupar com estouro nos índices altos.'
] where id = '00000000-0000-0000-0000-000000000008';

update problems set hints = array[
  'Percorra o vetor com um índice i e compare v[i] com o limite lido.',
  'Quando v[i] for menor ou igual ao limite, imprima o índice i e o valor formatado.',
  'setprecision(1) e fixed já estão configurados no cout — é só usar normalmente.'
] where id = '00000000-0000-0000-0000-000000000009';

update problems set hints = array[
  'Use stable_sort (não sort) para manter a ordem original entre palavras do mesmo tamanho.',
  'O comparador deve devolver true quando a primeira palavra deve vir antes da segunda.',
  'Compare usando a.size() maior que b.size() dentro da lambda, para ordem decrescente.'
] where id = '00000000-0000-0000-0000-00000000000a';

update problems set hints = array[
  'somaColuna deve percorrer todas as linhas (dados[i][coluna]) e somar os valores dessa coluna.',
  'mediaColuna pode reaproveitar somaColuna(coluna) dividido pelo número de linhas.',
  'Converta para double antes de dividir, senão o resultado fica truncado.'
] where id = '00000000-0000-0000-0000-00000000000b';

update problems set hints = array[
  'A fórmula é area = pi vezes raio ao quadrado.',
  'setprecision(4) e fixed já estão configurados no cout.',
  'Não esqueça do A= antes do valor, sem espaço entre eles.'
] where id = '00000000-0000-0000-0000-00000000000c';

update problems set hints = array[
  'Primeiro calcule a distância: tempo multiplicado pela velocidade.',
  'O consumo é a distância dividida por 12 (km por litro).',
  'Cuidado com divisão inteira — use 12.0 (double) para não truncar o resultado.'
] where id = '00000000-0000-0000-0000-00000000000d';

update problems set hints = array[
  'Use if/else ou switch para mapear o código (1 a 5) para o preço correspondente.',
  'total é o preço multiplicado pela quantidade.',
  'A formatação R$ com 2 casas decimais já está pronta no cout — só falta calcular total.'
] where id = '00000000-0000-0000-0000-00000000000e';

update problems set hints = array[
  'Dois números são múltiplos se um deles dividido pelo outro tem resto zero.',
  'Use o operador % nos dois sentidos: a resto b igual a zero, ou b resto a igual a zero.',
  'Basta um if simples combinando as duas condições com ou (||).'
] where id = '00000000-0000-0000-0000-00000000000f';

update problems set hints = array[
  'Use um for de i = 1 até 10.',
  'Em cada iteração, calcule i multiplicado por n e imprima no formato pedido.',
  'O formato de cada linha é: i, espaço, x, espaço, n, espaço, igual, espaço, resultado.'
] where id = '00000000-0000-0000-0000-000000000010';

update problems set hints = array[
  'Use um for de 6 iterações, lendo um valor por vez com cin.',
  'Dentro do loop, incremente o contador quando o valor for maior ou igual a zero.',
  'Não precisa guardar os valores em um vetor — só contar enquanto lê.'
] where id = '00000000-0000-0000-0000-000000000011';

update problems set hints = array[
  'Use uma cadeia de if/else if, testando os intervalos na ordem: 0-25, depois 25-50, e assim por diante.',
  'Preste atenção nos limites: alguns intervalos incluem o extremo inferior e outros não.',
  'O último else cobre o caso fora de intervalo, para valores negativos ou maiores que 100.'
] where id = '00000000-0000-0000-0000-000000000012';

update problems set hints = array[
  'Comece testando o caso mais específico primeiro: x igual a zero e y igual a zero.',
  'Depois teste os eixos (x igual a zero, ou y igual a zero) antes dos quadrantes.',
  'Os quadrantes dependem do sinal de x e y combinados — positivo ou negativo em cada um.'
] where id = '00000000-0000-0000-0000-000000000013';

update problems set hints = array[
  'Primeiro descubra qual dos dois valores lidos é o menor e qual é o maior.',
  'Percorra com um for do menor mais um até o maior menos um (estritamente entre eles).',
  'Some ao total apenas quando o número for ímpar (resto da divisão por 2 diferente de zero).'
] where id = '00000000-0000-0000-0000-000000000014';

update problems set hints = array[
  'Use switch(opcao) com um case para cada valor de 1 a 4.',
  'Não esqueça o break em cada case, senão o código cai para o próximo (fall-through).',
  'O default cobre qualquer valor fora de 1 a 4, imprimindo a mensagem de opção inválida.'
] where id = '00000000-0000-0000-0000-000000000015';

update problems set hints = array[
  'Leia número, horas e valor-hora em variáveis separadas.',
  'O salário é horas multiplicado pelo valor-hora.',
  'Imprima NUMBER e SALARY em linhas separadas, com 2 casas decimais no salário.'
] where id = '00000000-0000-0000-0000-000000000016';

update problems set hints = array[
  'Use a fórmula dada: maiorAB = (a + b + abs(a - b)) / 2, com abs de cstdlib ou cmath.',
  'Aplique a mesma fórmula duas vezes: primeiro entre dois valores, depois entre o resultado e o terceiro.',
  'Imprima o valor encontrado seguido do texto eh o maior, separado por espaço.'
] where id = '00000000-0000-0000-0000-000000000017';

update problems set hints = array[
  'Trabalhar direto com valores decimais pode dar erro de arredondamento — considere converter o valor para centavos (inteiro) logo no início.',
  'Para cada nota ou moeda, da maior para a menor, calcule quantas cabem no valor restante com divisão inteira e o resto com %.',
  'Siga a ordem exata do enunciado: notas de 100 a 2, depois moedas de 1 a 0.01.'
] where id = '00000000-0000-0000-0000-000000000018';

update problems set hints = array[
  'anos é dias dividido por 365 (divisão inteira); o resto vira dias para calcular meses.',
  'Vá calculando e descontando: primeiro os anos, depois os meses a partir do resto, depois os dias do resto final.',
  'As três linhas de saída seguem o mesmo padrão: valor seguido de ano(s), mes(es) ou dia(s).'
] where id = '00000000-0000-0000-0000-000000000019';

update problems set hints = array[
  'distancia é tempo multiplicado pela velocidade.',
  'litros é distancia dividida por 12.0 — use 12.0 (double) para não truncar a divisão.',
  'Imprima só o número final, com 3 casas decimais.'
] where id = '00000000-0000-0000-0000-00000000001a';

update problems set hints = array[
  'Leia os 10 nomes em um vetor de strings, guardando todos.',
  'Os índices pedidos são o 3º, 7º e 9º nome — lembre que em um vetor 0-indexado isso é nomes[2], nomes[6] e nomes[8].',
  'Imprima cada um em sua própria linha, na ordem: 3º, depois 7º, depois 9º.'
] where id = '00000000-0000-0000-0000-00000000001b';

update problems set hints = array[
  'As quatro linhas usam manipuladores diferentes: setw(10) para largura fixa, right ou left para alinhamento, setfill com internal para zeros à esquerda.',
  'Lembre de resetar o preenchimento para espaço antes da última linha, senão ela também vem com zeros.',
  'internal combinado com setfill de zero mantém o sinal de negativos antes dos zeros.'
] where id = '00000000-0000-0000-0000-00000000001c';

update problems set hints = array[
  'Leia os três caracteres em variáveis char separadas.',
  'As três linhas são rotações da ordem original: ABC, depois BCA, depois CAB.',
  'É só reorganizar a ordem de impressão das mesmas três variáveis em cada linha.'
] where id = '00000000-0000-0000-0000-00000000001d';

update problems set hints = array[
  'O CPF vem como uma única string com pontos e traço — leia com cin.',
  'As posições dos números são fixas: os 3 primeiros caracteres, depois as posições 4 a 6, depois 8 a 10, depois os 2 últimos.',
  'Use substr(posicao, tamanho) para extrair cada grupo sem os pontos e o traço.'
] where id = '00000000-0000-0000-0000-00000000001e';

update problems set hints = array[
  'Leia cada linha inteira com getline, não com cin >>, que pararia na vírgula.',
  'Use find para achar a posição da vírgula na linha.',
  'substr do início até a posição dá a parte antes; substr a partir da posição seguinte dá a parte depois, incluindo o espaço se houver. Repita em um loop até acabar a entrada.'
] where id = '00000000-0000-0000-0000-00000000001f';

update problems set hints = array[
  'Da nota de maior valor para a menor, calcule quantas cabem no valor restante com divisão inteira.',
  'Depois de usar uma nota, atualize o valor restante com o resto da divisão e passe para a próxima nota.',
  'Imprima o valor original primeiro, depois uma linha por nota, mesmo quando a quantidade for zero.'
] where id = '00000000-0000-0000-0000-000000000020';

update problems set hints = array[
  'Leia dois inteiros com cin.',
  'some é a soma dos dois valores.',
  'Imprima X igual ao valor, sem casas decimais, seguindo exatamente o formato do enunciado.'
] where id = '00000000-0000-0000-0000-000000000021';

update problems set hints = array[
  'Os dois valores vêm em linhas separadas — cin lida com isso naturalmente.',
  'SOMA é a soma dos dois valores lidos.',
  'Cuidado com o formato exato do texto: espaços ao redor do sinal de igual.'
] where id = '00000000-0000-0000-0000-000000000022';

update problems set hints = array[
  'PROD é o produto dos dois valores lidos.',
  'Funciona igual com números negativos — não precisa tratar sinal separadamente.',
  'Siga o formato exato do enunciado na hora de imprimir.'
] where id = '00000000-0000-0000-0000-000000000023';

update problems set hints = array[
  'Aplique a fórmula exatamente como está no enunciado, usando os pesos 3.5 e 7.5.',
  'Use double para as notas e pesos, senão a divisão trunca.',
  'setprecision(5) com fixed dá as 5 casas decimais pedidas.'
] where id = '00000000-0000-0000-0000-000000000024';

update problems set hints = array[
  'Média ponderada é a soma de cada nota multiplicada pelo seu peso (2, 3 e 5), dividida pelo total de pesos (10).',
  'Use double nas variáveis para não truncar a divisão.',
  '1 casa decimal na saída.'
] where id = '00000000-0000-0000-0000-000000000025';

update problems set hints = array[
  'Calcule os dois produtos primeiro: A vezes B, e C vezes D.',
  'DIFERENCA é o primeiro produto menos o segundo.'
] where id = '00000000-0000-0000-0000-000000000026';

update problems set hints = array[
  'Primeiro ordene A, B e C em ordem decrescente (com if/else trocando os valores, ou colocando-os num vetor e usando sort).',
  'Teste se o triângulo é impossível primeiro (A maior ou igual à soma de B e C) — se cair nesse caso, pare por aí.',
  'Depois teste o tipo pelos ângulos (A ao quadrado versus B ao quadrado mais C ao quadrado) e, separadamente, se os lados são iguais — as duas mensagens podem sair juntas.'
] where id = '00000000-0000-0000-0000-000000000027';

update problems set hints = array[
  'Enquanto N não for positivo, leia um novo N dentro de um loop while.',
  'A soma pode ser calculada com a fórmula da progressão aritmética, ou com um for de i=0 até N-1 somando A+i.',
  'Cuidado: só N é relido quando inválido — A não muda durante essa releitura.'
] where id = '00000000-0000-0000-0000-000000000028';

update problems set hints = array[
  'Descubra primeiro qual dos dois valores lidos é o menor e qual é o maior.',
  'Percorra estritamente entre eles, sem incluir X nem Y, somando os ímpares.',
  'É o mesmo padrão do problema Soma de Ímpares no Intervalo.'
] where id = '00000000-0000-0000-0000-000000000029';

update problems set hints = array[
  'Leia as alturas dos canos em um vetor.',
  'Percorra o vetor comparando cada altura com a anterior — a diferença absoluta não pode passar da altura do pulo.',
  'No primeiro par que ultrapassar o limite, já dá para concluir GAME OVER e parar de checar os demais.'
] where id = '00000000-0000-0000-0000-00000000002a';

update problems set hints = array[
  'A primeira média usa pesos 2, 3, 4 e 1, dividida pelo total de pesos (10).',
  'Depois de calcular a média, use if/else if para decidir entre aprovado, reprovado ou exame, seguindo os limites do enunciado.',
  'Só no caso de exame: leia a nota extra, recalcule a média final como a média mais o exame dividido por 2, e decida aprovado ou reprovado de novo.'
] where id = '00000000-0000-0000-0000-00000000002b';

update problems set hints = array[
  'Calcule o delta (b ao quadrado menos 4 vezes a vezes c) antes de tudo.',
  'Se a for zero ou delta for negativo, é impossível calcular — teste isso antes de calcular as raízes.',
  'R1 e R2 usam sqrt(delta) somado e subtraído de -b, dividido por 2a.'
] where id = '00000000-0000-0000-0000-00000000002c';

update problems set hints = array[
  'Teste a origem primeiro (x igual a zero e y igual a zero).',
  'Depois teste os eixos isoladamente (x igual a zero, ou y igual a zero, mas não os dois).',
  'Por fim, use o sinal de x e y combinados para decidir entre os quatro quadrantes.'
] where id = '00000000-0000-0000-0000-00000000002d';

update problems set hints = array[
  'cout tem um manipulador pronto para isso: cout com hex antes do valor.',
  'Use uppercase junto com hex para sair com letras maiúsculas.',
  'Não precisa implementar a conversão na mão — os manipuladores do iostream já fazem isso.'
] where id = '00000000-0000-0000-0000-00000000002e';
