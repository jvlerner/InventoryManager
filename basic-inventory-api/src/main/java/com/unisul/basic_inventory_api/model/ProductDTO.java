package com.unisul.basic_inventory_api.model;

import java.util.List;

public class ProductDTO {
    private List<Product> products;
    private long totalItems;
    private int quantity; // Novo campo para quantidade

    // Getters e Setters
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
