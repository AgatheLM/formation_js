package eu.fr.esic.formation.business.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.entity.Produit;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesDAO.PRODUIT_DAO_KEY)
public interface IProduitDAO extends JpaRepository<Produit,Integer>{

	/**
	 * Retourne la liste des produits dont le prix est superieur au parametre
	 * @param prixUnitaireMin : Parametre pour lequel on cherche les produits plus couteux
	 * @return
	 */
	@Query(value="SELECT p FROM Produit p where p.prixUnitaire >:paramPrixU")
	public List<Produit> findProduitParPrixUnitaire(@Param("paramPrixU") double prixUnitaireMin);
	/**
	 * Recupère les produits command�s par les habitants d'une certaine ville, et en quantité sup au param
	 * @param qtePlancher : Quantité min d'achat de produits 
	 * @param debutCodeP : Debut du code postal des acquereurs des produits
	 * @return
	 */
	@Query(value="SELECT distinct p FROM Produit p join p.commande cmd where cmd.quantite >=:paramQuantite and SUBSTRING(cmd.client.codePostal,1,2)=:paramDebutCodeP")
	public List<Produit> findProduitParVilleEtQteSup(@Param("paramQuantite") Integer qtePlancher,@Param("paramDebutCodeP") String debutCodeP);
	/**
	 * Renvoie le produit le plus couteux pour un client donné
	 * @param idClient : Identifiant du client dont
	 * @return : Un produit
	 */
	@Query(value="SELECT prd1 FROM Produit prd1 where prd1.prixUnitaire = (select max(prd2.prixUnitaire) from Produit prd2 where prd2.commande.client.idClient = :paramIdClient)")
	public Produit findProduitCherParClient(@Param("paramIdClient") Integer idClient);
	
}
