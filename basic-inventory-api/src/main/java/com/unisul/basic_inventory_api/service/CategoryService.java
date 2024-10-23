package com.unisul.basic_inventory_api.service;

import com.unisul.basic_inventory_api.model.Category;
import com.unisul.basic_inventory_api.model.CategoryListDTO;
import com.unisul.basic_inventory_api.repository.CategoryRepository;
import jakarta.persistence.Tuple;
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
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Método para listar categorias com paginação e busca
    public CategoryListDTO getPaginatedCategories(int page, int rowsPerPage, String search, String sortField, String sortDirection) {
        PageRequest pageable = PageRequest.of(page - 1, rowsPerPage, Sort.by(Sort.Direction.fromString(sortDirection), sortField));
        List<Tuple> results = categoryRepository.findCategoriesAndCount(search, pageable);

        List<Category> categories = results.stream()
                .map(tuple -> tuple.get(0, Category.class))
                .toList();

        long totalItems = results.isEmpty() ? 0 : results.get(0).get(1, Long.class);

        return new CategoryListDTO(categories, totalItems);
    }

    // Método para salvar uma nova categoria
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Método para obter uma categoria específica
    public Optional<Category> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    // Método para atualizar uma categoria
    @Transactional
    public Optional<Category> updateCategory(int id, Category category) {
        if (!categoryRepository.existsById(id)) {
            return Optional.empty(); // Retorna vazio se a categoria não existir
        }
        category.setId(id); // Define o ID da categoria a ser atualizada
        return Optional.of(categoryRepository.save(category));
    }

    // Método para deletar uma categoria (exclusão lógica)
    @Transactional
    public boolean setCategoryDeleted(int id) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setDeleted(true); // Marca a categoria como deletada
                    categoryRepository.save(category); // Salva a categoria atualizada
                    return true; // Retorna true se a operação for bem-sucedida
                })
                .orElse(false); // Retorna false se a categoria não existir
    }

    // Método para verificar se uma categoria já existe
    public boolean categoryExists(String name) {
        return categoryRepository.findByName(name).isPresent();
    }
}
