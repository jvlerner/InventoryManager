package com.unisul.basic_inventory_api.repository;

import com.unisul.basic_inventory_api.model.Product;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT p, COUNT(p) OVER() AS totalItems " +
            "FROM Product p LEFT JOIN p.category c " +
            "WHERE (:search IS NULL OR p.name LIKE %:search% OR c.name LIKE %:search%) " +
            "AND p.deleted = false")
    List<Tuple> findProductsAndCount(@Param("search") String search, Pageable pageable);

    @Query(value = "SELECT p, COUNT(p) OVER() AS totalItems " +
            "FROM Product p LEFT JOIN p.category c " +
            "WHERE p.quantity < :quantity AND p.deleted = false " +
            "AND (c.deleted = false) " +
            "AND (:search IS NULL OR p.name LIKE %:search% OR c.name LIKE %:search%)")
    List<Tuple> findProductsWithCategoriesLowStock(@Param("search") String search,
                                                   @Param("quantity") int quantity,
                                                   Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name = :name AND p.deleted = false")
    Optional<Product> findByName(@Param("name") String name);
}
