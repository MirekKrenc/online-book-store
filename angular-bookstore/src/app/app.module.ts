import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes, Route } from '@angular/router'

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { NgxSpinnerModule } from 'ngx-spinner'

const routes: Routes = [
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'books', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailComponent,
    JwPaginationComponent,
    CartStatusComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgxSpinnerModule  
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
