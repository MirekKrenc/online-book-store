import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 0;
  searchMode: boolean = false;

  //client side pagination not used aby more
  // pageOfItems: Array<Book>;
  // pageSize: number = 6;

  //server side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  previouseCategory: number = 1;
  

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _ngPaginationConfig: NgbPaginationConfig,
              private _cartService: CartService,
              private _ngxSpinnerService: NgxSpinnerService) {
                _ngPaginationConfig.maxSize = 3;
                _ngPaginationConfig.boundaryLinks = true;
               }

  ngOnInit(): void {
    // this.listBooks();
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  //pagination - for client side paging
  // pageClick(pageOfItems: Array<Book>):void {
  //   //updat current page of items
  //   this.pageOfItems = pageOfItems;
  // }


  listBooks():void {
    //show spinner
    this._ngxSpinnerService.show();
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

    //setting up the page number to 1 if user navigates to dfferent category
    if (this.previouseCategory != this.currentCategoryId)
    {
      this.currentPage = 1;
    }
    //set the last category as the previouse
    this.previouseCategory = this.currentCategoryId;

    this._bookService.getBooks(this.currentCategoryId,
                      this.currentPage -1,
                      this.pageSize).subscribe(this.processPaginate())
  }

  handleSearchBooks() {
    const keyword:string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword,
                                  this.currentPage -1,
                                  this.pageSize).subscribe(this.processPaginate())
  }

updatePageSize(pageSize: number){
  this.pageSize = pageSize;
  this.currentPage = 1;
  this.listBooks();
}

processPaginate(){
  //hide spinner (klepsydra)
  this._ngxSpinnerService.hide();
  return data => {
    this.books = data._embedded.books;
    this.currentPage = data.page.number + 1;
    console.log("Current page = ", this.currentPage);
    this.totalRecords = data.page.totalElements;
    console.log("totalRecords = ", this.totalRecords);
    this.pageSize = data.page.size;
    console.log("pageSize = ", this.pageSize);
  }
}
addToCart(book: Book) {
  // console.log("Book ", book);
  const cartItem: CartItem = new CartItem(book);
  this._cartService.addToCart(cartItem);
}


  //funkcje pomocnicze
  // convertPrice(price: number):number {
  //   return price/15;
  // }

  replacePngToJpg(url: string):string {
    return url.replace('png','jpg');
  }


}
