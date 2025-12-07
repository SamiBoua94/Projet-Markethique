package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVendeur;

    @Column(nullable = false, unique = true)
    private String emailVendeur;

    private String mdpVendeur;
    private String nomVendeur;
    private String prenomVendeur;
    private String genreVendeur;
    private LocalDate dateDeNaissanceVendeur;
    private String telephoneVendeur;
}