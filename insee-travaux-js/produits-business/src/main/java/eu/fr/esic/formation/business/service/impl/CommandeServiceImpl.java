package eu.fr.esic.formation.business.service.impl;

import javax.annotation.Resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.dao.ICommandeDAO;
import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.service.ICommandeService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesService.COMMANDE_SERVICE_KEY)
public class CommandeServiceImpl extends AbstractServiceImpl<Commande, JpaRepository<Commande,Integer>>  implements ICommandeService{

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.COMMANDE_DAO_KEY)
	private  ICommandeDAO commandeDAO = null;
	
	@Override
	public ICommandeDAO getCurrentDAO() {
		return this.commandeDAO;
	}
}
