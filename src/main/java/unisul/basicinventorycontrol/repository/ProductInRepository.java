package unisul.basicinventorycontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unisul.basicinventorycontrol.model.ProductIn;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductInRepository extends JpaRepository<ProductIn, Integer> {
}