package com.unisul.basic_inventory_api.repository;

import com.unisul.basic_inventory_api.model.ProductIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório para a entidade ProductIn.
 */
@Repository
public interface ProductInRepository extends JpaRepository<ProductIn, Integer> {
    // Aqui você pode adicionar métodos personalizados se necessário.
}
