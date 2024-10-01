package unisul.basicinventorycontrol.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import unisul.basicinventorycontrol.model.Product;
import unisul.basicinventorycontrol.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public void setProductDeleted(int id) {
        boolean deleted = true;
        productRepository.updateProductDeletedStatus(id, deleted);
    }

    public void setProductRecovery(int id ) {
        boolean deleted = false;
        productRepository.updateProductDeletedStatus(id, deleted);
    }

    public List<Product> getPaginatedProducts(int page, String search, int rowsPerPage) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage); // PageRequest é 0-indexed
        return productRepository.findProductsWithCategories(search, pageable);
    }

    public int getTotalProductsCount(String search) {
        return productRepository.countProductsBySearch(search);
    }

    public List<Product> getPaginatedProductsLowStock(int page, String search, int rowsPerPage) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage); // PageRequest é 0-indexed
        return productRepository.findProductsWithCategoriesLowStock(search, pageable);
    }

    public int getTotalProductsCountLowStock(String search) {
        return productRepository.countProductsBySearchLowStock(search);
    }



}
