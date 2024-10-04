package com.unisul.basic_inventory_api.repository;

import com.unisul.basic_inventory_api.model.ProductOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório para a entidade ProductOut.
 */
@Repository
public interface ProductOutRepository extends JpaRepository<ProductOut, Integer> {
    // Aqui você pode adicionar métodos personalizados se necessário.
}
