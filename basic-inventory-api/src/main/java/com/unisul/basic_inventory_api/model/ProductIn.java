package com.unisul.basic_inventory_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Representa uma entrada de produto no sistema.
 */
@Entity
@Table(name = "product_in") // Tabela de entradas de produtos
@Data
@NoArgsConstructor // Construtor sem parâmetros
public class ProductIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento
    private int id;

    private boolean deleted = false; // Indica se a entrada está excluída logicamente

    @NotNull(message = "O ID do produto não pode ser nulo") // Validação para o ID do produto
    @Column(name = "product_id", nullable = false)
    private int productId;

    @NotNull(message = "A quantidade não pode ser nula") // Validação para a quantidade
    @Column(nullable = false)
    private int quantity;

    @Column(name = "entry_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime entryDate = LocalDateTime.now(); // Define a data de entrada padrão como a hora atual

    @NotNull(message = "O produto é obrigatório") // Validação para o produto
    @ManyToOne // Várias entradas podem referenciar um produto
    @JoinColumn(name = "product_id", nullable = false, insertable = false, updatable = false)
    private Product product; // Referência ao produto
}
