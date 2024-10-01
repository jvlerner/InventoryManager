package unisul.basicinventorycontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unisul.basicinventorycontrol.model.ProductOut;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOutRepository extends JpaRepository<ProductOut, Integer> {
}