-- Dicas progressivas por problema: um array de textos, do mais vago pro mais
-- específico. Ficam escondidas no front-end até o usuário clicar pra revelar,
-- uma de cada vez.

alter table problems add column hints text[] not null default '{}';
