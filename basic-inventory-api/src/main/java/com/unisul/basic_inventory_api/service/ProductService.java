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

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Method to list products with pagination and search
    public ProductListDTO getPaginatedProducts(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsAndCount(search, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductListDTO(products, totalItems);
    }

    // Method to list low-stock products with pagination and search
    public ProductListDTO getPaginatedProductsLowStock(int page, int rowsPerPage, String search, int quantity, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productRepository.findProductsWithCategoriesLowStock(search, quantity, pageable);

        List<Product> products = results.stream()
                .map(tuple -> tuple.get(0, Product.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductListDTO(products, totalItems);
    }

    // Method to save a new product
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Method to get a specific product
    public Product getProductById(int id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));
    }

    // Method to update a product
    @Transactional
    public Optional<Product> updateProduct(int id, Product product) {
        if (!productRepository.existsById(id)) {
            return Optional.empty(); // Return empty if not found
        }
        product.setId(id);
        return Optional.of(productRepository.save(product)); // Wrap the saved product in Optional
    }


    // Method to delete a product (logical deletion)
    @Transactional
    public boolean setProductDeleted(int id) {
        return productRepository.findById(id).map(product -> {
            product.setDeleted(true); // Mark the product as deleted
            productRepository.save(product); // Save the updated product
            return true; // Return true if the product was found and marked as deleted
        }).orElse(false); // Return false if the product was not found
    }


    // Method to check if a product exists by name
    public boolean productExists(String name) {
        return productRepository.findByName(name).isPresent();
    }

    // Method to update the quantity of a product
    @Transactional
    public void updateProductQuantity(int productId, int quantityChange) {
        Product product = getProductById(productId);
        int newQuantity = product.getQuantity() + quantityChange;

        if (newQuantity < 0) {
            throw new IllegalArgumentException("Insufficient stock for product ID: " + productId);
        }

        product.setQuantity(newQuantity);
        productRepository.save(product);
    }
}
