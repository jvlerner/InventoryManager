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

    private final ProductOutRepository productOutRepository;
    private final ProductService productService; // Assuming you have a ProductService

    @Autowired
    public ProductOutService(ProductOutRepository productOutRepository, ProductService productService) {
        this.productOutRepository = productOutRepository;
        this.productService = productService;
    }

    // Metodo para listar produtos com paginação e busca
    public ProductOutListDTO getPaginatedProductsOut(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productOutRepository.findProductsOutAndCount(search, pageable);

        List<ProductOut> productsOut = results.stream()
                .map(tuple -> tuple.get(0, ProductOut.class)) // Pega o primeiro elemento como ProductOut
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Usa o primeiro resultado para obter o total de itens

        return new ProductOutListDTO(productsOut, totalItems);
    }

    // Metodo para salvar um novo produto
    @Transactional
    public void saveProductOut(ProductOut productOut) {
        productOutRepository.save(productOut);
        // Decrease quantity for the product being removed
        productService.updateProductQuantity(productOut.getProduct().getId(), -productOut.getQuantity());
    }

    // Metodo para atualizar uma saída de produto
    @Transactional
    public Optional<ProductOut> updateProductOut(int id, ProductOut productOut) {
        return productOutRepository.findById(id).map(existingProductOut -> {
            int quantityChange = existingProductOut.getQuantity() - productOut.getQuantity();
            existingProductOut.setProduct(productOut.getProduct()); // Updated to set the whole product
            existingProductOut.setQuantity(productOut.getQuantity());

            productOutRepository.save(existingProductOut);
            // Update the product quantity based on the change
            productService.updateProductQuantity(productOut.getProduct().getId(), quantityChange);

            return existingProductOut;
        });
    }

    // Metodo para obter uma saída de produto específica
    public Optional<ProductOut> getProductOutById(int id) {
        return productOutRepository.findById(id);
    }

    // Metodo para deletar uma saída de produto (exclusão lógica)
    @Transactional
    public boolean setProductOutDeleted(int id) {
        return productOutRepository.findById(id)
                .map(productOut -> {
                    productOut.setDeleted(true); // Marca a saída de produto como deletada
                    productOutRepository.save(productOut); // Salva a saída de produto atualizada
                    return true; // Retorna true se a operação for bem-sucedida
                })
                .orElse(false); // Retorna false se a saída de produto não existir
    }
}
