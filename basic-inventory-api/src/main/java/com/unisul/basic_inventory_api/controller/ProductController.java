package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.Product;
import com.unisul.basic_inventory_api.model.ProductDTO;
import com.unisul.basic_inventory_api.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Listar produtos com paginação e busca
    @GetMapping
    public ResponseEntity<ProductDTO> listProducts(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductDTO productDTO = productService.getPaginatedProducts(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(productDTO);
    }

    // Listar produtos em baixa quantidade com paginação e busca
    @GetMapping("/low-stock")
    public ResponseEntity<ProductDTO> listLowStockProducts(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam int quantity,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductDTO productDTO = productService.getPaginatedProductsLowStock(page, rowsPerPage, search, quantity, sortField, sortDirection);
        return ResponseEntity.ok(productDTO);
    }

    // Obter um produto específico
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar um novo produto
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Verificar se o produto já existe
        if (productService.productExists(product.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // 409 Conflict
        }
        productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    // Atualizar um produto
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        return productService.updateProduct(id, product)
                .map(updatedProduct -> ResponseEntity.ok(updatedProduct))
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar um produto (exclusão lógica)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        if (productService.setProductDeleted(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
