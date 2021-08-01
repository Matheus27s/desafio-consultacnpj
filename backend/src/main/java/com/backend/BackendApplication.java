package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EntityScan( basePackages = {"com.consultacnpj.model"})
@ComponentScan( basePackages = {"com.*"} )
@EnableTransactionManagement
@RestController
@EnableWebMvc
@EnableAutoConfiguration
@EnableCaching
public class BackendApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedMethods("*")
		.allowedOrigins("*");
	}

}
