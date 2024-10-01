package unisul.basicinventorycontrol.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import unisul.basicinventorycontrol.model.Category;
import unisul.basicinventorycontrol.repository.CategoryRepository;

import java.util.List;

@Controller
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categorias")
    public String listCategories(Model model) {
        List<Category> categories = categoryRepository.findAll();
        model.addAttribute("categories", categories);
        return "categories";
    }

    @GetMapping("/categorias/cadastrar")
    public String formNewCategory(Model model) {
        model.addAttribute("category", new Category());
        return "new-category";
    }

    @PostMapping("/categorias")
    public String newCategory(@ModelAttribute Category category) {
        categoryRepository.save(category);
        return "redirect:/categorias";
    }
}
