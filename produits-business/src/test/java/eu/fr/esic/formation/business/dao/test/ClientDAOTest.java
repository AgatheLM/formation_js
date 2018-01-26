package eu.fr.esic.formation.business.dao.test;

import java.util.Arrays;
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
import eu.fr.esic.formation.business.dao.IClientDAO;
import eu.fr.esic.formation.business.dao.IProduitDAO;
import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.entity.Produit;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={AppConfig.class})
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ClientDAOTest {

	@Resource(name=BusinessConstantes.EcolisConstantesDAO.CLIENT_DAO_KEY)
	private IClientDAO clientDAO  = null;
	@Resource(name=BusinessConstantes.EcolisConstantesDAO.PRODUIT_DAO_KEY)
	private IProduitDAO produitDAO = null;
	
	
	@Test
	public void testRecupAll(){
		List<Client> listeClient = this.clientDAO.findAll();
		for (Client client : listeClient) {
			System.out.println(client);
		}
		Assert.assertTrue(listeClient.size()>0);
	}
	@Test
	public void testRecupClientById(){
		Client client = this.clientDAO.getOne(1);
		Assert.assertNotNull(client);
		Assert.assertEquals(client.getNom(), "ZOME");
		System.out.println(client);
		List<Commande> listeCommandeClient = client.getCommandes();
		Assert.assertTrue(listeCommandeClient.size() == 2);
	}
	
	@Test
	public void testCreerClient(){
		Client client = new Client("Barack","OBAMA","4 Rue du Puisatier", "72010", "34289C", 1);
		Assert.assertNull(client.getIdClient());
		//Creation des produits associés
		Produit produit1 = new Produit("Megane", "RENAULT", "RENAULT MEGANE COUPE", new Double(16500), "REF_PRD_10");
		Produit produit2 = new Produit("ALPHA", "ROMEO", "ALPHA ROMEO SERIE 3", new Double(32000), "REF_PRD_11");
		List<Produit> produits = Arrays.asList(produit1,produit2);
		Commande commande = new Commande("CMD_07", 20);
		produit1.setCommande(commande);
		produit2.setCommande(commande);
		commande.setProduits(produits);
		commande.setClient(client);
		List<Commande> listeCommande = Arrays.asList(commande);
		client.setCommandes(listeCommande);
		client = this.clientDAO.save(client);
		Assert.assertNotNull(client.getIdClient());
		System.out.println(client);
	}
	
	@Test
	public void testSupprimerClient(){
		Client client = this.clientDAO.getOne(21);
		Assert.assertNotNull(client);
		System.out.println(client);
		this.clientDAO.delete(21);
	}
	
	
	@Test
	public void testRecupClientParIdProduit(){
		Client clientDuProduit = null;
		Produit produit = this.produitDAO.getOne(2);
		if (produit != null){
		    clientDuProduit = produit.getCommande().getClient();
		}
		Assert.assertNotNull(clientDuProduit);
		System.out.println(clientDuProduit);
	}
	
	@Test
	public void testRecupClientParSexe(){
		List<Client> listeClient = this.clientDAO.findBySexe(1);
		for (Client client : listeClient) {
			System.out.println(client);
		}
		Assert.assertTrue(listeClient.size() == 10);
	}
	
	
	
}
