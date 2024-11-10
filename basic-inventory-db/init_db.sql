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
-- Inserir 50 categorias
INSERT INTO categories (name, description)
VALUES ('Eletrônicos', 'Produtos eletrônicos diversos'),
    ('Móveis', 'Móveis para casa e escritório'),
    ('Vestuário', 'Roupas para todas as idades'),
    ('Brinquedos', 'Brinquedos infantis'),
    ('Livros', 'Livros de vários gêneros'),
    (
        'Automóveis',
        'Peças e acessórios para automóveis'
    ),
    ('Tecnologia', 'Produtos de tecnologia e gadgets'),
    ('Alimentos', 'Alimentos e bebidas'),
    (
        'Beleza',
        'Produtos de beleza e cuidados pessoais'
    ),
    ('Saúde', 'Produtos de saúde e bem-estar'),
    (
        'Esportes',
        'Equipamentos e acessórios esportivos'
    ),
    (
        'Cama, Mesa e Banho',
        'Produtos para cama, mesa e banho'
    ),
    ('Ferramentas', 'Ferramentas manuais e elétricas'),
    (
        'Instrumentos Musicais',
        'Instrumentos musicais e acessórios'
    ),
    ('Artigos de Decoração', 'Decoração para a casa'),
    (
        'Papéis e Materiais de Escritório',
        'Materiais de escritório diversos'
    ),
    (
        'Eletrodomésticos',
        'Eletrodomésticos de todos os tipos'
    ),
    ('Pets', 'Produtos para animais de estimação'),
    ('Vinhos', 'Vinhos e bebidas alcoólicas'),
    ('Jardinagem', 'Produtos para jardinagem'),
    ('Lazer', 'Produtos de lazer e entretenimento'),
    (
        'Cozinha',
        'Utensílios e eletrodomésticos de cozinha'
    ),
    ('Fotografia', 'Câmeras, lentes e acessórios'),
    ('Relógios', 'Relógios de pulso e acessórios'),
    (
        'Acessórios de Moda',
        'Acessórios como bolsas, sapatos, etc.'
    ),
    ('Celulares', 'Smartphones e acessórios'),
    ('Computadores', 'Computadores e acessórios'),
    ('Câmeras', 'Câmeras fotográficas e filmadoras'),
    ('Áudio e Vídeo', 'Produtos de áudio e vídeo'),
    ('Ciclismo', 'Produtos para ciclismo'),
    ('Camping', 'Equipamentos para camping'),
    ('Cabelos', 'Produtos para cuidados com o cabelo'),
    (
        'Alimentos Naturais',
        'Alimentos naturais e orgânicos'
    ),
    (
        'Ferragens',
        'Ferragens e materiais de construção'
    ),
    ('Cervejas', 'Cervejas artesanais e importadas'),
    ('Relojoaria', 'Relógios de luxo e acessórios'),
    ('Conforto', 'Produtos para conforto pessoal'),
    (
        'Móveis Planejados',
        'Móveis planejados para residências e escritórios'
    ),
    ('Gastronomia', 'Produtos para chefs e culinária'),
    (
        'Tecnologia Wearable',
        'Tecnologia vestível e acessórios'
    ),
    (
        'Cuidados com a Pele',
        'Produtos para cuidados com a pele'
    ),
    (
        'Armazenamento',
        'Produtos para organização e armazenamento'
    ),
    (
        'Eletroportáteis',
        'Eletroportáteis de todas as marcas'
    ),
    ('Gadgets', 'Gadgets modernos e inovadores'),
    (
        'Empreendedorismo',
        'Produtos para empreendedores e negócios'
    ),
    ('Saúde Mental', 'Produtos para bem-estar mental'),
    ('Hobbies', 'Produtos para hobbies diversos'),
    (
        'Gestão de Tempo',
        'Produtos e ferramentas para gestão de tempo'
    ),
    (
        'Moda Feminina',
        'Roupas e acessórios para mulheres'
    ),
    (
        'Moda Masculina',
        'Roupas e acessórios para homens'
    );
-- Inserir 50 produtos
INSERT INTO products (name, description, price, quantity, category_id)
VALUES (
        'Smartphone XYZ',
        'Smartphone com 64GB de armazenamento',
        799.99,
        30,
        26
    ),
    (
        'Laptop ABC',
        'Laptop ultrafino com 8GB de RAM',
        1200.00,
        15,
        25
    ),
    (
        'Cadeira Gamer',
        'Cadeira ergonômica para gamers',
        450.50,
        20,
        2
    ),
    (
        'Camiseta Masculina',
        'Camiseta de algodão tamanho M',
        49.90,
        50,
        3
    ),
    (
        'Brinquedo Educativo',
        'Brinquedo educativo para crianças acima de 3 anos',
        89.90,
        30,
        4
    ),
    (
        'Livro de Culinária',
        'Livro com receitas de gastronomia',
        59.90,
        50,
        5
    ),
    (
        'Caixa de Som Bluetooth',
        'Caixa de som com Bluetooth e 10 horas de duração',
        199.90,
        25,
        7
    ),
    (
        'Aspirador de Pó',
        'Aspirador de pó vertical',
        299.00,
        40,
        8
    ),
    (
        'Perfume Feminino',
        'Perfume floral para mulheres',
        129.90,
        20,
        9
    ),
    (
        'Medicamento para Dor',
        'Medicamento analgésico',
        20.50,
        100,
        10
    ),
    (
        'Bola de Futebol',
        'Bola de futebol oficial',
        150.00,
        50,
        11
    ),
    (
        'Toalha de Banho',
        'Toalha de banho macia',
        29.90,
        60,
        12
    ),
    (
        'Furadeira',
        'Furadeira elétrica para construção',
        180.00,
        30,
        13
    ),
    ('Violão', 'Violão de 6 cordas', 500.00, 10, 14),
    (
        'Luminária LED',
        'Luminária LED para decoração',
        35.00,
        70,
        15
    ),
    (
        'Caderno de Notas',
        'Caderno para anotações',
        15.00,
        150,
        16
    ),
    (
        'Microondas',
        'Microondas de 25L',
        350.00,
        20,
        17
    ),
    (
        'Ração para Cães',
        'Ração premium para cães',
        89.90,
        40,
        18
    ),
    (
        'Vinho Tinto',
        'Vinho tinto francês',
        150.00,
        10,
        19
    ),
    (
        'Sementes para Plantio',
        'Sementes de hortaliças e flores',
        12.00,
        100,
        20
    ),
    (
        'Bicicleta',
        'Bicicleta de passeio com 18 marchas',
        499.00,
        15,
        21
    ),
    (
        'Barraca de Camping',
        'Barraca para 2 pessoas',
        250.00,
        10,
        22
    ),
    ('Shampoo', 'Shampoo antiqueda', 30.00, 60, 23),
    (
        'Granola',
        'Granola saudável com frutas',
        15.00,
        100,
        24
    ),
    (
        'Chave de Fenda',
        'Chave de fenda 8 peças',
        25.00,
        50,
        25
    ),
    (
        'Relógio de Pulso',
        'Relógio de pulso de aço inox',
        200.00,
        20,
        27
    ),
    (
        'Fones de Ouvido',
        'Fones de ouvido sem fio',
        120.00,
        50,
        7
    ),
    (
        'Tablet',
        'Tablet com 10 polegadas de tela',
        450.00,
        30,
        25
    ),
    (
        'Relógio de Parede',
        'Relógio de parede moderno',
        45.00,
        60,
        15
    ),
    (
        'Cafeteira',
        'Cafeteira elétrica com 12 xícaras',
        130.00,
        40,
        17
    ),
    (
        'Bolsas Femininas',
        'Bolsa feminina de couro',
        150.00,
        25,
        28
    ),
    (
        'Roupão de Banho',
        'Roupão de banho tamanho M',
        80.00,
        50,
        12
    ),
    (
        'Câmera Fotográfica',
        'Câmera fotográfica DSLR',
        1500.00,
        10,
        13
    ),
    (
        'Cerveja Artesanal',
        'Cerveja artesanal importada',
        20.00,
        100,
        19
    ),
    (
        'Relojoeiro',
        'Relógio de pulso de luxo',
        1200.00,
        5,
        27
    ),
    (
        'Lavadora de Roupas',
        'Lavadora de roupas 10kg',
        799.00,
        15,
        17
    ),
    (
        'Ar Condicionado',
        'Ar condicionado portátil',
        1200.00,
        20,
        17
    ),
    (
        'Tablet Infantil',
        'Tablet para crianças com jogos educativos',
        350.00,
        30,
        4
    ),
    (
        'Tênis Esportivo',
        'Tênis esportivo masculino',
        150.00,
        50,
        3
    ),
    (
        'Bateria de Câmera',
        'Bateria para câmeras DSLR',
        80.00,
        10,
        13
    ),
    (
        'Ração para Gatos',
        'Ração premium para gatos',
        65.00,
        50,
        18
    ),
    (
        'Kit de Ferramentas',
        'Kit completo de ferramentas manuais',
        180.00,
        25,
        13
    ),
    (
        'Roupas de Cama',
        'Jogo de lençóis para cama de casal',
        99.90,
        40,
        12
    ),
    (
        'Secador de Cabelo',
        'Secador de cabelo profissional',
        150.00,
        40,
        23
    ),
    (
        'Equipamento de Pesca',
        'Kit de pesca com vara e anzóis',
        250.00,
        30,
        11
    ),
    (
        'Câmera de Segurança',
        'Câmera de segurança sem fio',
        400.00,
        20,
        25
    ),
    (
        'Carregador de Celular',
        'Carregador rápido para smartphones',
        50.00,
        100,
        26
    ),
    (
        'Placa de Vídeo',
        'Placa de vídeo para PC',
        900.00,
        5,
        25
    ),
    (
        'Capacete de Ciclista',
        'Capacete de ciclista com segurança',
        120.00,
        30,
        21
    );
-- Inserir 50 entradas de produtos
INSERT INTO product_in (product_id, quantity)
VALUES (1, 10),
    (2, 15),
    (3, 20),
    (4, 50),
    (5, 30),
    (6, 50),
    (7, 25),
    (8, 40),
    (9, 20),
    (10, 100),
    (11, 50),
    (12, 60),
    (13, 30),
    (14, 10),
    (15, 70),
    (16, 150),
    (17, 20),
    (18, 40),
    (19, 10),
    (20, 100),
    (21, 15),
    (22, 10),
    (23, 60),
    (24, 100),
    (25, 50),
    (26, 50),
    (27, 20),
    (28, 25),
    (29, 30),
    (30, 40),
    (31, 60),
    (32, 40),
    (33, 50),
    (34, 60),
    (35, 50),
    (36, 40),
    (37, 60),
    (38, 70),
    (39, 60),
    (40, 50),
    (41, 30),
    (42, 40),
    (43, 50),
    (44, 50),
    (45, 20),
    (46, 40),
    (47, 50),
    (48, 40),
    (49, 30),
    (50, 100);
-- Inserir 50 saídas de produtos
INSERT INTO product_out (product_id, quantity)
VALUES (1, 5),
    (2, 3),
    (3, 7),
    (4, 20),
    (5, 10),
    (6, 5),
    (7, 15),
    (8, 30),
    (9, 5),
    (10, 50),
    (11, 10),
    (12, 20),
    (13, 5),
    (14, 3),
    (15, 10),
    (16, 30),
    (17, 10),
    (18, 20),
    (19, 3),
    (20, 50),
    (21, 5),
    (22, 7),
    (23, 30),
    (24, 10),
    (25, 25),
    (26, 15),
    (27, 10),
    (28, 5),
    (29, 5),
    (30, 10),
    (31, 5),
    (32, 20),
    (33, 5),
    (34, 30),
    (35, 5),
    (36, 5),
    (37, 20),
    (38, 10),
    (39, 5),
    (40, 10),
    (41, 5),
    (42, 20),
    (43, 15),
    (44, 30),
    (45, 20),
    (46, 10),
    (47, 15),
    (48, 10),
    (49, 20),
    (50, 30);