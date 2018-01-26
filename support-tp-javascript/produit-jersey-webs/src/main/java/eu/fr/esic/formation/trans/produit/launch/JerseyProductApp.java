package eu.fr.esic.formation.trans.produit.launch;

import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import eu.fr.esic.formation.business.config.AppConfig;
import eu.fr.esic.formation.trans.produit.config.JerseyConfig;
import eu.fr.esic.formation.trans.produit.rest.ClientRestResource;

/**
 * Date: 22/12/13
 * Time: 18:03
 *
 * @author Geoffroy Warin (http://geowarin.github.io)
 */
@EnableAutoConfiguration
@ComponentScan(basePackageClasses = {ClientRestResource.class})
//@ComponentScan(basePackages ={"eu.fr.esic.formation.trans.produit.rest"})
@Import({AppConfig.class})
@SpringBootApplication
public class JerseyProductApp {

    public static void main(String[] args) throws Exception {
        new SpringApplicationBuilder(JerseyProductApp.class).run(args);
    }

    @SuppressWarnings("deprecation")
	@Bean
    public ServletRegistrationBean jerseyServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new ServletContainer(), "/rest/*");
        registration.addInitParameter(ServletProperties.JAXRS_APPLICATION_CLASS, JerseyConfig.class.getName());
        return registration;
    }
}
