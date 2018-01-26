package eu.fr.esic.formation.jersey.test;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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
}
