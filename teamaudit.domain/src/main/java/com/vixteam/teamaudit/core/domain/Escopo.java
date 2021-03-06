package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table (name="ESCPO")
@AttributeOverride(name="id", column=@Column(name = "CD_ESCPO", columnDefinition = "CHAR(32)"))
public class Escopo extends BaseEntity {

    @NotNull
    @Size(max = 60)
    @Column(name="NM_ESCPO", length=60 , nullable=false)
    private String nome; 

    @NotNull
    @Size(max = 255)
    @Column(name="DS_ESCPO"  , length=255, nullable=false)
    private String descricao; 

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return getNome();
    }
}