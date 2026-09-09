# Aula 02 — A base da linguagem

Unidade 1. Estrutura de um programa, tipos, operadores, entrada/saída e seleção.

## Estrutura de um programa em C++

- bibliotecas
- namespaces
- constantes
- tipos
- sub-rotinas
- programa principal

```cpp
#include <iostream>
#include <iomanip>
#include <string>

using namespace std;

const double PI = 3.14159;

// tipos
// sub-rotinas

int main(void)
{
   ... código ...
   return 0;
}
```

### Assinaturas da main

| assinatura | significado |
| --- | --- |
| `int main()` | retorna um inteiro, não tem parâmetros |
| `main()` | idem — sem o `int` na frente, o padrão já é `int` |
| `int main(void)` | idem — `void` nos parênteses ou nada dá na mesma |
| `int main(int argc, char **args)` | usada quando precisamos pegar os parâmetros passados na linha de comando |

```cpp
#include <iostream>
using namespace std;

int main(int argc, char **args)
{
    cout << "Hello, World!" << endl;
    cout << argc << endl;
    for (int i = 0; i < argc; i++)
       cout << args[i] << endl;
    return 0;
}
```

Para compilar: `gcc main.cpp -lstdc++ -o main.exe`
Para executar: `main teste 123`

## Tipos de dados

| categoria | tipos |
| --- | --- |
| inteiros | `int`, `short int`, `long int`, `long long int`, e as versões `unsigned` de cada um |
| reais | `double`, `float`, `long double` |
| lógicos | `bool` (`true`, `false`) |
| texto | `string` |
| caractere | `char` — usa aspas simples: `'A'`, `'a'`, `' '` |

## Operadores aritméticos

| operador | descrição | exemplo |
| --- | --- | --- |
| `+` | soma | `a+b` |
| `-` | subtração | `a-b` |
| `*` | multiplicação | `a*b` |
| `/` | divisão | `a/b` |
| `%` | resto | `a%b` |
| `pow` | potência | `pow(a,2)` |
| `sqrt` | raiz quadrada | `sqrt(x)` |

`pow` e `sqrt`, como `sin`, `cos`, `acos`, `asin`, `atan`, `atan2`, `exp`, `log`,
`ln`, estão na `cmath` (`#include <cmath>`).

## Operadores relacionais

| operador | descrição | exemplo |
| --- | --- | --- |
| `>` | maior | `a>b` |
| `>=` | maior ou igual | `a>=b` |
| `<` | menor | `a<b` |
| `<=` | menor ou igual | `a<=b` |
| `==` | igual | `a==b` |
| `!=` | diferente | `a!=b` |

Em C++ podemos comparar strings diretamente: `if (nome == "joao")`.

## Operadores lógicos

| operador | descrição | exemplo |
| --- | --- | --- |
| `&&` | e lógico | `a>b && a%2==0` |
| `\|\|` | ou lógico | `a>b \|\| a>10` |
| `!` | negação | `!(a<b)` |

## Entrada

Na leitura de valores do teclado usamos `cin`, fazendo o desvio `>>` para a
variável.

```cpp
int a;
cin >> a;
```

```cpp
double x, y;
cin >> x >> y;
```

```cpp
string nome;
cin >> nome;
```

Ler nome é simples... **só que não**, porque o nome tem espaços. O `cin >>` para no
primeiro espaço:

```cpp
string nome;
getline(cin, nome);
```

Exemplo completão:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main(int argc, char **args)
{
    string nome;
    int a;

    cin >> a >> ws;

    getline(cin, nome);
    cout << "oi, " << nome << endl;
    if (nome == "Manuel")
      cout << "Voce eh portugues?" << endl;
    return 0;
}
```

> **O `ws` é o pulo do gato.** Depois de um `cin >> a`, a quebra de linha que você
> apertou continua no buffer, e o `getline` seguinte leria uma string vazia. O
> `>> ws` come esses espaços em branco pendentes.

## Saída

Usamos o `cout` (console output) e o operador de desvio `<<` para mandar dados
para a tela.

```cpp
double x;
string nome;
int idade;

cout << "nome:" << nome << endl;
cout << "idade:" << idade << endl;
cout << "altura: " << x << endl;
```

Normalmente precisamos formatar a saída, e aí entra a `iomanip`
(`#include <iomanip>`):

| operador | descrição | exemplo |
| --- | --- | --- |
| `fixed` | números reais em notação fixa | `cout << fixed << 1.2345323 << endl` |
| `setprecision` | define as casas decimais | `cout << fixed << setprecision(2) << 1.23452 << endl` |
| `setw` | define a largura do próximo campo | `cout << left << setw(10) << "oi" << "." << endl` |
| `left` | alinhamento à esquerda | `cout << left << setw(10) << "oi" << "." << endl` |
| `right` | alinhamento à direita | `cout << right << setw(10) << "oi" << "." << endl` |
| `setfill` | define o caractere de preenchimento | `cout << setw(10) << setfill('0') << -123.456 << endl` |
| `internal` | alinha à direita, mas o `-` fica à esquerda | `cout << setw(10) << internal << setfill('0') << -123.456 << endl` |

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main(int argc, char **args)
{
    cout << left << setw(10) << "oi" << "." << endl;
    cout << right << setw(10) << "oi" << "." << endl;
    cout << left << setfill('.') << setw(10) << "oi" << "." << endl;
    cout << right << setw(10) << "oi" << "." << endl;
    cout << "1234567890" << endl;

    cout << setprecision(2) << fixed << right;

    cout << "valor: R$ " << setw(10) << setfill(' ') << 123.456 << endl;
    cout << "valor: R$ " << setw(10) << setfill('0') << 123.456 << endl;

    cout << "valor: R$ " << setw(10) << setfill(' ') << -123.456 << endl;
    cout << "valor: R$ " << setw(10) << setfill('0') << -123.456 << endl;

    cout << "valor: R$ " << setw(10) << internal << setfill(' ') << -123.456 << endl;
    cout << "valor: R$ " << setw(10) << internal << setfill('0') << -123.456 << endl;
    return 0;
}
```

Saída:

```
oi        .
        oi.
oi.........
........oi.
1234567890
valor: R$     123.46
valor: R$ 0000123.46
valor: R$    -123.46
valor: R$ 000-123.46
valor: R$ -   123.46
valor: R$ -000123.46
```

> **Detalhe importante:** o `setw` vale só para o **próximo** campo impresso. Já o
> `fixed`, `setprecision`, `left`/`right` e `setfill` ficam ligados até serem
> trocados.

## Estruturas de seleção

### if / else

```cpp
if (condição)
  comando_condicao_verdadeira;
```

```cpp
if (condição)
  comando_condicao_verdadeira;
else
  comando_condicao_falsa;
```

```cpp
if (condição)
  comando_condicao_verdadeira;
else if (condição)
  comando_condicao_verdadeira;
else if (condição)
  comando_condicao_verdadeira;
else
  comando_condicao_falsa;
```

Exemplo em C++:

```cpp
if (a > b)
  c = a;
else
  c = b;
```

Exemplo em C, com bloco de comandos:

```c
if (a > b)
{
   c = a;
   printf("a eh maior\n");
}
else
{
   c = b;
   printf("a nao eh maior\n");
}
```

### switch / case

Quando temos valores "enumeráveis", podemos usar um `switch case` no lugar de
vários `if` alinhados.

```cpp
switch (expressão)  // precisa retornar valores de domínio contável (int e char)
{
  case valor1:
       comandos;
       break;
  case valor2:
       comandos;
       break;
  case valor3:
       comandos;
       break;
  default:  // opcional
       comandos;
       break;
}
```

### Operador ternário `?:`

Sintaxe: `condição ? valor_v : valor_f`

```cpp
c = a > b ? a : b;
```

```cpp
#include <iostream>

using namespace std;

int main()
{
    int n;

    cin >> n;

    cout << "o numero " << n << " eh " << (n % 2 == 0 ? "" : "im") << "par" << endl;

    return 0;
}
```

### Bloco de comando

Usado para colocarmos vários comandos onde só caberia um. Ou seja: faz com que
vários comandos sejam interpretados como um comando só.

```cpp
{  // abre o bloco de comando
   comandos
}  // fecha o bloco de comando
```
