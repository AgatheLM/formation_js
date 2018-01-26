package eu.fr.esic.formation.business.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.dao.IClientDAO;
import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.exception.BusinessException;
import eu.fr.esic.formation.business.service.IClientService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesService.CLIENT_SERVICE_KEY)
public class ClientServiceImpl extends AbstractServiceImpl<Client, JpaRepository<Client,Integer>>  implements IClientService{

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.CLIENT_DAO_KEY)
	private IClientDAO clientDAO = null;

	@Override
	public IClientDAO getCurrentDAO() {
		return this.clientDAO;
	}

	@Override
	public List<Client> recupClientParSexe(int sexe) {
		return this.clientDAO.findBySexe(sexe);
	}

	@Override
	public List<Client> recupereParNom(String nom) throws BusinessException{
		// TODO Auto-generated method stub
		return this.clientDAO.findByNomContainingIgnoreCase(nom);
	}
}
