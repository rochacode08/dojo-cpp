-- Problemas inspirados em clássicos do Beecrowd (1171, 1174, 1176, 1182, 1244),
-- adaptados e reescritos para C++ com foco em vetores, strings, matrizes e POO.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000007',
  'frequencia-de-numeros',
  'Frequência de Números',
  E'Leia N números inteiros, cada um entre 1 e 50.\n\nDepois, para cada valor de 1 a 50 que apareceu pelo menos uma vez na entrada, imprima (em ordem crescente do valor):\n\n<valor> aparece <quantidade> vez(es)\n\nValores que não apareceram não devem ser impressos.',
  'Médio',
  array['Vetores', 'Loops'],
  E'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    vector<int> freq(51, 0);\n    for (int i = 0; i < n; i++) {\n        int valor;\n        cin >> valor;\n        freq[valor]++;\n    }\n\n    // TODO: percorra "freq" de 1 a 50 e, para os valores com frequencia > 0,\n    // imprima "<valor> aparece <frequencia> vez(es)"\n\n    return 0;\n}\n',
  2000,
  256,
  7
),
(
  '00000000-0000-0000-0000-000000000008',
  'fibonacci-em-vetor',
  'Fibonacci em Vetor',
  E'Pré-calcule os 31 primeiros números da sequência de Fibonacci (Fib(0) = 0, Fib(1) = 1) em um vetor.\n\nDepois leia Q consultas. Para cada uma, leia um índice X (0 ≤ X ≤ 30) e imprima:\n\nFib(X) = <valor>',
  'Fácil',
  array['Vetores', 'Recursão'],
  E'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    vector<long long> fib(31);\n    fib[0] = 0;\n    fib[1] = 1;\n    // TODO: preencha fib[2..30] com a sequencia de Fibonacci\n\n    int q;\n    cin >> q;\n    for (int i = 0; i < q; i++) {\n        int x;\n        cin >> x;\n        cout << "Fib(" << x << ") = " << fib[x] << endl;\n    }\n\n    return 0;\n}\n',
  2000,
  256,
  8
),
(
  '00000000-0000-0000-0000-000000000009',
  'selecao-em-vetor',
  'Seleção em Vetor',
  E'Leia N números reais e, em seguida, um valor limite L.\n\nPercorra o vetor na ordem em que os valores foram lidos e, para cada valor menor ou igual a L, imprima o índice (começando em 0) e o valor, no formato:\n\nV[i] = valor (com uma casa decimal)',
  'Fácil',
  array['Vetores', 'Loops'],
  E'#include <iostream>\n#include <vector>\n#include <iomanip>\n\nusing namespace std;\n\nint main() {\n    int n;\n    double limite;\n    cin >> n >> limite;\n\n    vector<double> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n\n    cout << fixed << setprecision(1);\n    // TODO: percorra "v" e, para os valores <= limite, imprima "V[i] = valor"\n\n    return 0;\n}\n',
  2000,
  256,
  9
),
(
  '00000000-0000-0000-0000-00000000000a',
  'ordenacao-por-tamanho',
  'Ordenação por Tamanho',
  E'Leia N palavras (sem espaços).\n\nReordene-as da mais longa para a mais curta. Palavras de mesmo tamanho devem manter a ordem original em que foram lidas (ordenação estável).\n\nImprima todas as palavras reordenadas em uma única linha, separadas por um espaço.',
  'Médio',
  array['Strings', 'Vetores'],
  E'#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    vector<string> palavras(n);\n    for (int i = 0; i < n; i++) cin >> palavras[i];\n\n    // TODO: reordene "palavras" em ordem decrescente de tamanho,\n    // mantendo a ordem original entre palavras do mesmo tamanho (dica: stable_sort)\n\n    for (int i = 0; i < n; i++) {\n        cout << palavras[i];\n        if (i < n - 1) cout << " ";\n    }\n    cout << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  10
),
(
  '00000000-0000-0000-0000-00000000000b',
  'coluna-na-matriz',
  'Coluna na Matriz',
  E'Implemente a classe Matriz, que armazena uma matriz de N linhas por M colunas de inteiros.\n\nRegras:\n1. Exponha os métodos preencher(linha, coluna, valor), somaColuna(coluna) e mediaColuna(coluna).\n2. O programa lê N, M, os N×M valores da matriz, depois um índice de coluna C (0-indexado) e uma operação: \'S\' para soma ou \'M\' para média.\n3. Imprima a soma como inteiro, ou a média com 2 casas decimais.',
  'Difícil',
  array['Matrizes', 'POO'],
  E'#include <iostream>\n#include <vector>\n#include <iomanip>\n\nusing namespace std;\n\nclass Matriz {\nprivate:\n    vector<vector<int>> dados;\n    int linhas, colunas;\n\npublic:\n    Matriz(int l, int c) : dados(l, vector<int>(c, 0)), linhas(l), colunas(c) {}\n\n    void preencher(int linha, int coluna, int valor) {\n        dados[linha][coluna] = valor;\n    }\n\n    int somaColuna(int coluna) {\n        int soma = 0;\n        // TODO: percorra a coluna "coluna" em todas as linhas e some os valores\n        return soma;\n    }\n\n    double mediaColuna(int coluna) {\n        // TODO: use somaColuna(coluna) dividido pelo numero de linhas\n        return 0.0;\n    }\n};\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n\n    Matriz matriz(n, m);\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) {\n            int valor;\n            cin >> valor;\n            matriz.preencher(i, j, valor);\n        }\n\n    int coluna;\n    char op;\n    cin >> coluna >> op;\n\n    cout << fixed << setprecision(2);\n    if (op == \'S\') cout << matriz.somaColuna(coluna) << endl;\n    else cout << matriz.mediaColuna(coluna) << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  11
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000007', E'5\n3 3 7 3 7', E'3 aparece 3 vez(es)\n7 aparece 2 vez(es)', true, 1),
  ('00000000-0000-0000-0000-000000000007', E'1\n50', '50 aparece 1 vez(es)', false, 2),
  ('00000000-0000-0000-0000-000000000007', E'4\n1 1 1 1', '1 aparece 4 vez(es)', false, 3),

  ('00000000-0000-0000-0000-000000000008', E'3\n0\n1\n10', E'Fib(0) = 0\nFib(1) = 1\nFib(10) = 55', true, 1),
  ('00000000-0000-0000-0000-000000000008', '1\n30', 'Fib(30) = 832040', false, 2),
  ('00000000-0000-0000-0000-000000000008', E'2\n5\n7', E'Fib(5) = 5\nFib(7) = 13', false, 3),

  ('00000000-0000-0000-0000-000000000009', E'5 10.0\n4.5 12.0 9.9 10.0 15.5', E'V[0] = 4.5\nV[2] = 9.9\nV[3] = 10.0', true, 1),
  ('00000000-0000-0000-0000-000000000009', E'3 0.0\n-1.0 0.0 1.0', E'V[0] = -1.0\nV[1] = 0.0', false, 2),
  ('00000000-0000-0000-0000-000000000009', E'2 5.0\n5.0 7.0', 'V[0] = 5.0', false, 3),

  ('00000000-0000-0000-0000-00000000000a', E'4\nsol lua terra marte', 'terra marte sol lua', true, 1),
  ('00000000-0000-0000-0000-00000000000a', E'3\na bb ccc', 'ccc bb a', false, 2),
  ('00000000-0000-0000-0000-00000000000a', E'5\nde de de ab cd', 'de de de ab cd', false, 3),

  ('00000000-0000-0000-0000-00000000000b', E'3 2\n1 2\n3 4\n5 6\n0 S', '9', true, 1),
  ('00000000-0000-0000-0000-00000000000b', E'3 2\n1 2\n3 4\n5 6\n1 M', '4.00', false, 2),
  ('00000000-0000-0000-0000-00000000000b', E'2 3\n1 1 1\n2 2 2\n2 S', '3', false, 3);
