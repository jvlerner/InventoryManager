package com.unisul.basic_inventory_api.model;

import java.util.List;

public class CategoryDTO {
    private List<Category> categories;
    private long totalItems;

    public CategoryDTO(List<Category> categories, long totalItems) {
        this.categories = categories;
        this.totalItems = totalItems;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
