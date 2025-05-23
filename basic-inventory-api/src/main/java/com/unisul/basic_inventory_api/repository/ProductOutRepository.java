package com.unisul.basic_inventory_api.repository;

import com.unisul.basic_inventory_api.model.ProductOut;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para a entidade ProductOut.
 */
@Repository
public interface ProductOutRepository extends JpaRepository<ProductOut, Integer> {

    @Query(value = "SELECT p, COUNT(p) OVER() AS totalItems " +
            "FROM ProductOut p LEFT JOIN p.product i " + // Use product instead of productId
            "WHERE (:search IS NULL OR p.product.name LIKE %:search%) " + // Assuming product has a name field
            "AND p.deleted = false",
            countQuery = "SELECT COUNT(p) FROM ProductOut p " +
                    "WHERE (:search IS NULL OR p.product.name LIKE %:search%) " +
                    "AND p.deleted = false")
    List<Tuple> findProductsOutAndCount(@Param("search") String search, Pageable pageable);

    @Query("SELECT COUNT(p) FROM ProductOut p WHERE p.deleted = false")
    long countAllProductsOut();

    @Query("SELECT p FROM ProductOut p WHERE p.product.name = :name AND p.deleted = false")
    Optional<ProductOut> findByName(@Param("name") String name);
}
