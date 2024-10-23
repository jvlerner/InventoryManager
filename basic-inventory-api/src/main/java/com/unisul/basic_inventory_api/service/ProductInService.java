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

    // Metodo para listar produtos com paginacao e busca
    public ProductInListDTO getPaginatedProductsIn(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = productInRepository.findProductsInAndCount(search, pageable);

        List<ProductIn> productsIn = results.stream()
                .map(tuple -> tuple.get(0, ProductIn.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new ProductInListDTO(productsIn, totalItems);
    }

    // Metodo para salvar uma nova entrada de produto
    @Transactional
    public void saveProductIn(ProductIn productIn) {
        productInRepository.save(productIn);
        // Atualiza a quantidade do produto com base na entrada
        productService.updateProductQuantity(productIn.getProduct().getId(), productIn.getQuantity());
    }

    // Metodo para atualizar uma entrada de produto
    @Transactional
    public Optional<ProductIn> updateProductIn(int id, ProductIn productIn) {
        return productInRepository.findById(id).map(existingProductIn -> {
            int quantityChange = productIn.getQuantity() - existingProductIn.getQuantity();
            existingProductIn.setProduct(productIn.getProduct());
            existingProductIn.setQuantity(productIn.getQuantity());

            productInRepository.save(existingProductIn);
            // Atualiza a quantidade do produto
            productService.updateProductQuantity(productIn.getProduct().getId(), quantityChange);

            return existingProductIn;
        });
    }

    // Metodo para obter uma entrada de produto especifica
    public Optional<ProductIn> getProductInById(int id) {
        return productInRepository.findById(id);
    }

    // Metodo para deletar uma entrada de produto (delecao logica)
    @Transactional
    public boolean setProductInDeleted(int id) {
        return productInRepository.findById(id)
                .map(productIn -> {
                    productIn.setDeleted(true);
                    productInRepository.save(productIn);
                    return true;
                })
                .orElseThrow(() -> new IllegalArgumentException("ProductIn nao encontrado com ID: " + id));
    }
}
