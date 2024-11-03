package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.ProductIn;
import com.unisul.basic_inventory_api.model.ProductInListDTO;
import com.unisul.basic_inventory_api.service.ProductInService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products-in")
public class ProductInController {
    @Autowired
    private final ProductInService productInService;

    public ProductInController(ProductInService productInService) {
        this.productInService = productInService;
    }

    // Listar produtos recebidos com paginação e busca
    @Operation(summary = "Listar produtos recebidos", description = "Obtém uma lista de produtos recebidos com opções de busca, paginação e ordenação.")
    @ApiResponse(responseCode = "200", description = "Lista de produtos recebidos retornada com sucesso.")
    @GetMapping
    public ResponseEntity<ProductInListDTO> getAllProductsIn(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        ProductInListDTO productInList = productInService.getPaginatedProductsIn(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(productInList);
    }

    // Obter um produto específico
    @Operation(summary = "Obter produto em estoque por ID", description = "Retorna os detalhes de um produto específico em estoque.")
    @ApiResponse(responseCode = "200", description = "Produto encontrado.")
    @ApiResponse(responseCode = "404", description = "Produto não encontrado.")
    @GetMapping("/{id}")
    public ResponseEntity<ProductIn> getProductIn(@PathVariable int id) {
        return productInService.getProductInById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrado
    }


    // Cadastrar novo produto recebido
    @Operation(summary = "Cadastrar um novo produto recebido", description = "Cria um novo produto recebido.")
    @ApiResponse(responseCode = "201", description = "Produto recebido criado com sucesso.")
    @PostMapping
    public ResponseEntity<ProductIn> createProductIn(@RequestBody ProductIn productIn) {
        productInService.saveProductIn(productIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(productIn); // Retorna 201 Created
    }

    // Atualizar produto recebido existente
    @Operation(summary = "Atualizar um produto recebido", description = "Atualiza um produto recebido existente pelo ID.")
    @ApiResponse(responseCode = "200", description = "Produto recebido atualizado com sucesso.")
    @ApiResponse(responseCode = "404", description = "Produto recebido não encontrado.")
    @PutMapping("/{id}")
    public ResponseEntity<ProductIn> updateProductIn(@PathVariable int id, @RequestBody ProductIn productIn) {
        return productInService.updateProductIn(id, productIn)
                .map(ResponseEntity::ok) // Retorna produto atualizado
                .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrado
    }

    // Deletar produto recebido (exclusão lógica)
    @Operation(summary = "Deletar um produto recebido", description = "Realiza a exclusão lógica de um produto recebido pelo ID.")
    @ApiResponse(responseCode = "204", description = "Produto recebido deletado com sucesso.")
    @ApiResponse(responseCode = "404", description = "Produto recebido não encontrado.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductIn(@PathVariable int id) {
        // Verifica se a exclusão foi bem-sucedida
        if (productInService.setProductInDeleted(id)) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        }
        return ResponseEntity.notFound().build(); // Retorna 404 se não encontrado
    }
}
