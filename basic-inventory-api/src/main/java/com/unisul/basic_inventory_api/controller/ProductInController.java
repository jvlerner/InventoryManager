package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.ProductIn;
import com.unisul.basic_inventory_api.model.ProductInListDTO;
import com.unisul.basic_inventory_api.service.ProductInService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/v1/product/in")
public class ProductInController {

    private final ProductInService productInService;

    public ProductInController(ProductInService productInService) {
        this.productInService = productInService;
    }

    // Listar produtos com paginação e busca
    @GetMapping("/list")
    public ResponseEntity<ProductInListDTO> listInProducts(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductInListDTO productInListDTO = productInService.getPaginatedProductsIn(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(productInListDTO);
    }

    // Obter um produtoIn específico
    @GetMapping("/{id}")
    public ResponseEntity<ProductIn> getProductIn(@PathVariable int id) {
        return productInService.getProductInById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar um novo produtoIn
    @PostMapping("/create")
    public ResponseEntity<ProductIn> createProductIn(@RequestBody ProductIn productIn) {
        ProductIn createdProductIn = productInService.saveProductIn(productIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProductIn);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductIn> updateProductIn(@PathVariable int id, @RequestBody ProductIn productIn) {
        Optional<ProductIn> updatedProductIn = productInService.updateProductIn(id, productIn);
        return updatedProductIn
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar um produtoIn (exclusão lógica)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductIn(@PathVariable int id) {
        if (productInService.setProductDeleted(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
