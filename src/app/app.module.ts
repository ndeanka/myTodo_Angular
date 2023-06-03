import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ToDoComponent} from './to-do/to-do.component';
import {TodoList} from './service/todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from './about/about.component';
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from './error/error.component';
import {CountactComponent} from './countact/countact.component';

const appRoute: Routes = [
  // {path: '', component: ToDoComponent},
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: ToDoComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Contact', component: CountactComponent},
  {path: '**', component: ErrorComponent}
];


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
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule
  ],
  providers: [TodoList],
  bootstrap: [AppComponent]
})
export class AppModule {
}
