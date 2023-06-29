import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from 'src/app/about/about.component';
import { CountactComponent } from 'src/app/countact/countact.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { ToDoComponent } from 'src/app/to-do/to-do.component';


const appRoute: Routes = [
  // {path: '', component: ToDoComponent},
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: ToDoComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Contact', component: CountactComponent},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
