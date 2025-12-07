package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduit;

    private String nomProduit;
    private String descriptionProduit;
    private Integer stock;
    private Double prixAchatProduit;
    private Double prixVenteProduit;

    @ManyToOne
    @JoinColumn(name = "idCategorieProduit")
    private CategorieProduit categorieProduit;
}