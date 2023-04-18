CREATE DATABASE PDV ;

CREATE TABLE USUARIOS
(
  id serial primary key,
  nome text,
  email text unique,
  senha text
);

CREATE TABLE CATEGORIAS
(
  id serial primary key,
  descricao text
);


INSERT INTO CATEGORIAS
  (descricao)
values
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games')
