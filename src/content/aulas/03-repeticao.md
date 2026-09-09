# Aula 03 — Estruturas de repetição

Três formas de repetir: `for`, `while` e `do-while`. A escolha depende de você
saber ou não **quantas vezes** vai repetir.

## for — repetição definida

Sabemos quantas vezes vamos repetir.

```cpp
for (inicializacao; condicao; passo)
    comando;
```

```cpp
for (int i = 0; i < 10; i++)
    cout << i << endl;
```

Dá pra ter mais de uma variável e mais de um passo, separados por vírgula:

```cpp
for (int i = 0, j = 10; i < j; i++, j--)
    cout << i << " " << j << endl;
```

O passo pode até conter a impressão, deixando o corpo vazio (`;`):

```cpp
for (int i = 0, j = 10; i < j; i++, j--, cout << i << " " << j << endl)
    ;
```

E o loop infinito:

```cpp
for (;1;)
    cout << "Travou" << endl;
```

> **Nota do dojo:** nas anotações de aula esses dois exemplos aparecem como
> `for(int i=0, int j=10; ...)`. Escrito assim não compila — o `int` vem uma vez
> só, e as demais variáveis vêm depois da vírgula: `for (int i = 0, j = 10; ...)`.
> É o mesmo que acontece ao declarar `int a, b, x;`.

## while — repetição indefinida

Não garante a primeira execução: se a condição já começar falsa, o corpo nunca
roda.

```cpp
while (condicao)
   comando;
```

```cpp
int i = 0;
while (i < 10)
{
   cout << i << endl;
   i++;
}
```

O incremento pode ir junto da impressão, e aí a posição do `++` muda o resultado:

```cpp
int i = 0;
while (i < 10)
   cout << i++ << endl;    // escreve de 0 a 9
```

```cpp
int i = 0;
while (i < 10)
   cout << ++i << endl;    // escreve de 1 a 10
```

> **Por quê:** `i++` (pós-incremento) entrega o valor **antigo** e depois soma;
> `++i` (pré-incremento) soma primeiro e entrega o valor **novo**.

## do-while — repetição indefinida

Garante a primeira execução: o teste acontece só no fim.

```cpp
do
    comando;
while (condicao);
```

```cpp
int i = 0;
do
{
   cout << i << endl;
   i++;
} while (i < 10);
```

```cpp
int i = 0;
do
   cout << i++ << endl;    // escreve de 0 a 9
while (i < 10);
```

```cpp
int i = 0;
do
   cout << ++i << endl;    // escreve de 1 a 10
while (i < 10);
```

> **Nota do dojo:** o `do-while` é o único dos três que leva **ponto e vírgula
> depois do `while`**. Sem ele não compila, e é o esquecimento mais comum.

## Qual usar?

| situação | estrutura |
| --- | --- |
| sei o número de repetições (percorrer um vetor, contar de 1 a N) | `for` |
| repito enquanto algo for verdade, e talvez nem entre no loop | `while` |
| preciso executar pelo menos uma vez (menu, validar entrada) | `do-while` |
