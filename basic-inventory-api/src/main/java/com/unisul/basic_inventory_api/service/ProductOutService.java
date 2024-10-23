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

    @Autowired
    public ProductOutService(ProductOutRepository productOutRepository) {
        this.productOutRepository = productOutRepository;
    }

    // Método para listar produtos com paginação e busca
    public ProductOutListDTO getPaginatedProductsOut(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productOutRepository.findProductsOutAndCount(search, pageable);

        List<ProductOut> productsOut = results.stream()
                .map(tuple -> tuple.get(0, ProductOut.class)) // Pega o primeiro elemento como ProductOut
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Usa o primeiro resultado para obter o total de itens

        return new ProductOutListDTO(productsOut, totalItems);
    }

    // Método para salvar um novo produto
    @Transactional
    public void saveProductOut(ProductOut productOut) {
        productOutRepository.save(productOut);
        updateProductQuantity(productOut.getProductId(), -productOut.getQuantity()); // Decrease quantity for product out
    }

    @Transactional
    public Optional<ProductOut> updateProductOut(int id, ProductOut productOut) {
        return productOutRepository.findById(id).map(existingProductOut -> {
            int quantityChange = existingProductOut.getQuantity() - productOut.getQuantity();
            existingProductOut.setProductId(productOut.getProductId());
            existingProductOut.setQuantity(productOut.getQuantity());

            productOutRepository.save(existingProductOut);
            productService.updateProductQuantity(productOut.getProductId(), quantityChange);

            return existingProductOut;
        });
    }

    // Método para obter um produto específico
    public Optional<ProductOut> getProductOutById(int id) {
        return productOutRepository.findById(id);
    }

    // Método para deletar um produto (exclusão lógica)
    @Transactional
    public boolean setProductOutDeleted(int id) {
        return productOutRepository.findById(id)
                .map(productOut -> {
                    productOut.setDeleted(true); // Marca o produto como deletado
                    productOutRepository.save(productOut); // Salva o produto atualizado
                    return true; // Retorna true se a operação for bem-sucedida
                })
                .orElse(false); // Retorna false se o produto não existir
    }
}
