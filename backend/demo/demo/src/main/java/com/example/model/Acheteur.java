package com.example.model;


import com.example.model.Commande;
import com.example.model.Panier;
import com.example.model.Produit;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "acheteur")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Acheteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAcheteur;

    @Column(nullable = false, unique = true)
    private String emailAcheteur;

    @Column(nullable = false, unique = true)
    private String mdpAcheteur;

    @Column(nullable = false)
    private String nomAcheteur;

    @Column(nullable = false)
    private String prenomAcheteur;

    @Column(nullable = false)
    private String genreAcheteur;

    @Column(nullable = false)
    private LocalDate dateDeNaissanceAcheteur;

    @Column(nullable = false)
    private String telephoneAcheteur;

    @OneToOne(mappedBy = "acheteur", cascade = CascadeType.ALL)
    private Panier panier;

    @OneToMany(mappedBy = "acheteur")
    private Set<Commande> commandes;

    @ManyToMany
    @JoinTable(
            name = "likes",
            joinColumns = @JoinColumn(name = "idAcheteur"),
            inverseJoinColumns = @JoinColumn(name = "idProduit")
    )

    private Set<Produit> likes;
}