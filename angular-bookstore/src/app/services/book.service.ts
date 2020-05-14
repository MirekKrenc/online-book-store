import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl:string ='http://localhost:8080/api/v1/books';
  private categoryUrl:string = 'http://localhost:8080/api/v1/book-category';

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number):Observable<Book[]> {
    if (theCategoryId === 0)
    {
    return this.httpClient.get<GetBooksFromResponse>(this.baseUrl).pipe(
      map(response => response._embedded.books)
    );
    } else {
      const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
      return this.httpClient.get<GetBooksFromResponse>(searchUrl).pipe(
        map(response => response._embedded.books)
      );
    }
  }

  getCategories():Observable<BookCategory[]> {
    return this.httpClient.get<GetBookCategoriesFromResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

}

interface GetBooksFromResponse {
  _embedded: {
    books: Book[];
  }
}

interface GetBookCategoriesFromResponse {
  _embedded : {
    bookCategory: BookCategory[];
  }
}
