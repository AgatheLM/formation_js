package eu.fr.esic.formation.business.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesDAO.CLIENT_DAO_KEY)
public interface IClientDAO extends JpaRepository<Client,Integer>{

	/**
	 * Recupère les clients par le sexe
	 * @param sexe : Entier representant le sexe (1= Homme, 2 = Femme)
	 * @return Liste de Clients correspondant au sexe
	 */
	public List<Client> findBySexe(int sexe);
	
	/**
	 * Recupère tous les clients dont le nom contient le paramètre
	 * @param nom : Nom pour lequel on recherche les clients associés
	 * @return
	 */
	public List<Client> findByNomContainingIgnoreCase(String nom);
}
