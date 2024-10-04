package com.unisul.basic_inventory_api.model;

import java.util.List;

public class CategoryDTO {
    private long totalItems;
    private List<Category> categories;

    // Getters and Setters
    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
