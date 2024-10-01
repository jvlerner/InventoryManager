package unisul.basicinventorycontrol.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import unisul.basicinventorycontrol.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p JOIN FETCH p.category " +
            "WHERE (lower(p.name) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(p.description) LIKE lower(concat('%', :search, '%'))) " +
            "AND p.deleted = false " +
            "ORDER BY p.id ASC")
    List<Product> findProductsWithCategories(@Param("search") String search, PageRequest pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND p.deleted = false")
    int countProductsBySearch(@Param("search") String search);

    @Query("SELECT p FROM Product p JOIN FETCH p.category " +
            "WHERE (lower(p.name) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(p.description) LIKE lower(concat('%', :search, '%'))) " +
            "AND p.deleted = false AND p.quantity <= 10 " +
            "ORDER BY p.quantity ASC")
    List<Product> findProductsWithCategoriesLowStock(@Param("search") String search, PageRequest pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND p.deleted = false AND p.quantity <= 10")
    int countProductsBySearchLowStock(@Param("search") String search);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.deleted = :deleted WHERE p.id = :id")
    void updateProductDeletedStatus(@Param("id") int id, @Param("deleted") boolean deleted);

}