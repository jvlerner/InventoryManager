package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.ProductIn;
import com.unisul.basic_inventory_api.model.ProductInListDTO;
import com.unisul.basic_inventory_api.repository.ProductInRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductInService {

    private final ProductInRepository productInRepository;
    private final ProductService productService;

    @Autowired
    public ProductInService(ProductInRepository productInRepository, ProductService productService) {
        this.productInRepository = productInRepository;
        this.productService = productService;
    }

    // Method to list products with pagination and search
    public ProductInListDTO getPaginatedProductsIn(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productInRepository.findProductsInAndCount(search, pageable);

        List<ProductIn> productsIn = results.stream()
                .map(tuple -> tuple.get(0, ProductIn.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductInListDTO(productsIn, totalItems);
    }

    // Method to save a new product entry
    @Transactional
    public void saveProductIn(ProductIn productIn) {
        productInRepository.save(productIn);
        // Update the product quantity based on the entry
        productService.updateProductQuantity(productIn.getProduct().getId(), productIn.getQuantity());
    }

    // Method to update a product entry
    @Transactional
    public Optional<ProductIn> updateProductIn(int id, ProductIn productIn) {
        return productInRepository.findById(id).map(existingProductIn -> {
            int quantityChange = productIn.getQuantity() - existingProductIn.getQuantity();
            existingProductIn.setProduct(productIn.getProduct());
            existingProductIn.setQuantity(productIn.getQuantity());

            productInRepository.save(existingProductIn);
            // Update the product quantity
            productService.updateProductQuantity(productIn.getProduct().getId(), quantityChange);

            return existingProductIn;
        });
    }

    // Method to get a specific product entry
    public Optional<ProductIn> getProductInById(int id) {
        return productInRepository.findById(id);
    }

    // Method to delete a product entry (logical deletion)
    @Transactional
    public boolean setProductInDeleted(int id) {
        return productInRepository.findById(id)
                .map(productIn -> {
                    productIn.setDeleted(true);
                    productInRepository.save(productIn);
                    return true;
                })
                .orElseThrow(() -> new IllegalArgumentException("ProductIn not found with ID: " + id));
    }
}
