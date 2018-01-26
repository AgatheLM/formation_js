package eu.fr.esic.formation.business.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Repository(BusinessConstantes.EcolisConstantesDAO.COMMANDE_DAO_KEY)
public interface ICommandeDAO extends JpaRepository<Commande,Integer>{

}
