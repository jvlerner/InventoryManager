package com.unisul.basic_inventory_api.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductInListDTO {
    private List<ProductIn> productsIn;
    private long totalItems;

    public ProductInListDTO(List<ProductIn> productsIn, long totalItems) {
        this.productsIn = productsIn;
        this.totalItems = totalItems;
    }
    public List<ProductIn> getProducts() {
        return productsIn;
    }

    public void setProducts(List<ProductIn> productsIn) {
        this.productsIn = productsIn;
    }

}
