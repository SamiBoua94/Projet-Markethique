package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "localisation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Localisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLocalisation;

    private String adresseLocalisation;

    @OneToMany(mappedBy = "localisation")
    private Set<Boutique> boutiques;
}