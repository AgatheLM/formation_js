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
import eu.fr.esic.formation.business.dao.IProduitDAO;
import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.entity.Produit;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={AppConfig.class})
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ProduitDAOTest {

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.PRODUIT_DAO_KEY)
	private IProduitDAO produitDAO  = null;
	@Resource(name=BusinessConstantes.EcolisConstantesDAO.COMMANDE_DAO_KEY)
	private ICommandeDAO commandeDAO  = null;
	@Test
	public void testRecupAll(){
		List<Produit> listeProduit = this.produitDAO.findAll();
		for (Produit produit : listeProduit) {
			System.out.println(produit);
		}
		Assert.assertTrue(listeProduit.size() >0);
	}
	
	
	@Test
	public void testPrixSup15000(){
		List<Produit> listeProduit = this.produitDAO.findProduitParPrixUnitaire(15000);
		for (Produit produitCourant : listeProduit) {
			System.out.println(produitCourant);
		}
		Assert.assertTrue(listeProduit.size() == 11);
	}
	
	@Test
	public void testCreerProduitPourUneCommande(){
		int nbProduitAvant = this.produitDAO.findAll().size();
		Commande commandeDuProduit = this.commandeDAO.getOne(5);
		Produit produitACreer = new Produit("HYUNDAI ", "NISSAN ", "NISSAN HYUNDAI Serie 2 ", new Double(23480) , "REF_PRD-CMD_10 ");
		produitACreer.setCommande(commandeDuProduit);
		this.produitDAO.save(produitACreer);
		int nbProduitApres = this.produitDAO.findAll().size();
		Assert.assertTrue(nbProduitAvant + 1 == nbProduitApres);
	}
	
	@Test
	public void testFindProduitParVilleEtQuantite(){
		List<Produit> listeProduit = this.produitDAO.findProduitParVilleEtQteSup(5, "75");
		for (Produit produit : listeProduit) {
			System.out.println(produit);
		}
		Assert.assertTrue(listeProduit.size() > 1);
	}
	
	@Test
	public void testFindProduitCherParClient(){
		Produit produitCherchePourClient = this.produitDAO.findProduitCherParClient(1);
			System.out.println(produitCherchePourClient);
		Assert.assertTrue(produitCherchePourClient != null);
		Assert.assertEquals(produitCherchePourClient.getPrixUnitaire(), new Double(15000));
	}
}
