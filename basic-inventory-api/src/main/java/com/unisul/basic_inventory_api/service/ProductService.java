package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.Product;
import com.unisul.basic_inventory_api.model.ProductListDTO;
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

    @Autowired
    private final ProductService productService;

    public ProductInService(ProductInRepository productInRepository, ProductService productService) {
        this.productInRepository = productInRepository;
        this.productService = productService;
    }

    // Método para listar produtos com paginação e busca
    public ProductListDTO getPaginatedProducts(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsAndCount(search, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class)) // Pega o primeiro elemento como Product
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Assume que o segundo elemento é o total de itens

        return new ProductListDTO(products, totalItems);
    }

    // Método para listar produtos em baixa quantidade com paginação e busca
    public ProductListDTO getPaginatedProductsLowStock(int page, int rowsPerPage, String search, int quantity, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsWithCategoriesLowStock(search, quantity, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class)) // Pega o primeiro elemento como Product
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Assume que o segundo elemento é o total de itens

        return new ProductListDTO(products, totalItems);
    }

    // Método para salvar um novo produto
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product); // Retorna o produto salvo
    }

    // Método para obter um produto específico
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    // Método para atualizar um produto
    @Transactional
    public Optional<Product> updateProduct(int id, Product product) {
        if (!productRepository.existsById(id)) {
            return Optional.empty();
        }
        product.setId(id);
        return Optional.of(productRepository.save(product));
    }

    // Método para deletar um produto (exclusão lógica)
    @Transactional
    public boolean setProductDeleted(int id) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setDeleted(true); // Marca o produto como deletado
                    productRepository.save(product); // Salva o produto atualizado
                    return true; // Retorna true se a operação for bem-sucedida
                })
                .orElse(false); // Retorna false se o produto não existir
    }

    // Método para verificar se um produto já existe
    public boolean productExists(String name) {
        return productRepository.findByName(name).isPresent();
    }

    public void updateProductQuantity(int productId, int quantityChange) {
        productRepository.findById(productId).ifPresent(product -> {
            int newQuantity = product.getQuantity() + quantityChange;
            if (newQuantity < 0) {
                throw new IllegalArgumentException("Insufficient stock for product ID: " + productId);
            }
            product.setQuantity(newQuantity);
            productRepository.save(product);
        });
    }


}
