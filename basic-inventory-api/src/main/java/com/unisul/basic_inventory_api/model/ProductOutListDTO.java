package com.unisul.basic_inventory_api.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
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

}
