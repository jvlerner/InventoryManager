package unisul.basicinventorycontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "categories") // tabela categorias
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto incremento
    private int id;

    private boolean deleted = false; // exclusão lógica padrão false

    @NotBlank // nome nao é nulo ou vazio
    @Size(max = 100) // tamanho maximo 100
    private String name;

    @Size(max = 255) // tamanho máximo 255
    private String description;

    public Category() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
