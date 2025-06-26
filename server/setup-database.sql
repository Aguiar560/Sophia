-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS sophia_db;
USE sophia_db;

-- Criar tabela de tipos
CREATE TABLE IF NOT EXISTS Tipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Criar tabela de cores
CREATE TABLE IF NOT EXISTS Cores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Criar tabela de tamanhos
CREATE TABLE IF NOT EXISTS Tamanhos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(20) NOT NULL
);

-- Criar tabela de roupas
CREATE TABLE IF NOT EXISTS Roupas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_id INT NOT NULL,
  cor_id INT NOT NULL,
  tamanho_id INT NOT NULL,
  FOREIGN KEY (tipo_id) REFERENCES Tipos(id),
  FOREIGN KEY (cor_id) REFERENCES Cores(id),
  FOREIGN KEY (tamanho_id) REFERENCES Tamanhos(id)
);

-- Inserir tipos padrão
INSERT INTO Tipos (nome) VALUES 
('Vestido'),
('Camiseta'),
('Calça'),
('Shorts'),
('Saia'),
('Pijama'),
('Casaco'),
('Macacão'),
('Body'),
('Meia');

-- Inserir cores padrão
INSERT INTO Cores (nome) VALUES 
('Branco'),
('Preto'),
('Vermelho'),
('Azul'),
('Rosa'),
('Verde'),
('Amarelo'),
('Roxo'),
('Laranja'),
('Cinza');

-- Inserir tamanhos padrão
INSERT INTO Tamanhos (nome) VALUES 
('RN'),
('P'),
('M'),
('G'),
('1'),
('2'),
('3'),
('4'),
('5'),
('6');