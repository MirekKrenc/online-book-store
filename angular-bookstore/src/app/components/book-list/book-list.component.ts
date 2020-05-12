import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  

  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this.listBooks();
  }

  books: Book[] = [];

  listBooks():void {
    this._bookService.getBooks().subscribe(
      data => {
        this.books = data
      }
    )
  }

  convertPrice(price: number):number {
    return price/15;
  }

  replacePngToJpg(url: string):string {
    return url.replace('png','jpg');
  }
}
