package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.Product;
import com.unisul.basic_inventory_api.model.ProductDTO;
import com.unisul.basic_inventory_api.repository.ProductRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Metodo para listar produtos com paginação e busca
    public ProductDTO getPaginatedProducts(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsAndCount(search, pageable);

        List<Product> products = results.stream()
            .map(tuple -> tuple.get(0, Product.class)) // Pega o primeiro elemento como Product
            .toList();

        long totalItems = results.isEmpty() ? 0 : results.getFirst().get(1, Long.class); // Assume que o segundo elemento é o total de itens

        // Assume que o construtor está presente
        return new ProductDTO(products, totalItems);
    }
      // Metodo para listar produtos com paginação e busca e quantidade menor que "quantity"
    public ProductDTO getPaginatedProductsLowStock(int page, int rowsPerPage, String search, int quantity, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsWithCategoriesLowStock(search, quantity, pageable);

        List<Product> products = results.stream()
            .map(tuple -> tuple.get(0, Product.class)) // Pega o primeiro elemento como Product
            .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Assume que o segundo elemento é o total de itens

        return new ProductDTO(products, totalItems);
    }

    // Metodo para salvar uma novo produto
    @Transactional
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    // Metodo para obter um produto específico
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    // Metodo para atualizar um produto
    @Transactional
    public Optional<Product> updateProduct(int id, Product product) {
        if (!productRepository.existsById(id)) {
            return Optional.empty();
        }
        product.setId(id);
        return Optional.of(productRepository.save(product));
    }

    // Metodo para deletar um produto (exclusão lógica)
    @Transactional
    public boolean setProductDeleted(int id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setDeleted(true); // Marca a categoria como deletada
            productRepository.save(product); // Salva a categoria atualizada
            return true; // Retorna true se a operação for bem-sucedida
        }
        return false; // Retorna false se a categoria não existir
    }

    // Metodo para verificar se um produto já existe
    public boolean productExists(String name) {
        return productRepository.findByName(name).isPresent();
    }

}
