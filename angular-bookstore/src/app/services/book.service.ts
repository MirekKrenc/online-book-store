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

  
  getBooks(theCategoryId: number, currentPage: number, pageSize: number):Observable<GetBooksFromResponse> {
    
    if (theCategoryId === 0)
    {
      //"http://localhost:8080/api/v1/books?page=0&size=20"
      const paginationUrl=`${this.baseUrl}?page=${currentPage}&size=${pageSize}`;
      console.log("URL=", paginationUrl);
      return this.httpClient.get<GetBooksFromResponse>(paginationUrl);
    } else {
      //url "http://localhost:8080/api/v1/books/search/categoryid{?id,page,size,sort}"
      const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
      return this.httpClient.get<GetBooksFromResponse>(searchUrl);
    }
  }

  private getBookList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetBooksFromResponse>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getCategories():Observable<BookCategory[]> {
    return this.httpClient.get<GetBookCategoriesFromResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  // searchBooks(keyword: string):Observable<Book[]> {
  //   const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
  //   return this.getBookList(searchUrl);
  // }  
  
  searchBooks(keyword: string, currentPage: number, pageSize: number):Observable<GetBooksFromResponse> {
    //http://localhost:8080/api/v1/books/search/searchbykeyword?name,page,size,sort}
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=$(pageSize)`;
    return this.httpClient.get<GetBooksFromResponse>(searchUrl);
  }

  searchBook(bookId: number): Observable<Book> {
    //http://localhost:8080/api/v1/books/search/searchbybookid?id=1
    const bookDetailsUrl = `${this.baseUrl}/search/searchbybookid?id=${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }

}

interface GetBooksFromResponse {
  _embedded: {
    books: Book[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number 
  }
}

interface GetBookCategoriesFromResponse {
  _embedded : {
    bookCategory: BookCategory[];
  }
}
