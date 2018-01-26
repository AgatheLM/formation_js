package eu.fr.esic.formation.jersey.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import eu.fr.esic.formation.trans.produit.rest.dto.ClientDTO;

@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(classes={AppConfig.class})
//@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ClientRestTest {

	@Test
	public void testGetJson(){
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpGet getRequest = new HttpGet("http://localhost:8082/rest/clients/");
		getRequest.addHeader("accept", "application/json");

		try {
			HttpResponse response = httpClient.execute(getRequest);
			System.out.println("Response : "+response);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testPostJson() throws FileNotFoundException{
		try {
			File initialFile = new File("D:/Documents-Perso/CERTIFICAT_PACS_ZOME.pdf");
		    InputStream targetStream = new FileInputStream(initialFile);
			
			ClientDTO clientDTO = new ClientDTO();
			clientDTO.setIn(targetStream);
			clientDTO.setLibelle("REST Client Test");
			TestRestTemplate restTemplate = new TestRestTemplate();
			HttpHeaders headers = new HttpHeaders();
			// Sending multipart/form-data
			//headers.setContentType(MediaType.MULTIPART_ FORM_DATA);
			//targetStream.
			String url = initialFile.toURL().toString();
			HttpEntity<ClientDTO> entity = new HttpEntity<ClientDTO>(clientDTO, headers);

			ResponseEntity<ClientDTO> response = restTemplate.exchange("http://localhost:8082/rest/clients/",HttpMethod.POST, entity, ClientDTO.class);
			System.out.println("Response :" + response);
			//String actual = response.getHeaders().get(HttpHeaders.LOCATION).get(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
		
		@Test
		public void testPostJson2() throws FileNotFoundException{
			TestRestTemplate restTemplate = new TestRestTemplate();
			File initialFile = new File("D:/Documents-Perso/CERTIFICAT_PACS_ZOME.pdf");
		    InputStream targetStream = new FileInputStream(initialFile);
			
			ClientDTO clientDTO = new ClientDTO();
			clientDTO.setIn(targetStream);
			clientDTO.setLibelle("REST Client Test");
			final HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

		    final String url = "http://localhost:8082/rest/clients/";
		    MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
		    parameters.set("Content-Type","multipart/form-data");
		    parameters.add("file", targetStream);

		    final HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<MultiValueMap<String, Object>>(
		            parameters, headers);
		    final ResponseEntity<ClientDTO> response = restTemplate.exchange(url,
		                HttpMethod.POST, httpEntity, ClientDTO.class);
		    System.out.println("Response :" + response);
		
    }
	
}
