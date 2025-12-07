package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "panier_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PanierItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPanier")
    private Panier panier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProduit")
    private Produit produit;

    private Integer quantiteProduit;
}