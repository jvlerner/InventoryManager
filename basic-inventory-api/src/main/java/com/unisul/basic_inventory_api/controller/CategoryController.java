package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.Category;
import com.unisul.basic_inventory_api.model.CategoryListDTO;
import com.unisul.basic_inventory_api.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Arrays;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Listar categorias com paginação e busca
    @Operation(summary = "Listar categorias", description = "Retorna uma lista de categorias com suporte a paginação e filtros.")
    @ApiResponse(responseCode = "200", description = "Lista de categorias retornada com sucesso.")
    @GetMapping
    public ResponseEntity<CategoryListDTO> listCategories(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        if (page < 1) {
            return ResponseEntity.badRequest().build();
        }

        if (5 > rowsPerPage || rowsPerPage > 100) {
            return ResponseEntity.badRequest().build();
        }

        if (!Arrays.asList("name", "id").contains(sortField)) {
            return ResponseEntity.badRequest().build();
        }
        if (!Arrays.asList("asc", "desc").contains(sortDirection.toLowerCase())) {
            return ResponseEntity.badRequest().build();
        }

        CategoryListDTO categoryDTO = categoryService.getPaginatedCategories(page, rowsPerPage, search, sortField,
                sortDirection);
        return ResponseEntity.ok(categoryDTO);
    }

    // Listar todas categorias (id, nome)
    @Operation(summary = "Listar categorias (id, nome)", description = "Retorna uma lista de categorias com id e nome.")
    @ApiResponse(responseCode = "200", description = "Lista de categorias retornada com sucesso.")
    @GetMapping("/names")
    public ResponseEntity<CategoryListDTO> listAllCategories() {
        CategoryListDTO categoryDTO = categoryService.getAllCategories();
        return ResponseEntity.ok(categoryDTO);
    }

    // Cadastrar nova categoria
    @Operation(summary = "Cadastrar nova categoria", description = "Cadastra uma nova categoria no sistema.")
    @ApiResponse(responseCode = "201", description = "Categoria criada com sucesso.")
    @ApiResponse(responseCode = "409", description = "Conflito: a categoria já existe.")
    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        try {
            Category savedCategory = categoryService.saveCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory); // Retorna 201 Created
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Retorna 409 Conflict
        }
    }

    // Obter uma categoria específica
    @Operation(summary = "Obter categoria por ID", description = "Retorna os detalhes de uma categoria específica.")
    @ApiResponse(responseCode = "200", description = "Categoria encontrada.")
    @ApiResponse(responseCode = "404", description = "Categoria não encontrada.")
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable int id) {
        try {
            Category category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(category);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar uma categoria existente
    @Operation(summary = "Atualizar categoria", description = "Atualiza os dados de uma categoria existente.")
    @ApiResponse(responseCode = "200", description = "Categoria atualizada com sucesso.")
    @ApiResponse(responseCode = "404", description = "Categoria não encontrada.")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @Valid @RequestBody Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, category);
            return ResponseEntity.ok(updatedCategory); // Retorna produto atualizado
        } catch (Exception ex) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrada
        }
    }

    // Deletar uma categoria (exclusão lógica)
    @Operation(summary = "Deletar categoria", description = "Marca uma categoria como deletada no sistema.")
    @ApiResponse(responseCode = "204", description = "Categoria deletada com sucesso.")
    @ApiResponse(responseCode = "404", description = "Categoria não encontrada.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        if (!categoryService.setCategoryDeleted(id)) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrada
        }
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}
