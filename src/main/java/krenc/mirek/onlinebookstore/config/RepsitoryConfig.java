package krenc.mirek.onlinebookstore.config;

import krenc.mirek.onlinebookstore.entity.Book;
import krenc.mirek.onlinebookstore.entity.BookCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

@Configuration
public class RepsitoryConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config)
    {
        //domyslnie data rest nie pokazuje id wiec aby je uzyskac trzeba jawnie zadeklarować potrzebę eskpozycji id pojedynczo
//        config.exposeIdsFor(Book.class);
//        config.exposeIdsFor(BookCategory.class);

        //lub dla wszystkich entities

        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().
                map(Type::getJavaType)
                .toArray(Class[]::new));

        config.getCorsRegistry()
                .addMapping("/**")
                .allowedOrigins("http://localhost:4200");
    }
}
