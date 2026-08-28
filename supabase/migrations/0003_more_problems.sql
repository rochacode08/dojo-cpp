-- Mais problemas pra popular a lista/filtro da página inicial.

insert into problems (id, slug, title, description, difficulty, tags, starter_code, time_limit_ms, memory_limit_mb, order_index)
values
(
  '00000000-0000-0000-0000-000000000002',
  'contando-vogais',
  'Contando Vogais',
  E'Leia uma palavra (sem espaços) e conte quantas vogais ela contém (a, e, i, o, u — maiúsculas ou minúsculas).\n\nImprima apenas o total de vogais encontradas.',
  'Fácil',
  array['Strings', 'Loops'],
  E'#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string palavra;\n    cin >> palavra;\n\n    int total = 0;\n    // TODO: percorra "palavra" com um loop e conte quantas vogais existem\n\n    cout << total << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  2
),
(
  '00000000-0000-0000-0000-000000000003',
  'pilha-de-chamados',
  'Pilha de Chamados',
  E'Implemente a classe Pilha, que armazena inteiros em um vector<int> e simula uma pilha (LIFO).\n\nRegras:\n1. O vetor deve ser um atributo privado.\n2. Exponha os métodos empilhar(int) e desempilhar().\n3. desempilhar() remove e devolve o valor do topo. Se a pilha estiver vazia, devolva -1.\n\nO programa lê N operações. Cada uma é "E valor" (empilha) ou "D" (desempilha, imprime o valor removido, ou VAZIA se a pilha estava vazia).',
  'Médio',
  array['POO', 'Vetores'],
  E'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Pilha {\nprivate:\n    vector<int> dados;\n\npublic:\n    void empilhar(int valor) {\n        dados.push_back(valor);\n    }\n\n    int desempilhar() {\n        // TODO: remova e devolva o valor do topo da pilha.\n        // Se a pilha estiver vazia, devolva -1.\n        return -1;\n    }\n};\n\nint main() {\n    int n;\n    cin >> n;\n\n    Pilha pilha;\n    for (int i = 0; i < n; i++) {\n        char op;\n        cin >> op;\n        if (op == \'E\') {\n            int valor;\n            cin >> valor;\n            pilha.empilhar(valor);\n        } else {\n            int removido = pilha.desempilhar();\n            if (removido == -1) cout << "VAZIA" << endl;\n            else cout << removido << endl;\n        }\n    }\n\n    return 0;\n}\n',
  2000,
  256,
  3
),
(
  '00000000-0000-0000-0000-000000000004',
  'maior-e-menor-do-vetor',
  'Maior e Menor do Vetor',
  E'Leia N números inteiros e imprima o maior e o menor valor lido, nessa ordem, separados por um espaço.',
  'Fácil',
  array['Vetores', 'Loops'],
  E'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n\n    int maior = v[0], menor = v[0];\n    // TODO: percorra o vetor e atualize "maior" e "menor"\n\n    cout << maior << " " << menor << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  4
),
(
  '00000000-0000-0000-0000-000000000005',
  'fatorial-recursivo',
  'Fatorial Recursivo',
  E'Implemente a função fatorial(n) de forma recursiva (sem usar loops) e imprima o resultado de fatorial(N).\n\nLembre-se do caso base: fatorial(0) = 1.',
  'Fácil',
  array['Recursão'],
  E'#include <iostream>\n\nusing namespace std;\n\nlong long fatorial(int n) {\n    // TODO: implemente recursivamente.\n    // Caso base: fatorial(0) = 1.\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n\n    cout << fatorial(n) << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  5
),
(
  '00000000-0000-0000-0000-000000000006',
  'validador-de-senha',
  'Validador de Senha',
  E'Implemente a classe Validador com o método validar(string senha), que devolve:\n\n1. "CURTA" se a senha tiver menos de 8 caracteres.\n2. "SEM_NUMERO" se não houver nenhum dígito.\n3. "SEM_MAIUSCULA" se não houver nenhuma letra maiúscula.\n4. "VALIDA" se passar em todas as regras acima (verifique nessa ordem).',
  'Difícil',
  array['Strings', 'POO'],
  E'#include <iostream>\n#include <string>\n\nusing namespace std;\n\nclass Validador {\npublic:\n    string validar(string senha) {\n        // TODO:\n        // 1. Se senha.size() < 8, devolva "CURTA"\n        // 2. Se não tiver nenhum dígito, devolva "SEM_NUMERO"\n        // 3. Se não tiver nenhuma letra maiúscula, devolva "SEM_MAIUSCULA"\n        // 4. Caso contrário, devolva "VALIDA"\n        return "";\n    }\n};\n\nint main() {\n    string senha;\n    cin >> senha;\n\n    Validador v;\n    cout << v.validar(senha) << endl;\n\n    return 0;\n}\n',
  2000,
  256,
  6
);

insert into test_cases (problem_id, input, expected_output, is_sample, order_index) values
  ('00000000-0000-0000-0000-000000000002', 'Programacao', '5', true, 1),
  ('00000000-0000-0000-0000-000000000002', 'xyz', '0', false, 2),
  ('00000000-0000-0000-0000-000000000002', 'AEIOUaeiou', '10', false, 3),

  ('00000000-0000-0000-0000-000000000003', E'5\nE 1\nE 2\nD\nE 3\nD', E'2\n3', true, 1),
  ('00000000-0000-0000-0000-000000000003', E'2\nD\nE 5', 'VAZIA', false, 2),
  ('00000000-0000-0000-0000-000000000003', E'3\nE 10\nD\nD', E'10\nVAZIA', false, 3),

  ('00000000-0000-0000-0000-000000000004', E'5\n3 7 1 9 4', '9 1', true, 1),
  ('00000000-0000-0000-0000-000000000004', E'1\n42', '42 42', false, 2),
  ('00000000-0000-0000-0000-000000000004', E'4\n-3 -7 -1 -9', '-1 -9', false, 3),

  ('00000000-0000-0000-0000-000000000005', '5', '120', true, 1),
  ('00000000-0000-0000-0000-000000000005', '0', '1', false, 2),
  ('00000000-0000-0000-0000-000000000005', '10', '3628800', false, 3),

  ('00000000-0000-0000-0000-000000000006', 'Senha123', 'VALIDA', true, 1),
  ('00000000-0000-0000-0000-000000000006', 'abc123', 'CURTA', false, 2),
  ('00000000-0000-0000-0000-000000000006', 'abcdefgh', 'SEM_NUMERO', false, 3),
  ('00000000-0000-0000-0000-000000000006', 'abcdefg1', 'SEM_MAIUSCULA', false, 4);
