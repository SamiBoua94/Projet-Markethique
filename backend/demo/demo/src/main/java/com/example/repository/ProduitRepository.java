package com.example.repository;


import com.example.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByNameProduitContainingIgnoreCase(String term);
}