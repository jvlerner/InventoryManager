package unisul.basicinventorycontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_out") // tabela saidas
public class ProductOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private boolean deleted = false; // exclusao logica

    @Column(name = "product_id", nullable = false)
    private int productId;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "exit_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime exitDate;

    @NotNull
    @ManyToOne // n saidas para 1 produto
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

    // construtor com horario atual padrao
    public ProductOut() {
        this.exitDate = LocalDateTime.now();
    }

    // get and set
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDateTime exitDate) {
        this.exitDate = exitDate;
    }
}
