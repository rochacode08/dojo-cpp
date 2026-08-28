-- Corrige o caso de teste #2 de "Fibonacci em Vetor": a entrada foi gravada
-- como '1\n30' (string comum) em vez de E'1\n30' (string com escape), então o
-- Postgres guardou os caracteres literais "1\n30" em vez de uma quebra de
-- linha real — fazendo qualquer solução correta falhar nesse caso.

update test_cases
set input = E'1\n30'
where problem_id = '00000000-0000-0000-0000-000000000008'
  and input = '1\n30';
