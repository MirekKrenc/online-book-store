import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(_cartItem: CartItem){
    //sprawdzenie czy ksiazke juz jest w karcie
    let alreadyExistsInCart : boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems?.length >0)
    {
      //loop through the cart items
      existingCartItem = this.cartItems.find(b => b.id === _cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //zwiekszam liczbe przedmiotow
      existingCartItem.quantity ++;
    } else {
      //dodaj do tabeli z karta
      this.cartItems.push(_cartItem);
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice()
  {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(element => {
      totalPriceValue += (element.quantity * element.unitPrice);
      totalQuantityValue += element.quantity;
    });
    console.log(`total price ${totalPriceValue} total quantity ${totalQuantityValue}`);

    //publish data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }


}
