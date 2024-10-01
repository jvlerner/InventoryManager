package unisul.basicinventorycontrol.controller;

import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import unisul.basicinventorycontrol.model.Page;
import unisul.basicinventorycontrol.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import unisul.basicinventorycontrol.service.CategoryService;
import unisul.basicinventorycontrol.service.ProductService;

import java.util.List;

@Controller
@RequestMapping("/produtos")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private static final int ROWS_PER_PAGE = 10; // Número de produtos por página

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public String listProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            Model model) {
        int totalProducts = productService.getTotalProductsCount(search);

        Page pageProduct = new Page(page, ROWS_PER_PAGE, totalProducts);
        page = pageProduct.getPage();
        int totalPages = pageProduct.getTotalPages();

        List<Product> paginatedProducts = productService.getPaginatedProducts(page, search, ROWS_PER_PAGE);

        model.addAttribute("products", paginatedProducts);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("search", search);

        return "products";
    }

    @GetMapping("/cadastrar")
    public String formNewProduct(Model model) {
        model.addAttribute("product", new Product());
        model.addAttribute("categories", categoryService.getAllCategories());
        return "new-product";
    }

    @PostMapping
    public String newProduct(@ModelAttribute @Valid Product product, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "redirect:/produtos/cadastrar";
        }
        productService.saveProduct(product);
        return "redirect:/produtos";
    }

    @PostMapping("excluir")
    public String deleteProduct(@RequestParam int id,
                                @RequestParam int page,
                                @RequestParam String search,
                                Model model) {
        productService.setProductDeleted(id);

        return "redirect:/produtos?page="+page+"&search="+search;
    }

}
