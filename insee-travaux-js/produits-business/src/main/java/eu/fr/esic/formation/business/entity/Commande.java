package eu.fr.esic.formation.business.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the COMMANDE database table.
 * 
 */
@Entity
public class Commande implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_COMMANDE")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idCommande;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ID_CLIENT")
	private Client client;

	@Column(name="NUM_COMMANDE")
	private String numCommande;
	
	@Column(name="QUANTITE")
	private Integer quantite;

	//bi-directional many-to-one association to Produit
	@OneToMany(mappedBy="commande", cascade={CascadeType.ALL})
	private List<Produit> produits;

	public Commande() {
	}
	
	public Commande(String numC,int qte) {
		this.numCommande = numC;
		this.quantite = qte;
		this.date = new Date();
	}

	public Integer getIdCommande() {
		return this.idCommande;
	}

	public void setIdCommande(Integer idCommande) {
		this.idCommande = idCommande;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNumCommande() {
		return this.numCommande;
	}

	public void setNumCommande(String numCommande) {
		this.numCommande = numCommande;
	}

	public Integer getQuantite() {
		return this.quantite;
	}

	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
	}

	public List<Produit> getProduits() {
		return this.produits;
	}

	public void setProduits(List<Produit> produits) {
		this.produits = produits;
	}

	public Produit addProduit(Produit produit) {
		getProduits().add(produit);
		produit.setCommande(this);

		return produit;
	}

	public Produit removeProduit(Produit produit) {
		getProduits().remove(produit);
		produit.setCommande(null);

		return produit;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
	
	public String toString(){
		return "NUM_COMMANDE : "+this.numCommande + " QUANTITE : "+this.quantite;
	}

}