import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ToDoComponent} from './to-do/to-do.component';
import {TodoList} from './service/todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from './about/about.component';
import {RouterModule, Routes} from "@angular/router";
import { ErrorComponent } from './error/error.component';

const appRoute: Routes = [
  // {path: '', component: ToDoComponent},
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: ToDoComponent},
  {path: 'About', component: AboutComponent},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    AboutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule
  ],
  providers: [TodoList],
  bootstrap: [AppComponent]
})
export class AppModule {
}
