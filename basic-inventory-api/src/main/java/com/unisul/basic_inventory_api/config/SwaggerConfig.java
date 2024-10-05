package com.unisul.basic_inventory_api.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.Info;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class SwaggerConfig {

    private static final Logger logger = LoggerFactory.getLogger(SwaggerConfig.class);

    @Bean
    public GroupedOpenApi publicApi() {
        logger.info("Configuring Swagger for public API...");
        return GroupedOpenApi.builder()
                .group("public-api")
                .pathsToMatch("/api/v1/**")
                .addOpenApiCustomiser(openApi -> openApi.info(new Info()
                        .title("Basic Inventory API")
                        .version("v1.0")
                        .description("API documentation for the Basic Inventory application.")))
                .build();
    }
}
