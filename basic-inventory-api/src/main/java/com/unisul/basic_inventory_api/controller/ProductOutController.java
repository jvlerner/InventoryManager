package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.ProductOut;
import com.unisul.basic_inventory_api.model.ProductOutListDTO;
import com.unisul.basic_inventory_api.service.ProductOutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/v1/product/out")
public class ProductOutController {

    private final ProductOutService productOutService;

    public ProductOutController(ProductOutService productOutService) {
        this.productOutService = productOutService;
    }

    // Listar produtos com paginação e busca
    @GetMapping("/list")
    public ResponseEntity<ProductOutListDTO> listProductsOut(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductOutListDTO productOutListDTO = productOutService.getPaginatedProductsOut(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(productOutListDTO);
    }

    // Obter um produto específico
    @GetMapping("/{id}")
    public ResponseEntity<ProductOut> getProductOut(@PathVariable int id) {
        return productOutService.getProductOutById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar um novo produto
    @PostMapping("/create")
    public ResponseEntity<ProductOut> createProductOut(@RequestBody ProductOut productOut) {
        ProductOut createdProductOut = productOutService.saveProductOut(productOut);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProductOut);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductOut> updateProductOut(@PathVariable int id, @RequestBody ProductOut productOut) {
        // Update the ProductOut entry
        Optional<ProductOut> updatedProductOut = productOutService.updateProductOut(id, productOut);
        // Check if the update was successful
        if (updatedProductOut.isPresent()) {
            // Update the product quantity based on the new ProductOut entry
            int quantityChange = productOut.getQuantity() - updatedProductOut.get().getQuantity();
            productService.updateProductQuantity(productOut.getProductId(), quantityChange);
            return ResponseEntity.ok(updatedProductOut.get());
        }
        return ResponseEntity.notFound().build();
    }


    // Deletar um produto (exclusão lógica)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductOut(@PathVariable int id) {
        if (productOutService.setProductOutDeleted(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
