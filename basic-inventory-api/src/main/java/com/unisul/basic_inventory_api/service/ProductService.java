package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.exception.ProductNotFoundException;
import com.unisul.basic_inventory_api.exception.InsufficientStockException;
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

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Metodo para listar produtos com paginacao e busca
    public ProductListDTO getPaginatedProducts(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsAndCount(search, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductListDTO(products, totalItems);
    }

    // Metodo para listar produtos com baixo estoque com paginacao e busca
    public ProductListDTO getPaginatedProductsLowStock(int page, int rowsPerPage, String search, int quantity, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsWithCategoriesLowStock(search, quantity, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductListDTO(products, totalItems);
    }

    // Metodo para salvar um novo produto
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Metodo para obter um produto especifico
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    // Metodo para atualizar um produto
    @Transactional
    public Optional<Product> updateProduct(int id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Produto não encontrado com ID: " + id); // Throw exception if not found
        }
        product.setId(id);
        return Optional.of(productRepository.save(product));
    }

    // Metodo para deletar um produto (delecao logica)
    @Transactional
    public boolean setProductDeleted(int id) {
        return productRepository.findById(id).map(product -> {
            product.setDeleted(true);
            productRepository.save(product);
            return true;
        }).orElseThrow(() -> new ProductNotFoundException("Produto não encontrado com ID: " + id)); // Throw exception if not found
    }

    // Metodo para verificar se um produto existe pelo nome
    public boolean productExists(String name) {
        return productRepository.findByName(name).isPresent();
    }

    // Metodo para atualizar a quantidade de um produto
    @Transactional
    public void updateProductQuantity(int productId, int quantityChange) {
        Optional<Product> optionalProduct = getProductById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            int newQuantity = product.getQuantity() + quantityChange;

            if (newQuantity < 0) {
                throw new InsufficientStockException("Estoque insuficiente para o produto ID: " + productId);
            }

            product.setQuantity(newQuantity);
            productRepository.save(product);
        } else {
            throw new ProductNotFoundException("Produto não encontrado com ID: " + productId); // Throw exception if not found
        }
    }
}
