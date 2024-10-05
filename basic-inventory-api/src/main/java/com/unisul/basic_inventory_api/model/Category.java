package com.unisul.basic_inventory_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa uma categoria de produtos.
 */
@Entity
@Table(name = "categories") // Tabela de categorias
@Data
@NoArgsConstructor // Construtor sem parâmetros
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incremento
    private int id;

    private boolean deleted = false; // Indica se a categoria está excluída logicamente

    @NotBlank(message = "O nome não pode ser vazio") // Validação para o nome
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres") // Validação para o tamanho do nome
    private String name;

    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres") // Validação para o tamanho da descrição
    private String description;

}
