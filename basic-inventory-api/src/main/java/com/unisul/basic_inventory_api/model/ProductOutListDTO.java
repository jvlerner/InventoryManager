package com.unisul.basic_inventory_api.model;

import java.util.List;

public class ProductOutListDTO {
    private List<ProductOut> productsOut;
    private long totalItems;

    public ProductOutListDTO(List<ProductOut> productsOut, long totalItems) {
        this.productsOut = productsOut;
        this.totalItems = totalItems;
    }
    public List<ProductOut> getProducts() {
        return productsOut;
    }

    public void setProducts(List<ProductOut> productsOut) {
        this.productsOut = productsOut;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
