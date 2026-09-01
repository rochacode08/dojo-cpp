-- O Gabriel nunca resolveu "Fibonacci em Vetor" de verdade, mas ficou marcado
-- como resolvido (provavelmente alguém rodou os testes enquanto ele era o
-- piloto da sala, e a submissão ficou registrada com o user_id dele).
-- Remove essa submissão pra tirar o problema da lista de "resolvidos" dele.

delete from submissions
where user_id = '9cc1f3ac-352d-4c27-9a14-693b3a11ecbb'
  and problem_id = '00000000-0000-0000-0000-000000000008';
