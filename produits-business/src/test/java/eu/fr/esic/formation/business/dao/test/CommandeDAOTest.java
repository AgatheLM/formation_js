package eu.fr.esic.formation.business.dao.test;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase.Replace;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import eu.fr.esic.formation.business.config.AppConfig;
import eu.fr.esic.formation.business.dao.ICommandeDAO;
import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.entity.Produit;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={AppConfig.class})
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CommandeDAOTest {

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.COMMANDE_DAO_KEY)
	private ICommandeDAO commandeDAO  = null;
	@Test
	public void testRecupAll(){
		List<Commande> listeCommande = this.commandeDAO.findAll();
		for (Commande commande : listeCommande) {
			System.out.println(commande);
		}
		Assert.assertTrue(listeCommande.size() == 13);
	}
	@Test
	public void testRecupCommandeById(){
		Commande commande = this.commandeDAO.getOne(5);
		Assert.assertNotNull(commande);
		Assert.assertEquals(commande.getNumCommande(), "CMD_05");
		System.out.println(commande);
		List<Produit> listeProduit = commande.getProduits();
		Assert.assertTrue(listeProduit.size() == 9);
	}
	
	
	@Test
	public void testSupprimerCommande(){
		Commande commande = this.commandeDAO.getOne(21);
		Assert.assertNotNull(commande);
		System.out.println(commande);
		this.commandeDAO.delete(21);
	}
}
