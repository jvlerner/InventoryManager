package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.ProductOut;
import com.unisul.basic_inventory_api.model.ProductOutListDTO;
import com.unisul.basic_inventory_api.repository.ProductOutRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductOutService {
    @Autowired
    private final ProductOutRepository productOutRepository;
    private final ProductService productService;
    
    public ProductOutService(ProductOutRepository productOutRepository, ProductService productService) {
        this.productOutRepository = productOutRepository;
        this.productService = productService;
    }

    // Method to list products with pagination and search
    public ProductOutListDTO getPaginatedProductsOut(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productOutRepository.findProductsOutAndCount(search, pageable);

        List<ProductOut> productsOut = results.stream()
                .map(tuple -> tuple.get(0, ProductOut.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductOutListDTO(productsOut, totalItems);
    }

    // Method to save a new product out
    @Transactional
    public void saveProductOut(ProductOut productOut) {
        // Check the available quantity of the product
        int productId = productOut.getProduct().getId();
        if (!productService.getProductById(productId).isPresent()) {
            throw new RuntimeException("Product not found " + productId);
        }

        // Update the quantity of the product based on the output
        int quantityChange = -productOut.getQuantity();
        try {
            productService.updateProductQuantity(productId, quantityChange);
            productOutRepository.save(productOut);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Insufficient stock " + productId);
        }
    }

    // Method to update a product out
    @Transactional
    public ProductOut updateProductOut(int id, ProductOut productOut) {
        return productOutRepository.findById(id).map(existingProductOut -> {
            existingProductOut.setProduct(productOut.getProduct());
            existingProductOut.setQuantity(productOut.getQuantity());
            return productOutRepository.save(existingProductOut);
        }).orElseThrow(() -> new RuntimeException("Product out not found " + id));
    }


    // Method to get a specific product out
    public Optional<ProductOut> getProductOutById(int id) {
        return productOutRepository.findById(id);
    }

    // Method to delete a product out (logical deletion)
    @Transactional
    public boolean setProductOutDeleted(int id) {
        return productOutRepository.findById(id)
                .map(productOut -> {
                    productOut.setDeleted(true);
                    productOutRepository.save(productOut);
                    return true;
                })
                .orElseThrow(() -> new RuntimeException("Product out not found " + id));
    }
}
