package com.unisul.basic_inventory_api.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para representar uma entrada de produto.
 */
@Data // Gera getters, setters, toString, equals e hashCode
@NoArgsConstructor
public class ProductInDTO {

    private int id;
    private boolean deleted;
    private int quantity;
    private LocalDateTime entryDate;
    private Product product;


    public ProductInDTO(int id, boolean deleted, int quantity, LocalDateTime entryDate, Product product) {
        this.id = id;
        this.deleted = deleted;
        this.quantity = quantity;
        this.entryDate = entryDate;
        this.product = product;
    }
}
