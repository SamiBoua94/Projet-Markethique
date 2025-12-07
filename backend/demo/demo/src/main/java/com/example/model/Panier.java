package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "panier")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPanier;

    @OneToOne
    @JoinColumn(name = "idAcheteur")
    private Acheteur acheteur;

    @OneToMany(mappedBy = "panier", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PanierItem> items;
}