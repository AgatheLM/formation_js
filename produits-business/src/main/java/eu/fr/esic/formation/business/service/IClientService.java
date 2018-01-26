package eu.fr.esic.formation.business.service;

import java.util.List;

import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.exception.BusinessException;

public interface IClientService extends IAbstractService<Client>{

	/**
	 * Recupère les clients par leur sexe
	 * @param sexe : identifiant du sexe
	 * @return
	 */
	public List<Client> recupClientParSexe(int sexe);
	
	/**
	 * Recupère tous les clients dont le nom contient le paramètre
	 * @param nom : Nom pour lequel on recherche les clients associés
	 * @return
	 */
	public List<Client> recupereParNom(String nom) throws BusinessException;
}
