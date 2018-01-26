package eu.fr.esic.formation.business.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eu.fr.esic.formation.business.exception.BusinessException;
import eu.fr.esic.formation.business.service.IAbstractService;

public abstract class  AbstractServiceImpl<E, DAO extends JpaRepository<E, Integer>> implements IAbstractService<E> {

	@Override
	public E creerEntite(E entite) throws BusinessException {
		return this.getCurrentDAO().save(entite);
	}

	@Override
	public void metAJour(E entite) throws BusinessException {
		this.getCurrentDAO().saveAndFlush(entite);
	}

	@Override
	public List<E> recupereTous() throws BusinessException {
		return this.getCurrentDAO().findAll();
	}

	public E recupereEntiteParId(Integer id) throws BusinessException{
		return this.getCurrentDAO().findOne(id);
	}
	
	@Override
	public void supprimerEntite(Integer id) throws BusinessException {
		this.getCurrentDAO().delete(id);	
	}
	@Override
	public long compteTous() {
		return this.getCurrentDAO().count();
	}
	
	public abstract DAO getCurrentDAO();

}
