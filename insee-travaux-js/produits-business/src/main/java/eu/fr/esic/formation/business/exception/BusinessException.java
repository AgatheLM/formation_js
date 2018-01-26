package eu.fr.esic.formation.business.exception;

/**
 * Classe de gestion des exceptions
 * @author CHZOME
 *
 */
public class BusinessException extends Exception {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BusinessException(String message) {
		super(message);
	}
}
