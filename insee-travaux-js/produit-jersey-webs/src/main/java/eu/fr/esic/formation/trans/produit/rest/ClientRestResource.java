package eu.fr.esic.formation.trans.produit.rest;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import eu.fr.esic.formation.business.entity.Client;
import eu.fr.esic.formation.business.exception.BusinessException;
import eu.fr.esic.formation.business.service.IClientService;
import eu.fr.esic.formation.business.utils.BusinessConstantes;

@Path("/clients/")
@Component
public class ClientRestResource {

	Logger log = Logger.getLogger(ClientRestResource.class);
	@Resource(name=BusinessConstantes.EcolisConstantesService.CLIENT_SERVICE_KEY)
	private IClientService userService = null;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Client> getAllClient() {
		try {
			List<Client> results = userService.recupereTous();
			//On ne remonte pas les commandes liées à un Client pour eviter l'erreur "Infinite Loop"
			for (Client client : results) {
				client.setCommandes(null);
			}
			return results;
		} catch (BusinessException e) {
			log.error(e.getMessage());
		}
		return null;
	}
	
	@GET
	@Path("search/{searchKey}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Client> getAllClientByName(@PathParam("searchKey") String searchName) {
		try {
			List<Client> results = userService.recupereParNom(searchName);
			//On ne remonte pas les commandes liées à un Client pour eviter l'erreur "Infinite Loop"
			for (Client client : results) {
				client.setCommandes(null);
			}
			return results;
		} catch (BusinessException e) {
			log.error(e.getMessage());
		}
		return null;
	}

	@GET 
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Client findById(@PathParam("id") String id) {
		System.out.println("findById " + id);
		try {
			Client searchCustomer = userService.recupereEntiteParId(Integer.parseInt(id));
			if (searchCustomer != null){
				searchCustomer.setCommandes(null);
			}
			return searchCustomer;
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			return null;
		} catch (BusinessException e) {
			log.error(e.getMessage());
			return null;
		}
	}

		@POST
		@Consumes( MediaType.APPLICATION_JSON)
		@Produces({ MediaType.APPLICATION_JSON})
		public Client createCustomer(Client client) {
			System.out.println("Client en cours de creation " + client);
			try {
				Client searchCustomer = userService.creerEntite(client);
				return searchCustomer;
			} catch (BusinessException e) {
				log.error(e.getMessage());
				return null;
			}
		}
		
		@PUT
		@Path("{id}")
		@Consumes( MediaType.APPLICATION_JSON)
		public void updateCustomer(Client client) {
			System.out.println("Client en cours de MAJ " + client);
			try {
				this.userService.metAJour(client);
			} catch (BusinessException e) {
				log.error(e.getMessage());
			}
		}	
		
		@DELETE
		@Path("{id}")
		@Consumes( MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public List<Client> deleteCustomer(@PathParam("id") Integer customerId) {
			System.out.println("Client en cours de suppression :" + customerId);
			try {
				this.userService.supprimerEntite(customerId);
				return this.getAllClient();
			} catch (BusinessException e) {
				log.error(e.getMessage());
			}
			return new ArrayList<Client>();
		}	

//	@POST
//	@Consumes( MediaType.APPLICATION_JSON)
//	@Produces({ MediaType.APPLICATION_JSON})
//	public ClientDTO createDTOCustomer(ClientDTO client) {
//		System.out.println("Client en cours de creation " + client);
//		client.setId(""+Math.random());
//		System.out.println("Client reçu :" + client);
//		return client;
//	}

}
