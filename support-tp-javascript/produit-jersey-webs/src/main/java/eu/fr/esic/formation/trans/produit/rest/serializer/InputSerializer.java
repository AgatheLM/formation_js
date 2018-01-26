package eu.fr.esic.formation.trans.produit.rest.serializer;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.Base64Variants;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class InputSerializer extends StdSerializer<InputStream>{

	public InputSerializer(){
		super(InputStream.class);
	}
	
	protected InputSerializer(Class<InputStream> t) {
		super(t);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 5907082894346360781L;

	@Override
	public void serialize(InputStream arg0, JsonGenerator generator, SerializerProvider arg2) throws IOException {
		// TODO Auto-generated method stub
		generator.writeBinary(Base64Variants.MIME_NO_LINEFEEDS, arg0, -1);
		//arg2.setAttribute("in", arg0);
		//generator.writestart
		generator.writeObjectField("in", arg0);
		generator.writeEndObject();
		System.out.println("Json serializer");
	}

}
