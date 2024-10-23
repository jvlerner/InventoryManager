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

    @Autowired
    public ProductInService(ProductInRepository productInRepository) {
        this.productInRepository = productInRepository;
    }

    // Método para listar produtos com paginação e busca
    public ProductInListDTO getPaginatedProductsIn(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productInRepository.findProductsInAndCount(search, pageable);

        List<ProductIn> productsIn = results.stream()
                .map(tuple -> tuple.get(0, ProductIn.class)) // Pega o primeiro elemento como ProductIn
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class); // Usa o primeiro resultado para obter o total de itens

        return new ProductInListDTO(productsIn, totalItems);
    }

    // Método para salvar um novo produto
    @Transactional
    public void saveProductIn(ProductIn productIn) {
        productInRepository.save(productIn);
        updateProductQuantity(productIn.getProductId(), productIn.getQuantity()); // Assuming productId and quantity fields exist
    }

    @Transactional
    public Optional<ProductIn> updateProductIn(int id, ProductIn productIn) {
        return productInRepository.findById(id).map(existingProductIn -> {
            int quantityChange = productIn.getQuantity() - existingProductIn.getQuantity();
            existingProductIn.setProductId(productIn.getProductId());
            existingProductIn.setQuantity(productIn.getQuantity());

            productInRepository.save(existingProductIn);
            productService.updateProductQuantity(productIn.getProductId(), quantityChange);

            return existingProductIn;
        });
    }

    // Método para obter um produto específico
    public Optional<ProductIn> getProductInById(int id) {
        return productInRepository.findById(id);
    }

    // Método para deletar uma entrada de produto (exclusão lógica)
    @Transactional
    public boolean setProductInDeleted(int id) {
        return productInRepository.findById(id)
                .map(productIn -> {
                    productIn.setDeleted(true); // Marca a entrada de produto como deletada
                    productInRepository.save(productIn); // Salva a entrada de produto atualizada
                    return true; // Retorna true se a operação for bem-sucedida
                })
                .orElse(false); // Retorna false se a entrada de produto não existir
    }
}
