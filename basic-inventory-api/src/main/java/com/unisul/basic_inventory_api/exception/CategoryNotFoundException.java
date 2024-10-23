package com.unisul.basic_inventory_api.exception;

// Exception classes
public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}