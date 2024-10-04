package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.Category;
import com.unisul.basic_inventory_api.model.CategoryDTO;
import com.unisul.basic_inventory_api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {this.categoryRepository = categoryRepository;}

    // Metodo para listar categorias com paginação e busca
    public CategoryDTO getPaginatedCategories(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField)); // PageRequest é 0-indexed

        List<Category> categories = categoryRepository.findCategoriesWithSearch(search, pageable);
        long totalItems = categoryRepository.countCategoriesBySearch(search);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategories(categories);
        categoryDTO.setTotalItems(totalItems);

        return categoryDTO;
    }

    // Metodo para salvar uma nova categoria
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Metodo para obter uma categoria específica
    public Optional<Category> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    // Metodo para atualizar uma categoria
    @Transactional
    public Optional<Category> updateCategory(int id, Category category) {
        if (!categoryRepository.existsById(id)) {
            return Optional.empty();
        }
        category.setId(id);
        return Optional.of(categoryRepository.save(category));
    }

    // Metodo para deletar uma categoria (exclusão lógica)
    public boolean setCategoryDeleted(int id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setDeleted(true); // Marca a categoria como deletada
            categoryRepository.save(category); // Salva a categoria atualizada
            return true; // Retorna true se a operação for bem-sucedida
        }
        return false; // Retorna false se a categoria não existir
    }

    // Metodo para verificar se uma categoria já existe
    public boolean categoryExists(String name) {
        return categoryRepository.findByName(name).isPresent();
    }

}
