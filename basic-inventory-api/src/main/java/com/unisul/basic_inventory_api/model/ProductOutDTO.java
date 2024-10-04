package com.unisul.basic_inventory_api.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para representar uma saída de produto.
 */
@Data // Gera getters, setters, toString, equals e hashCode
@NoArgsConstructor // Construtor sem parâmetros
public class ProductOutDTO {

    private int id;
    private boolean deleted;
    private int quantity;
    private LocalDateTime exitDate;
    private Product product;

    public ProductOutDTO(int id, boolean deleted, int quantity, LocalDateTime exitDate, Product product) {
        this.id = id;
        this.deleted = deleted;
        this.quantity = quantity;
        this.exitDate = exitDate;
        this.product = product;
    }
}
