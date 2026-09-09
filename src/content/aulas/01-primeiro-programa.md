# Aula 01 — Do enunciado ao código

O caminho que a gente vai repetir o semestre inteiro: ler o enunciado, escrever o
algoritmo em português, traduzir pra linguagem.

## Problema 1 — Soma de dois números

Leia 2 valores inteiros e armazene-os nas variáveis A e B. Efetue a soma de A e B
atribuindo o seu resultado na variável X. Imprima X conforme o exemplo apresentado
abaixo.

Não apresente mensagem alguma além daquilo que está sendo especificado e **não
esqueça de imprimir o fim de linha após o resultado**, caso contrário você
receberá "Presentation Error".

**Saída esperada:**

```
X = 10
```

### Algoritmo

```
ler a variavel inteira A
ler a variavel inteira B
somar a variavel A com a variavel B e colocar o resultado em X
imprimir o valor de X no formato "X = <valor>"
```

### Em "mozarnhol" (pseudocódigo da disciplina)

```
a <- lerInt()
b <- lerInt()
x = a + b
escrever("X = {x}")
```

### Em C

```c
#include <stdio.h>

int main()
{
    int a, b, x;

    scanf("%d%d", &a, &b);

    x = a + b;

    printf("X = %d\n", x);

    return 0;
}
```

### Em C++

```cpp
#include <iostream>

using namespace std;

int main() {
    int a, b, x;

    cin >> a >> b;

    x = a + b;

    cout << "X = " << x << endl;

    return 0;
}
```

## Problema 2 — Área do círculo

### Algoritmo

```
ler o raio, valor real (dupla precisao)
calcular a area do circulo: a = raio * raio * pi   (pi = 3.14159)
escrever a area no formato "A=<valor>", com 4 casas decimais
e nao esquecer de pular linha
```

### Em C++

```cpp
#include <iostream>  // stream de entrada e saída (cin e cout)
#include <iomanip>   // manipulação de entrada e saída (fixed, setprecision)

using namespace std;

const double PI = 3.14159;

int main() {
    double a, raio;

    cout << fixed << setprecision(4);

    cin >> raio;

    a = raio * raio * PI;

    cout << "A=" << a << endl;

    return 0;
}
```

> **Repare:** o `fixed << setprecision(4)` vem **antes** da leitura, mas só afeta a
> saída. Ele fica "ligado" no `cout` até alguém mudar — não precisa repetir a cada
> impressão.
