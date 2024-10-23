package com.unisul.basic_inventory_api.exception;

public class ProductOutException extends RuntimeException {
    public ProductOutException(String message) {
        super(message);
    }
}