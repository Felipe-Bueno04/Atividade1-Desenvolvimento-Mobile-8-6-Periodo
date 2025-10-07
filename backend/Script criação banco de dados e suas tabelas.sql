CREATE DATABASE IF NOT EXISTS produtos_db;
USE produtos_db;

CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL CHECK (preco > 0),
    categoria ENUM('HARDWARE', 'SOFTWARE', 'ACESSORIOS', 'SERVICOS', 'OUTROS') NOT NULL,
    estoque INT DEFAULT 0 CHECK (estoque >= 0),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, descricao, preco, categoria, estoque, ativo) VALUES
('Mouse Gamer', 'Mouse RGB, 7200 DPI', 129.90, 'ACESSORIOS', 25, TRUE),
('Teclado Mecânico', 'Teclado mecânico switches blue', 299.90, 'HARDWARE', 15, TRUE),
('Windows 11', 'Sistema operacional Microsoft', 399.90, 'SOFTWARE', 50, TRUE),
('Manutenção Notebook', 'Serviço de limpeza e otimização', 120.00, 'SERVICOS', 0, TRUE),
('Cabo HDMI', 'Cabo HDMI 2.0 1.8m', 35.50, 'OUTROS', 100, TRUE);