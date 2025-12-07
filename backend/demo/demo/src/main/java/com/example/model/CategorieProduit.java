package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategorieProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategorieProduit;

    private String libelleCategorieProduit;
}