package com.unisul.basic_inventory_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Representa uma saída de produto no sistema.
 */
@Entity
@Table(name = "product_out") // Tabela de saídas de produtos
@Data
@NoArgsConstructor // Construtor sem parâmetros
public class ProductOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento
    private int id;

    private boolean deleted = false; // Indica se a saída está excluída logicamente

    @NotNull(message = "A quantidade não pode ser nula") // Validação para a quantidade
    @Column(nullable = false)
    private int quantity;

    @Column(name = "exit_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime exitDate;

    @NotNull(message = "O produto é obrigatório") // Validação para o produto
    @ManyToOne(fetch = FetchType.EAGER) // Várias saídas podem referenciar um produto
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_product"))
    private Product product; // Referência ao produto

    @PrePersist
    public void prePersist() {
        exitDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return String.format("ProductOut[id=%d, quantity=%d, exitDate=%s, product=%s]", id, quantity, exitDate, product);
    }
}
