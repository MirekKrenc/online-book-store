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

  books: Book[] = [];
  currentCategoryId: number;
  searchMode: boolean;

  //pagination
  pageOfItems: Array<Book>;
  pageSize: number = 6;
  

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.listBooks();
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  //pagination
  pageClick(_pageOfItems: Array<Book>):void {
    //updat current page of items
    this.pageOfItems = _pageOfItems;
  }


  listBooks():void {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    // console.log(this._activatedRoute.snapshot.paramMap);
    if (!this.searchMode)
    {
      //all books
      this.handleListBooks();
    } else {
      //do the search
      this.handleSearchBooks();
    }
    
  }



  handleListBooks() {
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

  handleSearchBooks() {
    const keyword:string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword).subscribe(
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
