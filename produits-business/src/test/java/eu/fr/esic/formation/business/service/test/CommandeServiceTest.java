package eu.fr.esic.formation.business.service.test;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import eu.fr.esic.formation.business.config.AppConfig;
import eu.fr.esic.formation.business.entity.Commande;
import eu.fr.esic.formation.business.exception.BusinessException;
import eu.fr.esic.formation.business.service.ICommandeService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={AppConfig.class})
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CommandeServiceTest {

	@Resource(name=BusinessConstantes.EcolisConstantesService.COMMANDE_SERVICE_KEY)
	private ICommandeService commandeService = null;
	
	@Test
	public void testRecupAll() throws BusinessException{
		List<Commande> results = this.commandeService.recupereTous();
		for (Commande commande : results) {
			System.out.println(commande);
		}
		Assert.assertTrue(results.size()>0);
	}
}
