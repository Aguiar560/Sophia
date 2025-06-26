-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS sophia_db;
USE sophia_db;

-- Tabela de Tipos
CREATE TABLE IF NOT EXISTS Tipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de Cores
CREATE TABLE IF NOT EXISTS Cores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de Tamanhos
CREATE TABLE IF NOT EXISTS Tamanhos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(20) NOT NULL UNIQUE
);

-- Tabela de Roupas
CREATE TABLE IF NOT EXISTS Roupas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_id INT NOT NULL,
  cor_id INT NOT NULL,
  tamanho_id INT NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tipo_id) REFERENCES Tipos(id),
  FOREIGN KEY (cor_id) REFERENCES Cores(id),
  FOREIGN KEY (tamanho_id) REFERENCES Tamanhos(id)
);

-- Inserir tipos de roupas (apenas alguns para teste)
INSERT IGNORE INTO Tipos (nome) VALUES
('Body Manga Curta'),
('Body Manga Longa'),
('Macacao'),
('Vestido');

-- Inserir cores (apenas algumas para teste)
INSERT IGNORE INTO Cores (nome) VALUES
('Rosa'),
('Azul'),
('Branco'),
('Colorida');

-- Inserir tamanhos (apenas alguns para teste)
INSERT IGNORE INTO Tamanhos (nome) VALUES
('RN'),
('P'),
('M'),
('G');