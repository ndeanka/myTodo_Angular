import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ToDoComponent} from './to-do/to-do.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {CountactComponent} from './countact/countact.component';
import { AppRoutingModule } from './module/app-routing/app-routing.module';
import { TodoList } from './service/todo.service';


@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    AboutComponent,
    ErrorComponent,
    CountactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TodoList],
  bootstrap: [AppComponent]
})
export class AppModule {
}
