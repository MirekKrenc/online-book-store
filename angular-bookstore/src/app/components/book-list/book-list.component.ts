import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.listBooks();
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  books: Book[] = [];
  currentCategoryId: number;

  listBooks():void {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId === true)
    {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 0;
    }


    this._bookService.getBooks(this.currentCategoryId).subscribe(
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
