package krenc.mirek.onlinebookstore.repository;

import krenc.mirek.onlinebookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin
public interface BookRepository extends JpaRepository<Book, Long> {

    @RestResource(path = "categoryid")
    Page<Book> findByBookCategoryId(@Param("id") Long id, Pageable pageable);

    @RestResource(path = "searchbykeyword")
    Page<Book> findByNameContainingIgnoreCase(@Param("name") String keyword, Pageable pageable);

    @RestResource(path = "searchbyname")
    @Query("select b from Book b where b.name like %:name%")
    Page<Book> searchBYNameContaining(@Param("name") String keyword, Pageable pageable);

    @RestResource(path = "searchbybookid")
    Book findBookById(@Param("id") Long id);

}
