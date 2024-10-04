package com.unisul.basic_inventory_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa um produto no sistema.
 */
@Entity
@Table(name = "products") // Tabela de produtos
@Data // Gera getters, setters, toString, equals e hashCode
@NoArgsConstructor // Construtor sem parâmetros
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento
    private int id;

    private boolean deleted = false; // Indica se o produto está excluído logicamente

    @NotBlank(message = "O nome não pode ser nulo ou vazio") // Validação para o nome
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres") // Validação para o tamanho do nome
    private String name;

    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres") // Validação para o tamanho da descrição
    private String description;

    @NotNull(message = "O preço não pode ser nulo") // Validação para o preço
    @DecimalMin(value = "0", message = "O preço deve ser maior ou igual a zero.") // O preço deve ser maior ou igual a zero
    private double price;

    @NotNull(message = "A quantidade não pode ser nula") // Validação para a quantidade
    @Column(columnDefinition = "int default 0") // Padrão para quantidade = 0
    private int quantity = 0;

    @NotNull(message = "A categoria é obrigatória") // Validação para a categoria
    @ManyToOne(fetch = FetchType.EAGER) // Vários produtos podem pertencer a uma categoria
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_category")) // Chave estrangeira
    private Category category;

    /**
     * Verifica se o produto está disponível em estoque.
     *
     * @return true se a quantidade for maior que zero, caso contrário false.
     */
    public boolean isAvailable() {
        return quantity > 0;
    }

    @Override
    public String toString() {
        return String.format("Product[id=%d, name='%s', price=%.2f, quantity=%d]", id, name, price, quantity);
    }
}
