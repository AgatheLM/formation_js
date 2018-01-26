package eu.fr.esic.formation.trans.produit.config;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;

public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(RequestContextFilter.class);
        packages("eu.fr.esic.formation.trans.produit.rest");
        register(LoggingFilter.class);
    }
}