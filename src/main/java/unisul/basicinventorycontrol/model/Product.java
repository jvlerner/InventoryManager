package unisul.basicinventorycontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "products") // tabela produtos
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto incremento
    private int id;

    private boolean deleted = false; // exclusão lógica

    @NotBlank // O nome não pode ser nulo ou vazio
    @Size(max = 100) // tamanho máximo
    private String name;

    @Size(max = 255) // tamanho máximo 255
    private String description;

    @NotNull // não pode ser nulo
    @DecimalMin(value = "0", message = "A quantidade não pode ser negativa.") // O preço deve ser maior que zero
    private double price;

    @NotNull
    @Column(columnDefinition = "int default 0") // padrão para quantidade = 0
    private int quantity = 0;

    @NotNull(message = "A categoria é obrigatória")
    @ManyToOne(fetch = FetchType.EAGER) // n produtos para 1 categoria
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_category")) // Chave estrangeira
    private Category category;

    // Construtor padrão
    public Product() {
    }

    public boolean isAvailable() {
        return quantity > 0;
    }

    // get e set
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
