package eu.fr.esic.formation.trans.chat.controller;

import java.io.IOException;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.inject.Singleton;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import eu.fr.esic.formation.trans.chat.modele.SocketMessage;

@ServerEndpoint(value ="/main", encoders = {SocketMessage.class}, decoders = {SocketMessage.class})
@Singleton
public class ChatController {

	/**
     * Logger 
     */ 
    private static final Logger logger = Logger.getLogger(ChatController.class.getName()); 
    
	private SocketMessage lastSocketMessage;
	public ChatController() {
		System.out.println("Class loaded " + this.getClass());
	}

	@OnOpen
	public void onOpen(Session session) {
		if (this.lastSocketMessage == null){
			this.lastSocketMessage = new SocketMessage("AdminServer","Bienvenu au Chat connexion...");
		}
		System.out.printf("Session opened, id: %s%n", session.getId());
		try {
			try {
				session.getBasicRemote().sendObject(this.lastSocketMessage);
			} catch (EncodeException e) {
				e.printStackTrace();
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	@OnMessage
	public void onMessage(@Valid SocketMessage message, Session session) {
		this.lastSocketMessage = message;
		logger.log(Level.INFO, "Received message {0} from peer {1}",new Object[]{message, session}); 
		Set<Session> sessionList = session.getOpenSessions();
		for (Session currentSession : sessionList) {
			try {
				currentSession.getBasicRemote().sendObject(message);
			} catch (IOException | EncodeException ex) {
				 logger.log(Level.SEVERE, "Error sending message", ex); 
				ex.printStackTrace();
			}
		}
	}

	@OnError
	public void onError(Session session,Throwable error) {
		try { 
            if (error.getCause() instanceof ConstraintViolationException) { 
                // Just report the first validation problem. 
                JsonObject jsonObject = Json.createObjectBuilder() 
                        .add("error", 
                                ((ConstraintViolationException) error.getCause()) 
                                .getConstraintViolations().iterator().next() 
                                .getMessage()) 
                        .build(); 
                session.getBasicRemote().sendText(jsonObject.toString()); 
            } else { 
                logger.log(Level.SEVERE, null, error); 
            } 
        } catch (IOException ex) { 
            logger.log(Level.SEVERE, null, ex); 
        } 
		error.printStackTrace();
	}

	@OnClose
	public void onClose(Session session) {
		logger.log(Level.INFO, "Closed session: {0}", session); 
	}
}