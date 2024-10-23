package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.exception.ProductNotFoundException;
import com.unisul.basic_inventory_api.exception.InsufficientStockException;
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
    private final ProductService productService;

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
                .map(tuple -> tuple.get(0, ProductOut.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductOutListDTO(productsOut, totalItems);
    }

    // Metodo para salvar um novo produto
    @Transactional
    public void saveProductOut(ProductOut productOut) {
        // Verifica a quantidade disponível do produto
        int productId = productOut.getProduct().getId();
        if (!productService.getProductById(productId).isPresent()) {
            throw new ProductNotFoundException("Produto não encontrado com ID: " + productId);
        }

        // Atualiza a quantidade do produto com base na saída
        int quantityChange = -productOut.getQuantity();
        try {
            productService.updateProductQuantity(productId, quantityChange);
            productOutRepository.save(productOut);
        } catch (IllegalArgumentException e) {
            throw new InsufficientStockException("Estoque insuficiente para o produto ID: " + productId);
        }
    }

    // Metodo para atualizar uma saída de produto
    @Transactional
    public Optional<ProductOut> updateProductOut(int id, ProductOut productOut) {
        return productOutRepository.findById(id).map(existingProductOut -> {
            int quantityChange = existingProductOut.getQuantity() - productOut.getQuantity();
            existingProductOut.setProduct(productOut.getProduct());
            existingProductOut.setQuantity(productOut.getQuantity());

            productOutRepository.save(existingProductOut);
            // Atualiza a quantidade do produto baseado na mudança
            productService.updateProductQuantity(productOut.getProduct().getId(), quantityChange);

            return existingProductOut;
        }).orElseThrow(() -> new ProductNotFoundException("Saída de produto não encontrada com ID: " + id));
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
                    productOut.setDeleted(true);
                    productOutRepository.save(productOut);
                    return true;
                })
                .orElseThrow(() -> new ProductNotFoundException("Saída de produto não encontrada com ID: " + id));
    }
}
