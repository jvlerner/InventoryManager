package unisul.basicinventorycontrol.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import unisul.basicinventorycontrol.model.Page;
import unisul.basicinventorycontrol.model.Product;
import unisul.basicinventorycontrol.service.CategoryService;
import unisul.basicinventorycontrol.service.ProductService;

import java.util.List;

@Controller
@RequestMapping("/relatorios")
public class ReportController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private static final int ROWS_PER_PAGE = 14; // Número de produtos por página

    public ReportController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/baixo-estoque")
    public String listProductsLowStoc(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            Model model) {
        int totalProducts = productService.getTotalProductsCountLowStock(search);

        Page pageProduct = new Page(page, ROWS_PER_PAGE, totalProducts);
        page = pageProduct.getPage();
        int totalPages = pageProduct.getTotalPages();

        List<Product> paginatedProducts = productService.getPaginatedProductsLowStock(page, search, ROWS_PER_PAGE);

        model.addAttribute("products", paginatedProducts);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("search", search);

        return "low-stock-report";
    }
}
