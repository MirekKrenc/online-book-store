import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = new Book();

  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookDetails();
      }
    )
    
  }

  getBookDetails(): void {
    const id:number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.searchBook(id).subscribe(
      
      data => {
        this.book = data;
      }
    );
  }

  addToCart() {
    const cartItem: CartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }

  convertPrice(price: number):number {
    return price/15;
  }

}
