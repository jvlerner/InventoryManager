package com.unisul.basic_inventory_api.model;

import java.util.List;

public class ProductListDTO {
    private List<Product> products;
    private long totalItems;

    public ProductListDTO(List<Product> products, long totalItems) {
        this.products = products;
        this.totalItems = totalItems;
    }
    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
    public long getTotalItems() {
        return totalItems;
    }
    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}