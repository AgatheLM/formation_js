package eu.fr.esic.formation.business.service.impl;

import javax.annotation.Resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.dao.IProduitDAO;
import eu.fr.esic.formation.business.entity.Produit;
import eu.fr.esic.formation.business.service.IProduitService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesService.PRODUIT_SERVICE_KEY)
public class ProduitServiceImpl extends AbstractServiceImpl<Produit, JpaRepository<Produit,Integer>>  implements IProduitService{

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.PRODUIT_DAO_KEY)
	private  IProduitDAO produitDAO = null;
	
	@Override
	public IProduitDAO getCurrentDAO() {
		return this.produitDAO;
	}
}
