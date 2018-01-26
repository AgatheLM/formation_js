package eu.fr.esic.formation.trans.chat.modele;

import java.io.Serializable;
import java.io.StringReader;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class SocketMessage implements Serializable, Decoder.Text<SocketMessage>, Encoder.Text<SocketMessage>{
	private static final long serialVersionUID = 3731292516477955554L;
	@NotNull 
    @Size(min = 3, max = 50, 
            message = "User must be between 1 and 50 characters")
	private String expediteur;
	@NotNull 
    @Size(min = 10, max = 50, 
            message = "Message must be between 1 and 50 characters")
	private String content;
	public SocketMessage() {
	}
	public SocketMessage(String expediteur, String content) {
		super();
		this.expediteur = expediteur;
		this.content = content;
	}
	@Override
	public void init(EndpointConfig arg0) {}
	@Override
	public String encode(SocketMessage arg0) throws EncodeException {
		 JsonObject jsonObject = Json.createObjectBuilder() 
	                .add("expediteur", arg0.getExpediteur()) 
	                .add("content", arg0.getContent()) 
	                .build(); 
	        return jsonObject.toString(); 
	}
	@Override
	public SocketMessage decode(String value) throws DecodeException {
		 try (JsonReader jsonReader = Json.createReader( 
	                new StringReader(value))) { 
	            JsonObject jsonObject = jsonReader.readObject(); 
	            expediteur = jsonObject.getString("expediteur"); 
	            content = jsonObject.getString("content"); 
	        } 
	        return this; 
	}
	@Override
	public boolean willDecode(String arg0) {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override 
    public String toString() { 
        return "SocketMessage{" + "user=" + this.expediteur + ", message=" + this.content + '}'; 
    } 
	
	public String getExpediteur() {
		return expediteur;
	}
	public void setExpediteur(String expediteur) {
		this.expediteur = expediteur;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
}
