package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;


@Entity
@Table(name = "boutique")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Boutique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBoutique;

    private String libelleBoutique;

    private String descriptionBoutique;

    @OneToMany(mappedBy = "boutique", cascade = CascadeType.ALL)
    private Set<Produit> produits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idLocalisation")
    private Localisation localisation;

    @OneToOne
    @JoinColumn(name = "idVendeur")
    private Vendeur vendeur; // gere
}