# Aula 04 — Tipos derivados: vetores, matrizes e strings

Quando uma variável por valor não dá mais conta: vetores, matrizes e strings — os tipos que guardam vários dados de uma vez.

## Vetor (array)

- agregado homogêneo
- variáveis indexadas
- um montão de variáveis do mesmo tipo, acessíveis por índice

### Problema 1 — leia 5 valores reais e mostre-os na ordem inversa

```c
#include <stdio.h>

int main()
{
   double a, b, c, d, e;

   scanf("%lf%lf%lf%lf%lf", &a, &b, &c, &d, &e);

   printf("%lf %lf %lf %lf %lf\n", e, d, c, b, a);

   return 0;
}
```

### Problema 2 — agora com 10 valores

```c
#include <stdio.h>

int main()
{
   double n1, n2, n3, n4, n5, n6, n7, n8, n9, n10;

   scanf("%lf%lf%lf%lf%lf%lf%lf%lf%lf%lf",
         &n1, &n2, &n3, &n4, &n5, &n6, &n7, &n8, &n9, &n10);

   printf("%lf %lf %lf %lf %lf %lf %lf %lf %lf %lf\n",
          n10, n9, n8, n7, n6, n5, n4, n3, n2, n1);

   return 0;
}
```

Já dá pra ver aonde isso vai dar. **E se fossem 100 valores?** É exatamente essa
dor que o vetor resolve.

### Problema 3 — 100 valores, com vetor

```c
#include <stdio.h>

#define MAX 100

int main()
{
   double n[MAX];   // n[0] .. n[99]
   int i;

   for (i = 0; i < MAX; i++)
      scanf("%lf", &n[i]);

   for (i = MAX - 1; i >= 0; i--)
      printf("%lf ", n[i]);

   return 0;
}
```

> **Nota do dojo:** nas anotações o `i` do `for` aparece sem declaração — em C
> precisa de `int i;` (ou `for (int i = 0; ...)`). E o `#define MAX` estava em 5000
> com o comentário dizendo `n[0]..n[99]`: aqui deixamos os dois em 100 pra bater
> com o enunciado. O índice de um vetor de tamanho `MAX` vai sempre de `0` a
> `MAX-1`.

## Matriz

- agregado homogêneo
- variáveis indexadas
- variáveis do mesmo tipo acessíveis por **vários índices**, um para cada dimensão

Em C não existe matriz de verdade: o que fazemos é simular matrizes usando vetor
de vetor.

```cpp
tipo nome[qtd_1];
tipo nome[qtd_1][qtd_2];
tipo nome[qtd_1][qtd_2]...[qtd_n];
```

```cpp
char agenda[2030][12][31][24][200];
int  matriz[200][100];

// escrevendo o compromisso de 31/01/2026 às 12:00
printf("%s\n", agenda[2025][0][30][12]);
```

### Problema — soma de duas matrizes

Leia duas matrizes de inteiros e mostre a soma entre elas. Cada matriz pode ter
até 100 linhas e 100 colunas. Para cada matriz, primeiro leia a linha, a coluna e
depois os valores. Cheque se é ou não possível fazer a soma matricial.

```cpp
#include <iostream>
#include <iomanip>

using namespace std;

const int MAX = 100;

int main()
{
    int a[MAX][MAX], b[MAX][MAX], s[MAX][MAX];
    int la, ca, lb, cb, ls, cs, l, c;

    // leia matriz a
    cin >> la >> ca;
    for (l = 0; l < la; l++)
      for (c = 0; c < ca; c++)
        cin >> a[l][c];

    // leia matriz b
    cin >> lb >> cb;
    for (l = 0; l < lb; l++)
      for (c = 0; c < cb; c++)
        cin >> b[l][c];

    if (la != lb || ca != cb)
        cout << "Matrizes incompativeis para a soma" << endl;
    else
    {
       // soma = a + b
       ls = la;
       cs = ca;
       for (l = 0; l < ls; l++)
         for (c = 0; c < cs; c++)
            s[l][c] = a[l][c] + b[l][c];

       // mostrar soma
       for (l = 0; l < ls; l++)
       {
         cout << setw(5) << s[l][0];
         for (c = 1; c < cs; c++)
           cout << " " << setw(5) << s[l][c];
         cout << endl;
       }
    }
    return 0;
}
```

> **Repare no truque da impressão:** a primeira coluna sai fora do laço, e as
> demais saem com um espaço na frente. É assim que se evita o espaço sobrando no
> fim da linha — que em juiz online dá "Presentation Error".

## String

- uma sequência de caracteres
- representa um texto vazio ou com muitos caracteres

Em C++ usamos o tipo `string`, que simula um tipo primitivo de texto. Para as
operações mais complexas precisamos da biblioteca `#include <string>`.

Em C, as strings são **vetores de char terminados em nulo**. Dá pra criar uma
string de C++ a partir de uma string de C: basta atribuir o vetor de caracteres à
`string`.

Nas tabelas abaixo, suponha `string nome = "ABCDEF"`.

### Operadores relacionais

| operador | uso | resposta |
| --- | --- | --- |
| `==` | `nome == "ABCDEF"` | `true` |
| `<` | `nome < "BBC"` | `true` |
| `<=` | `nome <= "ABC"` | `false` |
| `>` | `nome >= "AACDEF"` | `true` |
| `>=` | `nome == "BBC"` | `false` |
| `!=` | `nome == "ABCDEF"` | `false` |

### Comandos úteis

| comando | uso | resposta |
| --- | --- | --- |
| `length` | `nome.length()` | `6` |
| `size` | `nome.size()` | `6` |
| `substr` | `nome.substr(3,2)` | `"EF"` |
| `substr` | `nome.substr(2)` | `"CDEF"` |
| `find` | `nome.find('C')` | `2` |
| `find` | `nome.find("CB")` | `string::npos` |

### Exemplo

```cpp
#include <iostream>
#include <string>
#include <cstring>
#include <cctype>

using namespace std;

int main()
{
    char stringEmC[100] = "texto em c";
    string nome = "texto em C++";
    nome.resize(100);

    cout << stringEmC << endl;
    cout << nome << endl;

    nome = stringEmC;
    nome = nome + "++";

    strcpy(stringEmC, nome.c_str());

    cout << nome << endl;

    if (nome == "texto em c++")
        cout << "string em c++ eh bom pakas! " << nome.length() << endl;

    for (int i = 0; i < nome.length(); i++)
         nome[i] = toupper(nome[i]);

    cout << nome << endl;

    cout << nome.substr(3,2) << endl;

    cout << nome.find("EM") << endl;

    cout << (nome.find("EMFASE") == string::npos ? "NAO ACHOU" : "ACHOU") << endl;

    return 0;
}
```

> **`find` não devolve -1 quando não acha** — devolve `string::npos`, que é um
> número gigante. Por isso a comparação é sempre `== string::npos`, nunca `== -1`.
