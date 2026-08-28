# Melhorias estéticas — Página de Problemas do Dojo

## Visão geral

A estrutura atual está funcional, mas visualmente a página parece mais uma **tela de sistema interno** do que uma plataforma moderna de estudos/programação.

O principal problema não é falta de elementos. O que mais precisa evoluir é:

- hierarquia visual;
- espaçamento;
- contraste;
- agrupamento;
- tipografia;
- apresentação dos problemas;
- percepção de progresso.

A ideia é transformar a tela de uma simples “lista de exercícios” em uma **experiência de aprendizagem mais moderna, clara e atraente**.

---

## 1. Dar mais destaque ao cabeçalho

Hoje o título **“Problemas do Dojo”** fica muito perdido no topo.

### Sugestão

Usar:

> **Problemas do Dojo**  
> Pratique programação, resolva desafios e acompanhe seu progresso.

Ao lado ou abaixo, mostrar um resumo:

`6 problemas` · `0 resolvidos` · `3 fáceis` · `2 médios` · `1 difícil`

### Melhoria adicional

Em vez de deixar essas informações apenas como pequenas pills, transformar os números principais em **cards compactos de resumo**.

Exemplo:

```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│      6       │ │      0       │ │     50%      │
│  problemas   │ │  resolvidos  │ │    progresso │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## 2. Transformar os filtros em uma seção mais elegante

Atualmente existem três linhas independentes:

- Nível
- Tema
- Status

Elas ocupam bastante espaço e passam uma sensação de formulário antigo.

### Sugestão

Usar um único bloco de filtros contendo:

```text
┌──────────────────────────────────────────────────────────────┐
│ 🔎  Buscar por título...                                     │
│                                                              │
│ Nível   [Todos] [Fácil] [Médio] [Difícil]                   │
│                                                              │
│ Tema    [Todos] [Loops] [POO] [Recursão] [Strings] [Vetores]│
│                                                              │
│ Status  [Todos] [Pendentes] [Resolvidos]    Limpar filtros   │
└──────────────────────────────────────────────────────────────┘
```

### Benefícios

- reduz a sensação de várias barras separadas;
- melhora a organização;
- cria um bloco visual único;
- facilita a leitura dos filtros;
- deixa a interface mais moderna.

---

## 3. Fazer a lista de problemas parecer uma coleção de desafios

Esse é provavelmente o ponto de maior impacto visual.

Hoje cada problema aparece praticamente como uma linha horizontal:

```text
01 ○ Filtragem de Vetores com Loops                 Médio >
```

Isso transmite pouca informação visual e aproveita pouco o espaço disponível.

### Sugestão

Transformar cada problema em um **card**.

Exemplo:

```text
┌─────────────────────────────────────────────────────────────┐
│ 01   Filtragem de Vetores com Loops                  Médio  │
│      Filtre valores de um vetor utilizando loops            │
│                                                              │
│      [Loops] [POO]                     ○ Não resolvido     → │
└─────────────────────────────────────────────────────────────┘
```

Cada card pode conter:

- número do problema;
- título;
- descrição curta;
- tags;
- dificuldade;
- status;
- seta de navegação.

Isso faz a plataforma parecer muito mais próxima de um produto educacional moderno.

---

## 4. Usar mais espaço vertical

Atualmente os elementos estão muito comprimidos na parte superior da página e sobra um grande espaço vazio abaixo.

Isso cria uma sensação de interface inacabada.

### Sugestão de espaçamentos

- Entre grandes seções: **24–32 px**
- Entre elementos relacionados: **12–16 px**
- Padding interno dos cards: **16–24 px**
- Cards com altura maior para facilitar leitura e interação.

A lista deve aproveitar melhor a área vertical disponível.

---

## 5. Reduzir a quantidade de bordas

Hoje há muitas linhas horizontais:

- abaixo do título;
- abaixo da busca;
- abaixo dos filtros;
- entre linhas de filtros;
- bordas dos cards.

Isso deixa a interface pesada.

### Sugestão

Substituir parte das bordas por:

- espaçamento;
- diferença de tonalidade;
- superfícies com backgrounds diferentes;
- divisórias muito sutis somente quando necessário.

### Regra visual

**Menos linhas = aparência mais premium.**

---

## 6. Melhorar a hierarquia tipográfica

Atualmente muitos elementos possuem peso e destaque semelhantes.

A interface precisa deixar claro o que é mais importante.

### Sugestão de tamanhos

**Título da página**

- 24–28 px
- semibold

**Título do problema**

- 15–16 px
- semibold

**Descrição**

- 13–14 px
- regular

**Tags**

- aproximadamente 12 px

**Informações secundárias**

- 11–12 px

### Hierarquia de cores

- Branco ou quase branco → informação principal
- Cinza claro → informação secundária
- Cinza mais escuro → metadados

Evitar deixar tudo com o mesmo nível de contraste.

---

## 7. Tornar a dificuldade mais visual

Hoje “Fácil”, “Médio” e “Difícil” são apenas pequenas etiquetas.

A dificuldade deve ser reconhecida rapidamente.

### Sugestão

Usar indicador visual + texto:

- 🟢 Fácil
- 🟡 Médio
- 🔴 Difícil

Ou usar um pequeno ponto colorido acompanhado do texto, mantendo boa acessibilidade.

### Objetivo

Permitir que o usuário identifique a dificuldade em menos de 1 segundo.

---

## 8. Melhorar o estado de resolução

O pequeno círculo ao lado do número praticamente não comunica o estado do exercício.

### Sugestão

Usar:

- `✓ Resolvido`
- `○ Pendente`

Exemplo:

```text
✓ Contando Vogais
  Strings · Loops
  Resolvido
```

Quando resolvido, o card também pode mudar sutilmente para reforçar visualmente o progresso.

Isso permite ao usuário “varrer” a lista e perceber rapidamente o que já concluiu.

---

## 9. Adicionar uma área de progresso

A página ganharia bastante personalidade com um pequeno resumo do progresso.

### Exemplo

```text
Seu progresso

┌────────────┐ ┌────────────┐ ┌────────────┐
│     0/6    │ │     0%     │ │  3 fáceis  │
│ concluídos │ │ progresso  │ │ disponíveis│
└────────────┘ └────────────┘ └────────────┘
```

Mesmo sendo simples, isso transforma a página de uma lista de exercícios em um **dashboard de aprendizagem**.

---

## 10. Melhorar o campo de busca

O campo atual:

> Buscar por título...

parece muito próximo de um input HTML padrão.

### Sugestão

```text
┌──────────────────────────────────────────────────────────┐
│ ⌕  Buscar problemas...                         / para buscar │
└──────────────────────────────────────────────────────────┘
```

### Características recomendadas

- altura de aproximadamente **42–46 px**;
- background levemente diferente da página;
- bordas arredondadas;
- ícone de busca;
- estado de foco bem definido;
- feedback visual no hover/focus.

---

## 11. Aumentar os arredondamentos

Os componentes atuais têm uma aparência bastante retangular.

Sugestão:

- Cards: **10–12 px**
- Inputs: **8–10 px**
- Chips/pills: **999 px**
- Botões: **8 px**

Isso ajuda a interface a sair da estética “CRUD” e entrar em uma estética mais moderna.

---

## 12. Criar uma identidade visual mais forte

O azul do logo pode virar a **cor principal de destaque da aplicação**.

### Usos recomendados

- filtro selecionado;
- links;
- barra de progresso;
- foco de inputs;
- botões de ação;
- estados ativos.

Mas sem usar azul em tudo.

### Paleta conceitual

**Base**

- interface escura;
- superfícies em diferentes tons de cinza.

**Acento**

- azul elétrico.

**Estados**

- verde → sucesso/resolvido;
- amarelo → médio/atenção;
- vermelho → difícil/erro.

O objetivo é criar uma linguagem visual consistente.

---

# Reorganização sugerida da página

Uma composição mais moderna poderia ser:

```text
┌─────────────────────────────────────────────────────────────────┐
│ ← Problemas                                                     │
│                                                                 │
│ Problemas do Dojo                         0 / 6 resolvidos       │
│ Pratique programação através de desafios                       │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🔎  Buscar problemas...                                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Filtros                                                         │
│ Nível   [Todos] [Fácil] [Médio] [Difícil]                      │
│ Tema    [Todos] [Loops] [POO] [Recursão] [Strings] [Vetores]   │
│ Status  [Todos] [Pendentes] [Resolvidos]         Limpar filtros│
│                                                                 │
│ 6 desafios                                                      │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 01  Filtragem de Vetores com Loops                    Médio │ │
│ │     Trabalhe com vetores utilizando estruturas de repetição│ │
│ │     [Loops] [POO]                         ○ Pendente      → │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 02  Contando Vogais                                     Fácil│ │
│ │     Conte a quantidade de vogais em uma string              │ │
│ │     [Strings] [Loops]                     ○ Pendente      → │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│                         ...                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

# Prioridade das mudanças

## 1. Cards dos problemas

**Maior impacto visual.**

A lista atual precisa deixar de parecer uma tabela/listagem simples e passar a parecer uma coleção de desafios.

## 2. Espaçamento e hierarquia

Dar mais respiro entre as seções e deixar claro o que é título, descrição, metadado e ação.

## 3. Filtros em um bloco único

Evita a sensação de várias barras independentes.

## 4. Tipografia

Uma boa hierarquia tipográfica melhora muito a percepção de qualidade.

## 5. Indicadores de progresso

Adicionam propósito à página e reforçam a ideia de plataforma de aprendizagem.

## 6. Menos bordas e mais superfícies

Reduz o aspecto pesado da interface.

---

# Diretriz geral de design

A interface **já tem informação suficiente**.

O próximo passo não deveria ser adicionar cada vez mais componentes.

A maior evolução virá de:

> **organizar melhor o que já existe, criar hierarquia, dar espaço para os elementos respirarem e tornar o progresso do aluno visualmente evidente.**

A meta estética deve ser:

**Dark UI + azul como destaque + cards modernos + tipografia limpa + bastante respiro + estados visuais claros.**
