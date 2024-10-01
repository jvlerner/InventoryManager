package unisul.basicinventorycontrol.model;

public class Page {
    private int page;          // Página atual
    private int rows;          // Número de linhas por página
    private int totalProducts; // Total de produtos
    private int totalPages;    // Total de páginas

    // Construtor
    public Page(int page, int rows, int totalProducts) {
        this.rows = rows;
        this.totalProducts = totalProducts;
        this.totalPages = (int) Math.ceil((double) totalProducts / rows);

        // Garantindo que totalPages seja pelo menos 1
        if (totalPages == 0) {
            this.totalPages = 1;
        }

        // Garantindo que a página seja válida
        setPage(page);
    }

    // Getters e Setters
    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        if (page < 1) {
            this.page = 1;
        } else if (page > totalPages) {
            this.page = totalPages;
        } else {
            this.page = page;
        }
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
        this.totalPages = (int) Math.ceil((double) totalProducts / rows);
        if (totalPages == 0) {
            totalPages = 1;
        }
        if (page > totalPages) {
            page = totalPages;
        }
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
        this.totalPages = (int) Math.ceil((double) totalProducts / rows);
        if (totalPages == 0) {
            totalPages = 1;
        }
        if (page > totalPages) {
            page = totalPages;
        }
    }

    public int getTotalPages() {
        return totalPages;
    }
}
