package eu.fr.esic.formation.business.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan("eu.fr.esic.formation.business.entity")
@ComponentScan(basePackages="eu.fr.esic.formation.business.service")
@EnableJpaRepositories("eu.fr.esic.formation.business.dao")
public class AppConfig {
}
