package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "commande")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCommande;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idAcheteur")
    private Acheteur acheteur;

    @OneToOne
    @JoinColumn(name = "idPanier")
    private Panier panier;

    private LocalDateTime dateCommande;
    private Double montantTotal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idLocalisation")
    private Localisation adresseLivraison;
}