package eu.fr.esic.formation.trans.produit.rest.dto;

import java.io.InputStream;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import eu.fr.esic.formation.trans.produit.rest.serializer.InputSerializer;

/**
 * 
 * @author CHZOME
 *
 */
public class ClientDTO {

	private String id;
	private String libelle;
	
	@JsonSerialize(using = InputSerializer.class)
	@JsonIgnore
	private InputStream in;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public InputStream getIn() {
		return in;
	}
	public void setIn(InputStream in) {
		this.in = in;
	}
	
	public String toString() {
		   return ToStringBuilder.reflectionToString(this);
		 }
}
