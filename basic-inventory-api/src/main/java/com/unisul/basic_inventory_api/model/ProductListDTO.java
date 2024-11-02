package com.unisul.basic_inventory_api.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductListDTO {
    private List<Product> products;
    private long totalItems;


    public ProductListDTO(List<Product> products, long totalItems) {
        this.products = products;
        this.totalItems = totalItems;
    }
}
