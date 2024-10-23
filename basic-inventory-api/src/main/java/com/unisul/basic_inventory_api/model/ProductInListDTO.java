package com.unisul.basic_inventory_api.model;

import java.util.List;

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

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
