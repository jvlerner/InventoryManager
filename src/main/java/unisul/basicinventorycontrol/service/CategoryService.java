package unisul.basicinventorycontrol.service;

import org.springframework.stereotype.Service;
import unisul.basicinventorycontrol.model.Category;
import unisul.basicinventorycontrol.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }
}
