package eu.fr.esic.formation.business.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;


/**
 * The persistent class for the CLIENT database table.
 * 
 */
@Entity
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_CLIENT")
	private Integer idClient;

	private String adresse;

	@Column(name="CODE_POSTAL")
	private String codePostal;

	private String nom;

	@Column(name="NUM_CLIENT")
	private String numClient;

	private String prenom;

	private int sexe;
	
	//bi-directional many-to-one association to Produit
	@OneToMany(mappedBy="client", cascade={CascadeType.ALL},fetch = FetchType.EAGER)
	private List<Commande> commandes;

	public Client() {
	}
	
	public Client(String nom,String prenom,String adresse,String codeP,String numCli,int sex) {
		this.nom = nom;
		this.prenom = prenom;
		this.adresse = adresse;
		this.codePostal = codeP;
		this.numClient = numCli;
		this.sexe = sex;
	}

	public Integer getIdClient() {
		return this.idClient;
	}

	public void setIdClient(Integer idClient) {
		this.idClient = idClient;
	}

	public String getAdresse() {
		return this.adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getCodePostal() {
		return this.codePostal;
	}

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getNom() {
		return this.nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getNumClient() {
		return this.numClient;
	}

	public void setNumClient(String numClient) {
		this.numClient = numClient;
	}

	public String getPrenom() {
		return this.prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getSexe() {
		return this.sexe;
	}

	public void setSexe(int sexe) {
		this.sexe = sexe;
	}

	public List<Commande> getCommandes() {
		return commandes;
	}

	public void setCommandes(List<Commande> commandes) {
		this.commandes = commandes;
	}
	
	public String toString(){
		String genre = this.sexe == 1 ? "M. " : "Mme. ";
		return genre + this.nom + " " + this.prenom + " [NUM_CLIENT :"+this.numClient+"] Habite "+this.adresse;
	}

}