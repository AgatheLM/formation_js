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
import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.exception.BusinessException;
import eu.fr.esic.formation.business.service.IClientService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={AppConfig.class})
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ClientServiceTest {

	@Resource(name=BusinessConstantes.EcolisConstantesService.CLIENT_SERVICE_KEY)
	private IClientService clientService = null;
	
	@Test
	public void testRecupAll() throws BusinessException{
		List<Client> results = this.clientService.recupereTous();
		for (Client client : results) {
			System.out.println(client);
		}
		Assert.assertTrue(results.size()>0);
	}
	
	@Test
	public void testRecupParNom() throws BusinessException{
		List<Client> results = this.clientService.recupereParNom("HE");
		for (Client client : results) {
			System.out.println(client);
		}
		Assert.assertTrue(results.size()>0);
	}
}
