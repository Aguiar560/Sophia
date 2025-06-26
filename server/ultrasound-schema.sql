-- Criar tabela para vídeos de ultrasom
CREATE TABLE IF NOT EXISTS Ultrasound (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);