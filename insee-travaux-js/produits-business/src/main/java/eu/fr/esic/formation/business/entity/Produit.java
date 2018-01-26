package eu.fr.esic.formation.business.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the PRODUIT database table.
 * SELECT cmd.produits FROM Commande cmd where cmd.quantite >=:paramQuantite and SUBSTRING(cmd.client.codePostal,1,2)=:paramDebutCodeP
 */
@Entity
public class Produit implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_PRODUIT")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idProduit;

	private String gamme;

	private String libelle;

	private String marque;

	@Column(name="PRIX_UNITAIRE")
	private Double prixUnitaire;

	@Column(name="REF_PRODUIT")
	private String refProduit;

	//bi-directional many-to-one association to Commande
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ID_COMMANDE")
	private Commande commande;

	public Produit() {
	}
	
	public Produit(String gamme,String marque,String lib,Double prixU,String refP) {
		this.gamme = gamme;
		this.marque = marque;
		this.libelle = lib;
		this.prixUnitaire = prixU;
		this.refProduit = refP;
	}

	public Integer getIdProduit() {
		return this.idProduit;
	}

	public void setIdProduit(Integer idProduit) {
		this.idProduit = idProduit;
	}

	public String getGamme() {
		return this.gamme;
	}

	public void setGamme(String gamme) {
		this.gamme = gamme;
	}

	public String getLibelle() {
		return this.libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getMarque() {
		return this.marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

	public Double getPrixUnitaire() {
		return this.prixUnitaire;
	}

	public void setPrixUnitaire(Double prixUnitaire) {
		this.prixUnitaire = prixUnitaire;
	}

	public String getRefProduit() {
		return this.refProduit;
	}

	public void setRefProduit(String refProduit) {
		this.refProduit = refProduit;
	}

	public Commande getCommande() {
		return this.commande;
	}

	public void setCommande(Commande commande) {
		this.commande = commande;
	}
	
	public String toString(){
		return "Produit [REF_PRODUIT : "+this.refProduit+"]" + " a pour Libelle :"+this.libelle;
	}

}