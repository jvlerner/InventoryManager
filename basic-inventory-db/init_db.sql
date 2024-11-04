-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS basic_inventory;
-- Seleciona o banco de dados
USE basic_inventory;
-- Criação da tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100)
);
-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE
    SET NULL
);
-- Criação da tabela de entradas de produtos
CREATE TABLE IF NOT EXISTS product_in (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    entry_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
-- Criação da tabela de saídas de produtos
CREATE TABLE IF NOT EXISTS product_out (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    exit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);