package krenc.mirek.onlinebookstore.repository;

import krenc.mirek.onlinebookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface BookRepository extends JpaRepository<Book, Long> {
}
