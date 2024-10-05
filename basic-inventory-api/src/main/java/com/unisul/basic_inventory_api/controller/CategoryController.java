package com.unisul.basic_inventory_api.controller;

import com.unisul.basic_inventory_api.model.Category;
import com.unisul.basic_inventory_api.model.CategoryDTO;
import com.unisul.basic_inventory_api.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Listar categorias com paginação e busca
    @Operation(summary = "Obter categorias com paginação e busca, paramêtros: int page, int rowsPerPage, String search, String sortField, String sortDirection")
    @ApiResponse(responseCode = "200", description = "Lista de Categorias, Total de categorias")
    @GetMapping
    public ResponseEntity<CategoryDTO> listCategories(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rowsPerPage,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        CategoryDTO categoryDTO = categoryService.getPaginatedCategories(page, rowsPerPage, search, sortField, sortDirection);
        return ResponseEntity.ok(categoryDTO);
    }

    // Cadastrar nova categoria
    @Operation(summary = "Obter categorias com paginação e busca, paramêtros: int page, int rowsPerPage, String search, String sortField, String sortDirection")
    @ApiResponse(responseCode = "200", description = "Lista de Categorias, Total de categorias")
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        // Verificar se a categoria já existe
        if (categoryService.categoryExists(category.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // 409 Conflict
        }
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    // Obter uma categoria específica
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable int id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar uma categoria
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category)
                .map(updatedCategory -> ResponseEntity.ok(updatedCategory))
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar uma categoria (exclusão lógica)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        if (!categoryService.setCategoryDeleted(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
