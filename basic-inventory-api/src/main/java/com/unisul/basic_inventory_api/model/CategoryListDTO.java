package com.unisul.basic_inventory_api.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CategoryListDTO {
    private List<Category> categories;
    private long totalItems;

    public CategoryListDTO(List<Category> categories, long totalItems) {
        this.categories = categories;
        this.totalItems = totalItems;
    }
}
