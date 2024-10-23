package com.unisul.basic_inventory_api.exception;

public class ProductOutNotFoundException extends RuntimeException {
    public ProductOutNotFoundException(String message) {
        super(message);
    }
}