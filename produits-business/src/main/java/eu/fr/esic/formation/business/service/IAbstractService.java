package eu.fr.esic.formation.business.service;

import java.util.List;

import eu.fr.esic.formation.business.exception.BusinessException;

public interface IAbstractService<E> {

	public E creerEntite(E entite) throws BusinessException;
	public E recupereEntiteParId(Integer id) throws BusinessException;
	public void metAJour(E entite) throws BusinessException;
	public List<E> recupereTous()  throws BusinessException;
	public void supprimerEntite(Integer id)  throws BusinessException;
	public long compteTous();
}
