package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.ProductOut;
import com.unisul.basic_inventory_api.model.ProductOutListDTO;
import com.unisul.basic_inventory_api.service.ProductOutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/products-out")
public class ProductOutController {

    private final ProductOutService productOutService;

    @Autowired
    public ProductOutController(ProductOutService productOutService) {
        this.productOutService = productOutService;
    }

    // Listar produtos vendidos com paginação e busca
    @Operation(summary = "Listar produtos vendidos", description = "Obtém uma lista de produtos vendidos com opções de busca, paginação e ordenação.")
    @ApiResponse(responseCode = "200", description = "Lista de produtos vendidos retornada com sucesso.")
    @GetMapping
    public ResponseEntity<ProductOutListDTO> getAllProductsOut(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductOutListDTO productOutList = productOutService.getPaginatedProductsOut(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(productOutList);
    }

    // Obter um produto específico
    @Operation(summary = "Obter produto vendido por ID", description = "Retorna os detalhes de um produto específico vendido.")
    @ApiResponse(responseCode = "200", description = "Produto encontrado.")
    @ApiResponse(responseCode = "404", description = "Produto não encontrado.")
    @GetMapping("/{id}")
    public ResponseEntity<ProductOut> getProductOut(@PathVariable int id) {
        return productOutService.getProductOutById(id)
                .map(ResponseEntity::ok) // Map the optional to a ResponseEntity
                .orElse(ResponseEntity.notFound().build()); // Return 404 if not found
    }

    // Cadastrar novo produto vendido
    @Operation(summary = "Cadastrar um novo produto vendido", description = "Cria um novo produto vendido.")
    @ApiResponse(responseCode = "201", description = "Produto vendido criado com sucesso.")
    @PostMapping
    public ResponseEntity<ProductOut> createProductOut(@RequestBody ProductOut productOut) {
        productOutService.saveProductOut(productOut);
        return ResponseEntity.status(201).body(productOut); // Retorna 201 Created
    }

    // Atualizar produto vendido existente
    @Operation(summary = "Atualizar um produto vendido", description = "Atualiza um produto vendido existente pelo ID.")
    @ApiResponse(responseCode = "200", description = "Produto vendido atualizado com sucesso.")
    @ApiResponse(responseCode = "404", description = "Produto vendido não encontrado.")
    @PutMapping("/{id}")
    public ResponseEntity<ProductOut> updateProductOut(@PathVariable int id, @RequestBody ProductOut productOut) {
        try {
            ProductOut updatedProductOut = productOutService.updateProductOut(id, productOut);
            return ResponseEntity.ok(updatedProductOut); // Retorna produto vendido atualizado
        } catch (Exception ex) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrado
        }
    }

    // Deletar produto vendido (exclusão lógica)
    @Operation(summary = "Deletar um produto vendido", description = "Realiza a exclusão lógica de um produto vendido pelo ID.")
    @ApiResponse(responseCode = "204", description = "Produto vendido deletado com sucesso.")
    @ApiResponse(responseCode = "404", description = "Produto vendido não encontrado.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductOut(@PathVariable int id) {
        if (productOutService.setProductOutDeleted(id)) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        }
        return ResponseEntity.notFound().build(); // Retorna 404 se não encontrado
    }
}
