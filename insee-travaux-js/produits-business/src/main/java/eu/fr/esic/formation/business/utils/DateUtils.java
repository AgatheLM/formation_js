package eu.fr.esic.formation.business.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class DateUtils {

	public static final String PATTERN = "dd/MM/yyyy";
	/**
	 * Transforme une chaine en date
	 * @param strDate
	 * @param strPattern
	 * @return
	 */
	public static Date stringToDate(String strDate){
		SimpleDateFormat formatter = new SimpleDateFormat(PATTERN);

        try {
            return formatter.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
	}
	
	/**
	 * Transforme une Date en String
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date){
		DateFormat dateFormat = new SimpleDateFormat(PATTERN);
		 return dateFormat.format(date); 
	}
}
